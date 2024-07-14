import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { filterTrackers } from "@/store/slices/trackerSlice";

const DataFilter = () => {
  const [startDate, setStartDate] = useState<any>('');
  const [endDate, setEndDate] = useState<any>('');
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(filterTrackers({ startDate, endDate, description }));
  }, [startDate, endDate, description]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.itemWrapper}>
        <FloatLabel>
          <InputText
            type="date"
            id="startDate"
            placeholder=""
            value={startDate || Date.now()}
            onChange={handleStartDateChange}
          />
          <label htmlFor="startDate">Start date</label>
        </FloatLabel>
      </div>
      <div className={styles.itemWrapper}>
        <FloatLabel>
          <InputText
            type="date"
            placeholder=""
            id="endDate"
            value={endDate || Date.now()}
            onChange={handleEndDateChange}
          />
          <label htmlFor="endDate">End date</label>
        </FloatLabel>
      </div>
      <div className={styles.itemWrapper}>
        <FloatLabel>
          <InputText
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
          <label htmlFor="description">Description</label>
        </FloatLabel>
      </div>
    </div>
  );
};

export default DataFilter;
