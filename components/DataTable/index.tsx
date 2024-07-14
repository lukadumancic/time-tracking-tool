"use client";

import React, { useEffect } from "react";
import { DataTable as DataTablePrimeReact } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import {
  startTracker,
  stopTracker,
  updateTrackerDescription,
  removeTracker,
  stopAllTrackers,
  setTrackers,
  addTracker,
} from "@/store/slices/trackerSlice";
import {
  addTrackerToFirebase,
  fetchTrackers,
  updateTrackerInFirebase,
  removeTrackerFromFirebase,
  pauseTrackerInFirebase,
  stopTrackerInFirebase,
} from "@/store/asyncActions/trackerActions";

import DataFilter from "./DataFilter";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { trackerSelector } from "@/store/selectors";
import useTimer from "@/hooks/useTimer";
import { firestore } from "@/store/firebase";
import { doc, updateDoc } from "firebase/firestore";

const DataTable = ({ filter }: { filter?: boolean }) => {
  const dispatch = useAppDispatch();
  const trackerData = useAppSelector(trackerSelector);

  useEffect(() => {
    dispatch(fetchTrackers());
  }, []);

  const handleStart = (id: string) => {
    dispatch(startTracker(id));
  };

  const handlePause = (id: string) => {
    dispatch(pauseTrackerInFirebase(id));
  };

  const handleStop = (id: string) => {
    dispatch(stopTrackerInFirebase(id));
  };

  const handleEdit = (id: string, description: string) => {
    dispatch(updateTrackerDescription({ id, description }));
    const tracker = trackerData.trackers.find((t: any) => t.id === id);
    if (tracker) {
      const tmpTracker = structuredClone(tracker);
      tmpTracker.description = description;

      const trackerDoc = doc(firestore, "trackers", tracker.id);
      updateDoc(trackerDoc, tracker as any).then(console.log);
      dispatch(updateTrackerInFirebase(tmpTracker));
    }
  };

  const handleDelete = async (id: string) => {
    await dispatch(removeTrackerFromFirebase(id));
  };

  const handleAddTracker = async () => {
    const id = (Math.random() * 10000).toString();
    const description =
      prompt("Enter Description", "New Tracker") || "New Tracker";
    const newTracker = {
      id,
      description,
      createdAt: new Date(),
      isRunning: false,
      startTime: null,
      timeLogged: 0,
    };
    await dispatch(addTrackerToFirebase(newTracker));
  };

  const handleStopAll = () => {
    dispatch(stopAllTrackers());
  };

  const formatTime = (milliseconds: number) => {
    const seconds = (Math.floor(milliseconds / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const minutes = (Math.floor(milliseconds / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    const hours = Math.floor(milliseconds / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const actionTemplate = (rowData: any) => {
    return (
      <div>
        {rowData.isRunning ? (
          <Button
            onClick={() => handlePause(rowData.id)}
            icon="pi pi-pause"
            rounded
            text
            severity="warning"
            aria-label="Pause"
          />
        ) : (
          <Button
            onClick={() => handleStart(rowData.id)}
            icon="pi pi-play"
            rounded
            text
            severity="warning"
            aria-label="Start"
          />
        )}
        <Button
          onClick={() => handleStop(rowData.id)}
          icon="pi pi-stop-circle"
          rounded
          text
          severity="info"
          aria-label="Pause"
        />
        {!filter && (
          <>
            <Button
              onClick={() =>
                handleEdit(
                  rowData.id,
                  prompt("Edit Description", rowData.description) ||
                    rowData.description
                )
              }
              icon="pi pi-pencil"
              rounded
              text
              severity="info"
              aria-label="Edit"
            />
            <Button
              onClick={() => handleDelete(rowData.id)}
              icon="pi pi-trash"
              rounded
              text
              severity="info"
              aria-label="Edit"
            />
          </>
        )}
      </div>
    );
  };

  const timeLoggedTemplate = (rowData: any) => {
    const timeLogged = useTimer(
      rowData.isRunning,
      rowData.startTime,
      rowData.timeLogged
    );
    return <div>{formatTime(timeLogged)}</div>;
  };

  const trackers = filter
    ? trackerData.filteredTrackers
    : trackerData.trackers.filter((tracker: any) => {
        const createdAt = new Date(tracker.createdAt);
        const today = new Date();
        return (
          createdAt.getDate() === today.getDate() &&
          createdAt.getMonth() === today.getMonth() &&
          createdAt.getFullYear() === today.getFullYear()
        );
      });

  return (
    <>
      {filter ? (
        <>
          <h2>History</h2>
          <DataFilter />
        </>
      ) : (
        <h2>
          <i
            className="pi pi-calendar"
            style={{ fontSize: "24px", marginRight: "16px" }}
          ></i>
          Today ({new Date().toLocaleDateString("en-EN")})
        </h2>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "end",
          marginBottom: "10px",
        }}
      >
        <Button
          label="Start new timer"
          severity="warning"
          icon="pi pi-clock"
          size="small"
          onClick={handleAddTracker}
        />
        <Button
          style={{ marginLeft: "16px" }}
          label="Stop all"
          severity="info"
          icon="pi pi-stop-circle"
          size="small"
          onClick={handleStopAll}
        />
      </div>
      <DataTablePrimeReact
        style={{ width: "100%" }}
        rows={5}
        paginator
        rowsPerPageOptions={[5, 10, 25, 50]}
        value={trackers}
        tableStyle={{ minWidth: "220px" }}
        emptyMessage="No trackers found."
      >
        <Column
          field="timeLogged"
          header="Time Logged"
          body={timeLoggedTemplate}
        />
        <Column field="description" header="Description" />
        <Column header="Actions" body={actionTemplate} />
      </DataTablePrimeReact>
    </>
  );
};

export default DataTable;
