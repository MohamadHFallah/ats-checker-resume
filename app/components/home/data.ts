import { ScanLine, Sparkles, Target } from 'lucide-react';

export const steps = [
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

export const features = [
  ['Resume analysis', 'A careful read of your experience, strengths, and relevant qualifications.'],
  ['Role-by-role matching', 'Compare your resume with the requirements of a specific job.'],
  [
    'Skill gap detection',
    'Separate skills that are not mentioned from skills with limited evidence.',
  ],
  ['Compatibility score', 'A clear estimate based on skills, experience, keywords, and education.'],
  ['Actionable guidance', 'Prioritized suggestions grounded in what your resume already says.'],
];

export const faqs = [
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
