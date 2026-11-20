import { ArrowRight, FileText } from 'lucide-react';

export function ResumePreview() {
  return (
    <div
      className="relative mx-auto w-full max-w-[590px]"
      aria-label="Illustration of a resume compatibility report"
    >
      <div className="absolute -left-6 top-16 hidden h-48 w-48 rounded-full bg-primary-100/70 blur-3xl sm:block" />
      <div className="relative grid items-center gap-4 sm:grid-cols-[1fr_54px_1fr]">
        <article className="relative z-10 -rotate-2 border border-border bg-card p-5 sm:p-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="flex size-10 items-center justify-center rounded-md bg-primary-50 text-primary-700">
              <FileText size={20} />
            </div>
            <div>
              <p className="font-semibold">Jordan Lee</p>
              <p className="text-xs text-muted-foreground">Product designer</p>
            </div>
            <span className="ml-auto text-[10px] text-muted-foreground">RESUME</span>
          </div>
          <p className="mb-2 mt-5 text-[10px] font-semibold tracking-[0.12em] text-muted-foreground">
            EXPERIENCE
          </p>
          <p className="text-sm font-medium">
            Senior Product Designer{' '}
            <span className="font-normal text-muted-foreground">· 2021—Now</span>
          </p>
          <div className="mt-3 space-y-2.5" aria-hidden="true">
            <div className="h-1.5 w-full bg-default-100">
              <div className="h-full w-[88%] bg-primary-200" />
            </div>
            <div className="h-1.5 w-[93%] bg-default-100">
              <div className="h-full w-[67%] bg-primary-200" />
            </div>
            <div className="h-1.5 w-[78%] bg-default-100">
              <div className="h-full w-[74%] bg-success-200" />
            </div>
          </div>
          <p className="mb-2 mt-5 text-[10px] font-semibold tracking-[0.12em] text-muted-foreground">
            KEY SKILLS
          </p>
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-sm bg-success-50 px-2 py-1 text-xs text-success-800">
              Research
            </span>
            <span className="rounded-sm bg-success-50 px-2 py-1 text-xs text-success-800">
              Figma
            </span>
            <span className="rounded-sm bg-warning-50 px-2 py-1 text-xs text-warning-800">
              Prototyping
            </span>
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-[43%] h-px bg-primary-400/80 shadow-[0_0_16px_3px_rgba(10,102,194,0.18)] motion-safe:animate-[scan_4s_ease-in-out_infinite]" />
        </article>
        <div
          className="hidden items-center justify-center text-primary-500 sm:flex"
          aria-hidden="true"
        >
          <ArrowRight size={22} />
        </div>
        <article className="relative z-10 border border-border bg-card p-5 sm:p-6">
          <div className="flex items-start justify-between border-b border-border pb-4">
            <div>
              <p className="text-xs text-muted-foreground">COMPATIBILITY SCORE</p>
              <p className="mt-1 font-heading text-5xl tabular-nums">
                82<span className="text-2xl text-muted-foreground">/100</span>
              </p>
            </div>
            <span className="rounded-sm bg-success-50 px-2 py-1 text-xs font-medium text-success-800">
              Strong match
            </span>
          </div>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Skills match</span>
              <span className="tabular-nums text-muted-foreground">8 of 10</span>
            </div>
            <div className="h-1.5 bg-default-100">
              <div className="h-full w-4/5 bg-success-500" />
            </div>
            <div className="flex items-center justify-between">
              <span>Experience</span>
              <span className="tabular-nums text-muted-foreground">Strong</span>
            </div>
            <p className="border-l-2 border-primary bg-primary-50/50 px-3 py-2 text-xs leading-5 text-muted-foreground">
              Your recent product research work aligns with this role.
            </p>
          </div>
        </article>
      </div>
      <div className="relative z-20 mx-auto mt-4 flex w-fit items-center gap-2 border border-border bg-background px-3 py-2 text-xs text-muted-foreground sm:absolute sm:-bottom-5 sm:left-1/2 sm:mt-0 sm:-translate-x-1/2">
        <span className="size-2 rounded-full bg-success-500" /> Evidence-led. Role-specific. Yours
        to improve.
      </div>
    </div>
  );
}
