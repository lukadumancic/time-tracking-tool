"use client";
import { DataTable as DataTablePrimeReact } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import DataFilter from "./DataFilter";

const data = [
  {
    description: "Test 1",
    timeLogged: 1,
    date: new Date(),
  },
  {
    description: "Test 2",
    timeLogged: 1,
    date: new Date(),
  },
  {
    description: "Test 3",
    timeLogged: 1,
    date: new Date(),
  },
  {
    description: "Test 4",
    timeLogged: 1,
    date: new Date(),
  },
  {
    description: "Test 1",
    timeLogged: 1,
    date: new Date(),
  },
  {
    description: "Test 2",
    timeLogged: 1,
    date: new Date(),
  },
  {
    description: "Test 3",
    timeLogged: 1,
    date: new Date(),
  },
  {
    description: "Test 4",
    timeLogged: 1,
    date: new Date(),
  },
];

const DataTable = () => {
  return (
    <>
      <DataFilter />
      <DataTablePrimeReact
        style={{ width: "100%" }}
        rows={5}
        paginator
        rowsPerPageOptions={[5, 10, 25, 50]}
        value={data}
        tableStyle={{ minWidth: "220px" }}
        emptyMessage="No trackers found."
      >
        <Column field="timeLogged" header="Time Logged"></Column>
        <Column field="description" header="Desciption"></Column>
        <Column field="actions" header="Actions"></Column>
      </DataTablePrimeReact>
    </>
  );
};

export default DataTable;
