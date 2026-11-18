"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, FileText, LoaderCircle, Plus } from "lucide-react";
import { ATSChecker, type ATSResponse } from "@/app/components/ATSCheckerCom";
import { ATSJobDescriptionResult } from "@/app/components/atsJob";

type SavedResume = {
  id: string;
  title: string;
  createdAt: string;
  analysis: ATSResponse | null;
};

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const requestedId = searchParams.get("resume");
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [selected, setSelected] = useState<SavedResume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        if (!response.ok) throw new Error("Your resumes couldn’t be loaded. Please try again.");
        const data: { resumes: SavedResume[] } = await response.json();
        if (!active) return;
        setResumes(data.resumes);
        setSelected(data.resumes.find((resume) => resume.id === requestedId) ?? data.resumes[0] ?? null);
      } catch (loadError) {
        if (active) setError(loadError instanceof Error ? loadError.message : "Something went wrong.");
      } finally {
        if (active) setLoading(false);
      }
    }
    void loadResumes();
    return () => { active = false; };
  }, [requestedId]);

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
                    onClick={() => setSelected(resume)}
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
                {selected.analysis.jobDescResult && (
                  <ATSJobDescriptionResult data={selected.analysis.jobDescResult as ATSJobDescriptionResult} />
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
