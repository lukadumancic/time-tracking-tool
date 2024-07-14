import { createSelector } from "reselect";
import { getStore } from ".";

export const userSelector = createSelector(
  [getStore],
  (s) => s.user
);

export const trackerSelector = createSelector(
  [getStore],
  (s) => s.trackers
);
