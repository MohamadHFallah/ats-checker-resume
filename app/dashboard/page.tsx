"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, BriefcaseBusiness, ChevronLeft, ChevronRight, FileText, LoaderCircle, Plus, X } from "lucide-react";
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
  const [resumeSidebarOpen, setResumeSidebarOpen] = useState(true);

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
    <main className="mx-auto min-h-screen max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
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
        <div className={`mt-6 grid gap-6 ${resumeSidebarOpen ? "lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_320px]" : "lg:grid-cols-[52px_minmax(0,1fr)] xl:grid-cols-[52px_minmax(0,1fr)_320px]"}`}>
          <aside className={`min-w-0 border-b border-border pb-5 lg:border-b-0 lg:border-r lg:pr-3 lg:pb-0 ${resumeSidebarOpen ? "lg:pr-5" : "lg:pr-2"}`}>
            <div className={`mb-3 flex items-center ${resumeSidebarOpen ? "justify-between" : "justify-center"}`}>
              {resumeSidebarOpen && <h2 className="text-sm font-medium">Saved resumes</h2>}
              <button
                type="button"
                onClick={() => setResumeSidebarOpen((open) => !open)}
                aria-expanded={resumeSidebarOpen}
                aria-label={resumeSidebarOpen ? "Collapse saved resumes sidebar" : "Expand saved resumes sidebar"}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-border bg-card hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {resumeSidebarOpen ? <ChevronLeft aria-hidden="true" className="size-4" /> : <ChevronRight aria-hidden="true" className="size-4" />}
              </button>
            </div>
            <nav aria-label="Saved resumes">
              <ul className={`flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible ${resumeSidebarOpen ? "" : "lg:items-center"}`}>
                {resumes.map((resume) => (
                  <li key={resume.id} className="shrink-0 lg:w-full">
                    <button
                      type="button"
                      onClick={() => selectResume(resume)}
                      aria-current={selected?.id === resume.id ? "page" : undefined}
                      aria-label={resumeSidebarOpen ? undefined : `${resume.title}, ${new Date(resume.createdAt).toLocaleDateString()}`}
                      title={resumeSidebarOpen ? undefined : resume.title}
                      className={`min-h-11 w-full rounded-md border text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${resumeSidebarOpen ? "px-3 py-2" : "flex items-center justify-center px-1 py-2"} ${selected?.id === resume.id ? "border-primary bg-accent" : "border-border bg-card hover:bg-muted"}`}
                    >
                      {resumeSidebarOpen ? (
                        <>
                          <span className="block max-w-[230px] truncate text-sm font-medium">{resume.title}</span>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {new Date(resume.createdAt).toLocaleDateString()}
                          </span>
                        </>
                      ) : (
                        <FileText aria-hidden="true" className="size-4" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

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

          <aside className="min-w-0 border-t border-border pt-5 xl:border-t-0 xl:border-l xl:pt-0 xl:pl-5" aria-label="Job comparison workspace">
            <section>
              <h2 className="font-heading text-2xl">Compare with a job</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Compare this resume with a job description. Each result stays with this resume.
              </p>
              {selected ? (
                <form className="mt-4" onSubmit={compareJobDescription}>
                  <label htmlFor="job-description" className="mb-2 block text-sm font-medium">Job description</label>
                  <textarea
                    id="job-description"
                    value={jobDescription}
                    onChange={(event) => setJobDescription(event.target.value.slice(0, 20_000))}
                    maxLength={20_000}
                    rows={6}
                    placeholder="Paste the job description here…"
                    className="min-h-36 w-full resize-y rounded-md border border-input bg-card px-4 py-3 text-sm leading-6 placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <div className="mt-3">
                    <span className="text-xs tabular-nums text-muted-foreground">{jobDescription.length.toLocaleString()} / 20,000 characters</span>
                    <button type="submit" disabled={isComparing || jobDescription.trim().length < 80} className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      {isComparing ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <BriefcaseBusiness aria-hidden="true" className="size-4" />}
                      {isComparing ? "Comparing…" : "Compare job description"}
                    </button>
                  </div>
                  {comparisonError && <p role="alert" className="mt-3 rounded-md border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-800">{comparisonError}</p>}
                  {isComparing && <p role="status" className="mt-3 text-sm text-muted-foreground">Reviewing the job requirements against this resume…</p>}
                </form>
              ) : (
                <p className="mt-4 rounded-md border border-border bg-card p-3 text-sm text-muted-foreground">Select a saved resume to compare it with a job.</p>
              )}
            </section>

            <section className="mt-7 border-t border-border pt-5" aria-label="Saved job comparisons">
              <h3 className="text-sm font-medium">Previous comparisons</h3>
              {selected?.comparisons.length ? (
                <ul className="mt-3 space-y-2">
                  {selected.comparisons.map((comparison) => (
                    <li key={comparison.id}>
                      <button type="button" onClick={() => setSelectedComparison(comparison)} className="min-h-11 w-full rounded-md border border-border bg-card px-3 py-2 text-left hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        <span className="block truncate text-sm font-medium">{comparison.title}</span>
                        <span className="mt-1 block text-xs text-muted-foreground">{new Date(comparison.createdAt).toLocaleDateString()}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">No comparisons saved for this resume yet.</p>
              )}
            </section>
          </aside>
        </div>
      )}

      {selectedComparison && (
        <dialog
          open
          aria-labelledby="comparison-dialog-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedComparison(null);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") setSelectedComparison(null);
          }}
          className="fixed inset-0 z-50 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto border border-border bg-background p-0 text-foreground backdrop:bg-foreground/40"
        >
          <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-border bg-background px-5 py-4">
            <div className="min-w-0">
              <h2 id="comparison-dialog-title" className="font-heading text-2xl">{selectedComparison.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">Compared on {new Date(selectedComparison.createdAt).toLocaleDateString()}</p>
            </div>
            <button type="button" autoFocus onClick={() => setSelectedComparison(null)} aria-label="Close comparison" className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-border hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>
          <div className="px-5 py-5">
            <ATSJobDescriptionResult data={selectedComparison.analysis} />
          </div>
        </dialog>
      )}
    </main>
  );
}
