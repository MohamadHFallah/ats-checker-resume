import { Check } from 'lucide-react';

export function ReportPreview() {
  return (
    <div className="border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-7">
        <div>
          <p className="text-sm font-semibold">Product Designer · Northstar</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Resume reviewed against this job description
          </p>
        </div>
        <span className="rounded-sm bg-success-50 px-2.5 py-1 text-xs font-medium text-success-800">
          Strong match
        </span>
      </div>
      <div className="grid sm:grid-cols-[190px_1fr]">
        <div className="border-b border-border p-5 sm:border-b-0 sm:border-r sm:p-6">
          <p className="text-xs text-muted-foreground">COMPATIBILITY SCORE</p>
          <p className="mt-2 font-heading text-5xl tabular-nums">
            82<span className="text-xl text-muted-foreground"> / 100</span>
          </p>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            An estimate based on the evidence in your resume.
          </p>
        </div>
        <div className="grid gap-x-8 gap-y-5 p-5 sm:grid-cols-2 sm:p-6">
          <div>
            <h3 className="text-sm font-semibold">
              Matched skills <span className="font-normal text-muted-foreground">(4)</span>
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex gap-2">
                <Check className="mt-0.5 size-4 text-success-700" />
                User research
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 size-4 text-success-700" />
                Figma
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 size-4 text-success-700" />
                Design systems
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Not mentioned</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-sm bg-warning-50 px-2 py-1 text-xs text-warning-800">
                A/B testing
              </span>
              <span className="rounded-sm bg-warning-50 px-2 py-1 text-xs text-warning-800">
                SQL
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              A missing keyword does not prove a missing skill.
            </p>
          </div>
          <div className="sm:col-span-2">
            <h3 className="text-sm font-semibold">A useful next step</h3>
            <p className="mt-2 border-l-2 border-primary pl-3 text-sm leading-6 text-muted-foreground">
              If you have run experiments, add a concise example that shows your role and what you
              learned.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
