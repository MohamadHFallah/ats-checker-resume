'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import type { SavedResume } from './types';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

type DashboardContextValue = {
  resumes: SavedResume[];
  selected: SavedResume | null;
  loading: boolean;
  error: string | null;
  selectResume: (resume: SavedResume) => void;
  setResumes: React.Dispatch<React.SetStateAction<SavedResume[]>>;
  setSelected: React.Dispatch<React.SetStateAction<SavedResume | null>>;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used within DashboardLayout.');
  return context;
}

export function DashboardSidebar({
  resumes,
  selected,
  onSelect,
}: {
  resumes: SavedResume[];
  selected: SavedResume | null;
  onSelect: (resume: SavedResume) => void;
}) {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Saved resumes</SidebarGroupLabel>
          <SidebarMenu>
            {resumes.map((resume) => (
              <SidebarMenuItem key={resume.id}>
                <SidebarMenuButton
                  isActive={selected?.id === resume.id}
                  onClick={() => onSelect(resume)}
                  tooltip={resume.title}
                >
                  <FileText aria-hidden="true" />
                  <span className="truncate">{resume.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [selected, setSelected] = useState<SavedResume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function loadResumes() {
      try {
        const response = await fetch('/api/resumes');
        if (!active) return;
        if (response.status === 401) {
          setError('Sign in to view your saved resumes.');
          return;
        }
        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as { error?: string } | null;
          throw new Error(data?.error ?? 'Your resumes couldn’t be loaded. Please try again.');
        }
        const data: { resumes: SavedResume[] } = await response.json();
        if (!active) return;
        setResumes(data.resumes);
        const requestedId = new URLSearchParams(window.location.search).get('resume');
        setSelected(
          data.resumes.find((resume) => resume.id === requestedId) ?? data.resumes[0] ?? null
        );
      } catch (loadError) {
        if (active)
          setError(loadError instanceof Error ? loadError.message : 'Something went wrong.');
      } finally {
        if (active) setLoading(false);
      }
    }
    void loadResumes();
    return () => {
      active = false;
    };
  }, []);

  function selectResume(resume: SavedResume) {
    setSelected(resume);
    const url = new URL(window.location.href);
    url.searchParams.set('resume', resume.id);
    url.searchParams.delete('comparison');
    window.history.replaceState(null, '', url);
  }

  return (
    <SidebarProvider>
      <DashboardSidebar resumes={resumes} selected={selected} onSelect={selectResume} />
      <SidebarInset>
        <div className="flex min-h-svh min-w-0 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <SidebarTrigger aria-label="Toggle saved resumes sidebar" />
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary">
                <Sparkles aria-hidden="true" className="size-5" />
                <span className="truncate">ATSFriendly</span>
              </Link>
            </div>
            <Button
              onClick={async () => {
                await authClient.signOut({
                  fetchOptions: { onSuccess: () => router.push('/') },
                });
              }}
            >
              Sign out
            </Button>
          </header>
          <DashboardContext.Provider
            value={{
              resumes,
              selected,
              loading,
              error,
              selectResume,
              setResumes,
              setSelected,
            }}
          >
            {loading ? (
              <main className="flex min-h-[60vh] items-center justify-center">
                <p role="status" className="text-sm text-muted-foreground">
                  Loading your dashboard…
                </p>
              </main>
            ) : error ? (
              <main className="p-6">
                <div
                  role="alert"
                  className="rounded-md border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-800"
                >
                  {error}
                </div>
              </main>
            ) : (
              children
            )}
          </DashboardContext.Provider>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
