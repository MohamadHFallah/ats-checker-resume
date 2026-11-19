import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import type { SavedResume } from "./types";

type ResumeSidebarProps = {
  resumes: SavedResume[];
  selected: SavedResume | null;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (resume: SavedResume) => void;
};

export function ResumeSidebar({ resumes, selected, isOpen, onToggle, onSelect }: ResumeSidebarProps) {
  return (
    <aside className={`min-w-0 border-b border-border pb-5 lg:border-b-0 lg:border-r lg:pb-0 ${isOpen ? "lg:pr-5" : "lg:pr-2"}`}>
      <div className={`mb-3 flex items-center ${isOpen ? "justify-between" : "justify-center"}`}>
        {isOpen && <h2 className="text-sm font-medium">Saved resumes</h2>}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Collapse saved resumes sidebar" : "Expand saved resumes sidebar"}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-border bg-card hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {isOpen ? <ChevronLeft aria-hidden="true" className="size-4" /> : <ChevronRight aria-hidden="true" className="size-4" />}
        </button>
      </div>
      <nav aria-label="Saved resumes">
        <ul className={`flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible ${isOpen ? "" : "lg:items-center"}`}>
          {resumes.map((resume) => (
            <li key={resume.id} className="shrink-0 lg:w-full">
              <button
                type="button"
                onClick={() => onSelect(resume)}
                aria-current={selected?.id === resume.id ? "page" : undefined}
                aria-label={isOpen ? undefined : `${resume.title}, ${new Date(resume.createdAt).toLocaleDateString()}`}
                title={isOpen ? undefined : resume.title}
                className={`min-h-11 w-full rounded-md border text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isOpen ? "px-3 py-2" : "flex items-center justify-center px-1 py-2"} ${selected?.id === resume.id ? "border-primary bg-accent" : "border-border bg-card hover:bg-muted"}`}
              >
                {isOpen ? (
                  <>
                    <span className="block max-w-[230px] truncate text-sm font-medium">{resume.title}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{new Date(resume.createdAt).toLocaleDateString()}</span>
                  </>
                ) : <FileText aria-hidden="true" className="size-4" />}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
