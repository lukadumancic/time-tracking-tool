import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialTrackerState: TrackerState = {
  trackers: [],
  filteredTrackers: [],
  isLoading: false,
  errorMessage: null,
};

const trackerSlice = createSlice({
  name: "tracker",
  initialState: initialTrackerState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setErrorMessage(state, action: PayloadAction<string | null>) {
      state.errorMessage = action.payload;
    },
    setTrackers(state, action: PayloadAction<Tracker[]>) {
      state.trackers = action.payload;
      state.filteredTrackers = action.payload;
    },
    filterTrackers(state, action: PayloadAction<{ startDate: string; endDate: string; description: string }>) {
      const { startDate, endDate, description } = action.payload;
      state.filteredTrackers = state.trackers.filter((tracker) => {
        // TODO: fix filtering
        /*const createdAt = new Date(tracker.createdAt).getTime();
        const start = startDate ? new Date(startDate).getTime() : null;
        const end = endDate ? new Date(endDate).getTime() : null;
        const matchesDate = (!start || createdAt >= start) && (!end || createdAt <= end);*/
        const matchesDate = true;
        const matchesDescription = tracker.description.toLowerCase().includes(description.toLowerCase());
        return matchesDate && matchesDescription;
      });
    },
    addTracker(state, action: PayloadAction<Tracker>) {
      state.trackers.push(action.payload);
      state.filteredTrackers.push(action.payload);
    },
    startTracker(state, action: PayloadAction<string>) {
      state.trackers.forEach((t) => {
        if (t.isRunning) {
          t.isRunning = false;
          if (t.startTime) {
            t.timeLogged += Date.now() - t.startTime;
            t.startTime = null;
          }
        }
      });
      const tracker = state.trackers.find((t) => t.id === action.payload);
      if (tracker && !tracker.isRunning) {
        tracker.isRunning = true;
        tracker.startTime = Date.now();
      }
    },
    stopTracker(state, action: PayloadAction<string>) {
      const tracker = state.trackers.find((t) => t.id === action.payload);
      if (tracker && tracker.isRunning) {
        tracker.isRunning = false;
        if (tracker.startTime) {
          tracker.timeLogged += Date.now() - tracker.startTime;
          tracker.startTime = null;
        }
      }
    },
    stopAllTrackers(state) {
      state.trackers.forEach((tracker) => {
        if (tracker.isRunning) {
          tracker.isRunning = false;
          if (tracker.startTime) {
            tracker.timeLogged += Date.now() - tracker.startTime;
            tracker.startTime = null;
          }
        }
      });
    },
    updateTrackerDescription(state, action: PayloadAction<{ id: string; description: string }>) {
      const tracker = state.trackers.find((t) => t.id === action.payload.id);
      if (tracker) {
        tracker.description = action.payload.description;
      }
    },
    removeTracker(state, action: PayloadAction<string>) {
      state.trackers = state.trackers.filter((t) => t.id !== action.payload);
      state.filteredTrackers = state.filteredTrackers.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  setIsLoading,
  setErrorMessage,
  setTrackers,
  filterTrackers,
  addTracker,
  startTracker,
  stopTracker,
  stopAllTrackers,
  updateTrackerDescription,
  removeTracker,
} = trackerSlice.actions;

export default trackerSlice;
