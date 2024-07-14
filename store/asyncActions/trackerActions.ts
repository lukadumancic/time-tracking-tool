import { createAppAsyncThunk, RootState } from "..";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  setTrackers,
  addTracker,
  updateTrackerDescription,
  removeTracker,
  startTracker,
  stopTracker,
} from "../slices/trackerSlice";
import { firestore } from "../firebase";

export const fetchTrackers = createAppAsyncThunk(
  "trackers/fetchTrackers",
  async (_, { dispatch }) => {
    const querySnapshot = await getDocs(collection(firestore, "trackers"));
    const trackers = querySnapshot.docs.map((doc: any) => {
      return {
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
      } as Tracker;
    });
    dispatch(setTrackers(trackers));
    return trackers;
  }
);

export const addTrackerToFirebase = createAppAsyncThunk(
  "trackers/addTracker",
  async (tracker: Partial<Tracker>, { dispatch }) => {
    const docRef = await addDoc(collection(firestore, "trackers"), tracker);
    const newTracker = {  ...tracker, id: docRef.id };
    dispatch(addTracker(newTracker as any));
    return newTracker;
  }
);

export const updateTrackerInFirebase = createAppAsyncThunk(
  "trackers/updateTracker",
  async (tracker: Tracker, { dispatch }) => {
    const trackerDoc = doc(firestore, "trackers", tracker.id);
    await updateDoc(trackerDoc, tracker as any);
    dispatch(
      updateTrackerDescription({
        id: tracker.id,
        description: tracker.description,
      })
    );
    return tracker;
  }
);

export const removeTrackerFromFirebase = createAppAsyncThunk(
  "trackers/removeTracker",
  async (id: string, { dispatch }) => {
    await deleteDoc(doc(firestore, "trackers", id));
    dispatch(removeTracker(id));
    return id;
  }
);

export const pauseTrackerInFirebase = createAppAsyncThunk(
  "trackers/pauseTracker",
  async (id: string, { dispatch, getState }) => {
    const state = getState() as RootState;
    const tracker = state.trackers.trackers.find((t) => t.id === id);
    if (tracker && tracker.isRunning) {
      const updatedTracker = {
        ...tracker,
        isRunning: false,
        timeLogged:
          tracker.timeLogged +
          (tracker.startTime ? Date.now() - tracker.startTime : 0),
        startTime: null,
      };
      const trackerDoc = doc(firestore, "trackers", id);
      await updateDoc(trackerDoc, updatedTracker as any);
      dispatch(stopTracker(id));
      return updatedTracker;
    }
  }
);

export const stopTrackerInFirebase = createAppAsyncThunk(
  "trackers/stopTracker",
  async (id: string, { dispatch, getState }) => {
    const state = getState() as RootState;
    const tracker = state.trackers.trackers.find((t) => t.id === id);
    if (tracker && tracker.isRunning) {
      const updatedTracker = {
        ...tracker,
        isRunning: false,
        timeLogged:
          tracker.timeLogged +
          (tracker.startTime ? Date.now() - tracker.startTime : 0),
        startTime: null,
      };
      const trackerDoc = doc(firestore, "trackers", id);
      await updateDoc(trackerDoc, updatedTracker as any);
      dispatch(stopTracker(id));
      return updatedTracker;
    }
  }
);
