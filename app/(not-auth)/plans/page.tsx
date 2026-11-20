import Link from 'next/link';
import { headers } from 'next/headers';
import { Check, Crown, Send, Sparkles, WandSparkles } from 'lucide-react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const plans = [
  {
    name: 'Free',
    description: 'A practical way to get started with resume feedback.',
    icon: Sparkles,
    accent: 'border-primary-200 bg-primary-50/60 dark:border-primary-800 dark:bg-primary-900/20',
    iconStyle: 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200',
    features: ['Resume analysis', 'Job description matching', 'Usage-based AI credits'],
  },
  {
    name: 'Pro',
    description: 'For job seekers who want more room to refine and compare.',
    icon: Crown,
    accent: 'border-warning-200 bg-warning-50/60 dark:border-warning-800 dark:bg-warning-900/20',
    iconStyle: 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-100',
    features: ['Everything in Free', 'More AI credits', 'Access to advanced models'],
  },
];

const creditCosts = [
  {
    label: 'Resume analysis',
    credits: 2,
    icon: Sparkles,
    style: 'bg-primary-50 text-primary-800 dark:bg-primary-900/30 dark:text-primary-100',
  },
  {
    label: 'Job matching',
    credits: 1,
    icon: Check,
    style: 'bg-success-50 text-success-800 dark:bg-success-900/30 dark:text-success-100',
  },
  {
    label: 'Resume rewrite',
    credits: 2,
    icon: WandSparkles,
    style: 'bg-warning-50 text-warning-800 dark:bg-warning-900/30 dark:text-warning-100',
  },
];

export default async function PlansPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { plan: true, remainingCredits: true },
      })
    : null;

  const currentPlan = user?.plan ?? 'FREE';
  const telegramId = process.env.NEXT_PUBLIC_TELEGRAM_ID?.replace(/^@/, '').trim();

  return (
    <main className="mx-auto min-h-[calc(100svh-4rem)] w-full max-w-6xl px-4 py-10 pt-32 sm:px-6 sm:py-14 sm:pt-36">
      <header className="max-w-2xl border-b border-border pb-7">
        <p className="text-sm font-medium text-primary">Plans</p>
        <h1 className="mt-2 font-heading text-4xl sm:text-5xl">Choose your plan</h1>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          Start with the essentials, or choose Pro for more room to work on your resume.
        </p>
        {user && (
          <p className="mt-4 text-sm text-muted-foreground">
            Current plan: <span className="font-medium text-foreground">{currentPlan}</span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            {user.remainingCredits} credits remaining
          </p>
        )}
      </header>

      <section aria-label="Available plans" className="mt-8 grid gap-5 md:grid-cols-2">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.name.toUpperCase();
          const Icon = plan.icon;
          return (
            <Card key={plan.name} className={`gap-0 rounded-lg border ${plan.accent} py-0`}>
              <CardHeader className="pb-5 pt-6">
                <span
                  className={`mb-2 flex size-11 items-center justify-center rounded-md ${plan.iconStyle}`}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="min-h-12 leading-6">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="border-y border-border py-4 text-sm text-muted-foreground">
                  {isCurrent
                    ? 'Your current plan'
                    : 'Plan details and pricing will be available soon.'}
                </p>
                <ul className="mt-5 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-success-700 dark:text-success-300"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto py-7">
                {isCurrent ? (
                  <span className="flex min-h-11 w-full items-center justify-center rounded-md border border-border bg-card/70 px-4 text-sm font-medium">
                    Current plan
                  </span>
                ) : telegramId ? (
                  <a
                    href={`https://t.me/${encodeURIComponent(telegramId)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-sky-600 px-4 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                  >
                    <Send aria-hidden="true" className="size-4" />
                    Contact on Telegram
                  </a>
                ) : (
                  <span className="flex min-h-11 w-full items-center justify-center rounded-md border border-border bg-card/70 px-4 text-sm text-muted-foreground">
                    Set NEXT_PUBLIC_TELEGRAM_ID to enable Telegram contact
                  </span>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </section>

      <section aria-labelledby="credit-costs-heading" className="mt-10">
        <div className="border-b border-border pb-4">
          <h2 id="credit-costs-heading" className="font-heading text-2xl">
            Credit costs
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Credits used each time you run an AI task.
          </p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {creditCosts.map(({ label, credits, icon: Icon, style }) => (
            <Card key={label} className="gap-0 rounded-lg border border-border py-0">
              <CardContent className="flex items-center gap-3 py-4">
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-md ${style}`}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{label}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {credits} {credits === 1 ? 'credit' : 'credits'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <p className="mt-7 text-sm text-muted-foreground">
        <Link
          href="/dashboard"
          className="text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Return to your workspace
        </Link>
      </p>
    </main>
  );
}
