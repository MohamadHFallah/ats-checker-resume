"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, FileText, Plus } from "lucide-react";
import { ATSChecker } from "@/app/components/ATSCheckerCom";
import { useSearchParams } from "next/navigation";
import { useDashboard } from "@/app/components/dashboard/DashboardLayout";
import { ComparisonDialog } from "../components/dashboard/ComparisonDialog";
import { JobComparisonWorkspace } from "../components/dashboard/JobComparisonWorkspace";
import type { SavedComparison } from "../components/dashboard/types";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const { resumes, selected, setResumes } = useDashboard();
  const [selectedComparison, setSelectedComparison] = useState<SavedComparison | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [comparisonError, setComparisonError] = useState<string | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  const requestedComparison = searchParams.get("comparison");
  const activeComparison = selectedComparison ?? selected?.comparisons.find((comparison) => comparison.id === requestedComparison) ?? null;

  async function compareJobDescription(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    setComparisonError(null);
    setIsComparing(true);
    try {
      const response = await fetch(`/api/resumes/${selected.id}/comparisons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });
      const data = await response.json() as { error?: string; comparison?: SavedComparison };
      if (!response.ok || !data.comparison) {
        throw new Error(data.error ?? "This job description couldn’t be compared.");
      }
      const comparison = data.comparison;
      setSelectedComparison(comparison);
      setJobDescription("");
      setResumes((current) => current.map((resume) => resume.id === selected.id
        ? { ...resume, comparisons: [comparison, ...resume.comparisons] }
        : resume));
    } catch (compareError) {
      setComparisonError(compareError instanceof Error ? compareError.message : "Something went wrong.");
    } finally {
      setIsComparing(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-full px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Your workspace</p>
          <h1 className="mt-1 text-3xl sm:text-4xl">ATS Resume Checker</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Analyze and improve your resume, then compare it with a job.</p>
        </div>
        <Link href="/" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto">
          <Plus aria-hidden="true" className="size-4" /> Add a resume
        </Link>
      </header>

      {resumes.length === 0 ? (
        <section className="mt-10 border border-border bg-card px-6 py-10 text-center">
          <FileText aria-hidden="true" className="mx-auto size-8 text-muted-foreground" />
          <h2 className="mt-4 text-xl">No saved resumes yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Add your resume to get a review. Your saved analysis will appear here.
          </p>
          <Link href="/" className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Analyze a resume <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </section>
      ) : (
        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section aria-label="Selected resume analysis" className="min-w-0">
            {selected?.analysis ? (
              <>
                <div className="mb-5">
                  <h2 className="font-heading text-2xl">Analyze and improve your resume</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{selected.title}</p>
                </div>
                <ATSChecker {...selected.analysis} />
              </>
            ) : (
              <p className="rounded-md border border-border bg-card p-5 text-sm text-muted-foreground">
                No analysis is saved for this resume yet.
              </p>
            )}
          </section>

          <JobComparisonWorkspace
            selected={selected}
            selectedComparison={selectedComparison}
            jobDescription={jobDescription}
            comparisonError={comparisonError}
            isComparing={isComparing}
            onJobDescriptionChange={setJobDescription}
            onCompare={compareJobDescription}
            onSelectComparison={setSelectedComparison}
          />
        </div>
      )}

      <ComparisonDialog comparison={activeComparison} onOpenChange={(open) => { if (!open) setSelectedComparison(null); }} />
    </main>
  );
}
