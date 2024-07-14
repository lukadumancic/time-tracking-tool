interface Tracker {
  id: string;
  description: string;
  isRunning: boolean;
  startTime: number | null;
  timeLogged: number;
  createdAt: Date;
}

interface TrackerState {
  trackers: Tracker[];
  filteredTrackers: Tracker[];
  isLoading: boolean;
  errorMessage: string | null;
}
