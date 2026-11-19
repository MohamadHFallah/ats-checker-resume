import { useState } from "react";
import { ATSJobDescriptionResult } from "@/app/components/atsJob";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { SavedComparison } from "../../dashboard/components/types";

const INTRO_SEEN_KEY = "ats-checker-comparison-intro-seen";

type ComparisonDialogProps = {
  comparison: SavedComparison | null;
  onOpenChange: (open: boolean) => void;
};

export function ComparisonDialog({ comparison, onOpenChange }: ComparisonDialogProps) {
  const [introDismissed, setIntroDismissed] = useState(false);
  let showIntro = false;
  // if (comparison && !introDismissed) {
  //   try {
  //     showIntro = window.localStorage.getItem(INTRO_SEEN_KEY) !== "true";
  //   } catch {
  //     showIntro = false;
  //   }
  // }

  return (
    <Dialog open={comparison !== null} onOpenChange={(open) => { if (!open) onOpenChange(false); }}>
      {false ?(
        <DialogContent>
          <DialogHeader>
            <DialogTitle>About your job comparison</DialogTitle>
            <DialogDescription>
              This report estimates how closely your saved resume aligns with the job description. It is guidance, not an official ATS score or a guarantee of passing an applicant tracking system.
            </DialogDescription>
          </DialogHeader>
          <button
            type="button"
            onClick={() => {
              try {
                window.localStorage.setItem(INTRO_SEEN_KEY, "true");
              } catch {
                // The intro remains dismissed for this open session if storage is unavailable.
              }
              setIntroDismissed(true);
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View comparison
          </button>
        </DialogContent>
      ) : comparison && (
        <DialogContent className="max-h-[90dvh] max-w-3xl gap-0 overflow-y-auto rounded-none p-0 sm:max-w-3xl">
          <DialogHeader className="sticky top-0 border-b border-border bg-background px-5 py-4 text-left">
            <DialogTitle className="font-heading text-2xl">{comparison.title}</DialogTitle>
            <DialogDescription>Compared on {new Date(comparison.createdAt).toLocaleDateString()}</DialogDescription>
          </DialogHeader>
          <div className="px-5 py-5">
            <ATSJobDescriptionResult data={comparison.analysis} />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
