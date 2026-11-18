"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, FileText, LoaderCircle, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";

const MAX_CHARACTERS = 20_000;

export function HeroSection() {
  const router = useRouter();
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  async function handleAnalyze(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Add both your resume and the job description to continue.");
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/ats/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: resumeText, jobDescription }),
      });

      if (!response.ok) {
        throw new Error("We couldn’t analyze those details. Check your text and try again.");
      }

      const result = await response.json();
      sessionStorage.setItem("ats-analysis", JSON.stringify(result));
      router.push("/analyze");
    } catch (analysisError) {
      setError(
        analysisError instanceof Error
          ? analysisError.message
          : "Something went wrong. Please try again.",
      );
      setIsAnalyzing(false);
    }
  }

  return (
    <section aria-labelledby="home-title" className="mx-auto max-w-5xl">
      <div className="mx-auto max-w-3xl">
        <h1 id="home-title" className="text-4xl leading-tight sm:text-5xl">
          Resume compatibility checker
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Compare your experience with a job description and get a clear, evidence-based review.
        </p>
      </div>

      <form onSubmit={handleAnalyze} className="mt-9">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="min-w-0">
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <label htmlFor="resume" className="text-sm font-medium">Your resume</label>
              <span className="text-xs tabular-nums text-muted-foreground">
                {resumeText.length.toLocaleString()} / {MAX_CHARACTERS.toLocaleString()}
              </span>
            </div>
            <textarea
              id="resume"
              value={resumeText}
              onChange={(event) => setResumeText(event.target.value.slice(0, MAX_CHARACTERS))}
              maxLength={MAX_CHARACTERS}
              rows={14}
              placeholder="Paste your resume text here…"
              aria-describedby="resume-help"
              className="min-h-64 w-full resize-y rounded-md border border-input bg-card px-4 py-3 text-sm leading-6 placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <p id="resume-help" className="mt-2 text-xs leading-5 text-muted-foreground">
              Plain text works best. Include your experience, skills, and education.
            </p>
          </div>

          <div className="min-w-0">
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <label htmlFor="job-description" className="text-sm font-medium">Job description</label>
              <span className="text-xs tabular-nums text-muted-foreground">
                {jobDescription.length.toLocaleString()} / {MAX_CHARACTERS.toLocaleString()}
              </span>
            </div>
            <textarea
              id="job-description"
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value.slice(0, MAX_CHARACTERS))}
              maxLength={MAX_CHARACTERS}
              rows={14}
              placeholder="Paste the job description here…"
              aria-describedby="job-description-help"
              className="min-h-64 w-full resize-y rounded-md border border-input bg-card px-4 py-3 text-sm leading-6 placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <p id="job-description-help" className="mt-2 text-xs leading-5 text-muted-foreground">
              Use the full posting so the comparison can consider its requirements.
            </p>
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-5 rounded-md border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-800">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
            <LockKeyhole aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            Your text is sent to an external AI provider for analysis. Avoid including sensitive details.
          </p>
          <Button type="submit" disabled={isAnalyzing} className="min-h-11 w-full shrink-0 sm:w-auto">
            {isAnalyzing ? (
              <>
                <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                Analyzing your match…
              </>
            ) : (
              <>
                <FileText aria-hidden="true" className="size-4" />
                Analyze resume
                <ArrowRight aria-hidden="true" className="size-4" />
              </>
            )}
          </Button>
        </div>
        {isAnalyzing && (
          <p role="status" className="mt-3 text-right text-sm text-muted-foreground">
            Comparing your resume with the role. This may take a moment.
          </p>
        )}
      </form>

      <div className="mt-12 border-t border-border pt-5">
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          The compatibility score is an estimate to help guide your review. It is not an official ATS score and does not guarantee an interview.
        </p>
      </div>
    </section>
  );
}
