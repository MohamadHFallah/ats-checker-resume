const features = [
  ['Resume analysis', 'A careful read of your experience, strengths, and relevant qualifications.'],
  ['Role-by-role matching', 'Compare your resume with the requirements of a specific job.'],
  [
    'Skill gap detection',
    'Separate skills that are not mentioned from skills with limited evidence.',
  ],
  ['Compatibility score', 'A clear estimate based on skills, experience, keywords, and education.'],
  ['Actionable guidance', 'Prioritized suggestions grounded in what your resume already says.'],
];

export function FeaturesSection() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:py-24">
        <div>
          <p className="text-sm font-medium text-primary">
            Made for the work before the application
          </p>
          <h2 className="mt-3 max-w-sm text-3xl leading-tight sm:text-4xl">
            Useful detail, without the noise.
          </h2>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {features.map(([title, description]) => (
            <article key={title} className="grid gap-1 py-4 sm:grid-cols-[190px_1fr] sm:gap-6">
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
