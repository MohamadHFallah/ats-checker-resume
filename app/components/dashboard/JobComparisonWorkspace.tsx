import { BriefcaseBusiness, LoaderCircle } from "lucide-react";
import type { FormEvent } from "react";
import type { SavedComparison, SavedResume } from "./types";

type JobComparisonWorkspaceProps = {
  selected: SavedResume | null;
  selectedComparison: SavedComparison | null;
  jobDescription: string;
  comparisonError: string | null;
  isComparing: boolean;
  onJobDescriptionChange: (value: string) => void;
  onCompare: (event: FormEvent<HTMLFormElement>) => void;
  onSelectComparison: (comparison: SavedComparison) => void;
};

export function JobComparisonWorkspace({
  selected,
  selectedComparison,
  jobDescription,
  comparisonError,
  isComparing,
  onJobDescriptionChange,
  onCompare,
  onSelectComparison,
}: JobComparisonWorkspaceProps) {
  return (
    <aside className="min-w-0 border-t border-border pt-5 xl:border-t-0 xl:border-l xl:pt-0 xl:pl-5" aria-label="Job comparison workspace">
      <section>
        <h2 className="font-heading text-2xl">Compare with a job</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Compare this resume with a job description. Each result stays with this resume.</p>
        {selected ? (
          <form className="mt-4" onSubmit={onCompare}>
            <label htmlFor="job-description" className="mb-2 block text-sm font-medium">Job description</label>
            <textarea
              id="job-description"
              value={jobDescription}
              onChange={(event) => onJobDescriptionChange(event.target.value.slice(0, 20_000))}
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
        ) : <p className="mt-4 rounded-md border border-border bg-card p-3 text-sm text-muted-foreground">Select a saved resume to compare it with a job.</p>}
      </section>

      <section className="mt-7 border-t border-border pt-5" aria-label="Saved job comparisons">
        <h3 className="text-sm font-medium">Previous comparisons</h3>
        {selected?.comparisons.length ? (
          <ul className="mt-3 space-y-2">
            {selected.comparisons.map((comparison) => (
              <li key={comparison.id}>
                <button
                  type="button"
                  onClick={() => onSelectComparison(comparison)}
                  aria-haspopup="dialog"
                  aria-expanded={selectedComparison?.id === comparison.id}
                  className="min-h-11 w-full rounded-md border border-border bg-card px-3 py-2 text-left hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="block truncate text-sm font-medium">{comparison.title}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{new Date(comparison.createdAt).toLocaleDateString()}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : <p className="mt-3 text-sm text-muted-foreground">No comparisons saved for this resume yet.</p>}
      </section>
    </aside>
  );
}
