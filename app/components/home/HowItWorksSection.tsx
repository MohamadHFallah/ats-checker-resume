import { ScanLine, Sparkles, Target } from 'lucide-react';

const steps = [
  {
    title: 'Read the resume',
    description:
      'Experience, skills, and education are read in context—not just counted as keywords.',
    icon: ScanLine,
  },
  {
    title: 'Compare the role',
    description:
      'See where your background supports the requirements, and where the evidence is thin.',
    icon: Target,
  },
  {
    title: 'Make a clear next move',
    description: 'Get specific edits that make your relevant experience easier to understand.',
    icon: Sparkles,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-y border-border bg-card">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-primary">A better way to prepare</p>
          <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
            From a long document to a clear next step.
          </h2>
        </div>
        <div className="mt-12 grid gap-0 md:grid-cols-3">
          {steps.map(({ title, description, icon: Icon }, index) => (
            <article key={title} className="border-t border-border py-6 md:pr-8">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-md bg-primary-50 text-primary-700">
                  <Icon size={18} />
                </span>
                <span className="text-xs text-muted-foreground">{index + 1} / 3</span>
              </div>
              <h3 className="mt-5 text-xl">{title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
