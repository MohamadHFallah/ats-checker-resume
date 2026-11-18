"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, FileText, LoaderCircle, Plus, BriefcaseBusiness } from "lucide-react";
import { ATSChecker, type ATSResponse } from "@/app/components/ATSCheckerCom";
import { ATSJobDescriptionResult } from "@/app/components/atsJob";

type SavedResume = {
  id: string;
  title: string;
  createdAt: string;
  analysis: ATSResponse | null;
  comparisons: SavedComparison[];
};

type SavedComparison = {
  id: string;
  title: string;
  createdAt: string;
  analysis: ATSJobDescriptionResult;
};

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const requestedId = searchParams.get("resume");
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [selected, setSelected] = useState<SavedResume | null>(null);
  const [selectedComparison, setSelectedComparison] = useState<SavedComparison | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [comparisonError, setComparisonError] = useState<string | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadResumes() {
      try {
        const response = await fetch("/api/resumes");
        if (!active) return;
        if (response.status === 401) {
          setError("Sign in to view your saved resumes.");
          return;
        }
        if (!response.ok) {
          const data = await response.json().catch(() => null) as { error?: string } | null;
          throw new Error(data?.error ?? "Your resumes couldn’t be loaded. Please try again.");
        }
        const data: { resumes: SavedResume[] } = await response.json();
        if (!active) return;
        setResumes(data.resumes);
        const next = data.resumes.find((resume) => resume.id === requestedId) ?? data.resumes[0] ?? null;
        setSelected(next);
        setSelectedComparison(next?.comparisons.find((comparison) => comparison.id === searchParams.get("comparison")) ?? next?.comparisons[0] ?? null);
      } catch (loadError) {
        if (active) setError(loadError instanceof Error ? loadError.message : "Something went wrong.");
      } finally {
        if (active) setLoading(false);
      }
    }
    void loadResumes();
    return () => { active = false; };
  }, [requestedId, searchParams]);

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

  function selectResume(resume: SavedResume) {
    setSelected(resume);
    setSelectedComparison(resume.comparisons[0] ?? null);
    setComparisonError(null);
  }

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center px-4 pt-24">
        <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground">
          <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> Loading your dashboard…
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl">Your resume dashboard</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Saved resumes and their latest analysis.</p>
        </div>
        <Link href="/" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto">
          <Plus aria-hidden="true" className="size-4" /> Add a resume
        </Link>
      </header>

      {error ? (
        <div role="alert" className="mt-6 rounded-md border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-800">
          {error}
        </div>
      ) : resumes.length === 0 ? (
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
        <div className="mt-6 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <nav aria-label="Saved resumes" className="min-w-0">
            <h2 className="mb-3 text-sm font-medium">Saved resumes</h2>
            <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
              {resumes.map((resume) => (
                <li key={resume.id} className="shrink-0 lg:w-full">
                  <button
                    type="button"
                    onClick={() => selectResume(resume)}
                    aria-current={selected?.id === resume.id ? "page" : undefined}
                    className={`min-h-11 w-full rounded-md border px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected?.id === resume.id ? "border-primary bg-accent" : "border-border bg-card hover:bg-muted"}`}
                  >
                    <span className="block max-w-[230px] truncate text-sm font-medium">{resume.title}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {new Date(resume.createdAt).toLocaleDateString()}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-label="Selected resume analysis" className="min-w-0">
            {selected?.analysis ? (
              <>
                <ATSChecker {...selected.analysis} />
                <section className="mt-8 border-t border-border pt-6">
                  <h2 className="text-2xl">Compare with a job</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Add a job description to see how this resume aligns. You can save multiple comparisons for the same resume.
                  </p>
                  <form className="mt-4" onSubmit={compareJobDescription}>
                    <label htmlFor="job-description" className="mb-2 block text-sm font-medium">Job description</label>
                    <textarea
                      id="job-description"
                      value={jobDescription}
                      onChange={(event) => setJobDescription(event.target.value.slice(0, 20_000))}
                      maxLength={20_000}
                      rows={7}
                      placeholder="Paste the job description here…"
                      className="min-h-44 w-full resize-y rounded-md border border-input bg-card px-4 py-3 text-sm leading-6 placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-xs tabular-nums text-muted-foreground">{jobDescription.length.toLocaleString()} / 20,000 characters</span>
                      <button type="submit" disabled={isComparing || jobDescription.trim().length < 80} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        {isComparing ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <BriefcaseBusiness aria-hidden="true" className="size-4" />}
                        {isComparing ? "Comparing…" : "Compare job description"}
                      </button>
                    </div>
                    {comparisonError && <p role="alert" className="mt-3 rounded-md border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-800">{comparisonError}</p>}
                    {isComparing && <p role="status" className="mt-3 text-sm text-muted-foreground">Reviewing the job requirements against this resume…</p>}
                  </form>
                </section>

                {selected.comparisons.length > 0 && (
                  <section className="mt-8 border-t border-border pt-6" aria-label="Saved job comparisons">
                    <h2 className="text-2xl">Saved job comparisons</h2>
                    <ul className="mt-4 flex gap-2 overflow-x-auto pb-2">
                      {selected.comparisons.map((comparison) => (
                        <li key={comparison.id} className="shrink-0">
                          <button type="button" onClick={() => setSelectedComparison(comparison)} aria-current={selectedComparison?.id === comparison.id ? "page" : undefined} className={`min-h-11 max-w-64 rounded-md border px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedComparison?.id === comparison.id ? "border-primary bg-accent" : "border-border bg-card hover:bg-muted"}`}>
                            <span className="block truncate text-sm font-medium">{comparison.title}</span>
                            <span className="mt-1 block text-xs text-muted-foreground">{new Date(comparison.createdAt).toLocaleDateString()}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    {selectedComparison && <ATSJobDescriptionResult data={selectedComparison.analysis} />}
                  </section>
                )}
              </>
            ) : (
              <p className="rounded-md border border-border bg-card p-5 text-sm text-muted-foreground">
                No analysis is saved for this resume yet.
              </p>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
