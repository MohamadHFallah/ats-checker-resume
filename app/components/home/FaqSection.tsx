import { CircleHelp } from 'lucide-react';

const faqs = [
  [
    'Is this an official ATS score?',
    'No. It is an estimated compatibility assessment, not an official score from an applicant tracking system and not a guarantee of an interview.',
  ],
  [
    'What should I paste?',
    'Paste the text of your resume and the job description you want to compare it with. File uploads are not supported yet.',
  ],
  [
    'Is my resume private?',
    'Your text is sent to an external AI provider to generate the analysis. Avoid including information you do not want processed by that provider.',
  ],
];

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-20 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:py-24">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-primary">
            <CircleHelp size={16} /> Frequently asked
          </p>
          <h2 className="mt-3 max-w-sm text-3xl sm:text-4xl">Before you begin.</h2>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group py-5">
              <summary className="cursor-pointer list-none text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {question}
                <span className="float-right text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
