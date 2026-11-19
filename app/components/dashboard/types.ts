import type { ATSResponse } from '@/app/components/ATSCheckerCom';
import type { ATSJobDescriptionResult } from '@/app/components/atsJob';

export type SavedResume = {
  id: string;
  title: string;
  createdAt: string;
  analysis: ATSResponse | null;
  comparisons: SavedComparison[];
};

export type SavedComparison = {
  id: string;
  title: string;
  createdAt: string;
  analysis: ATSJobDescriptionResult;
};
