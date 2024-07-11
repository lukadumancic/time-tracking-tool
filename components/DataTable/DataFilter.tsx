import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";

import styles from "./styles.module.css";
import { useState } from "react";

const DataFilter = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState();

  return (
    <div className={styles.wrapper}>
      <div className={styles.itemWrapper}>
        <FloatLabel>
          <InputText
            type="date"
            id="startDate"
            placeholder=""
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <label htmlFor="endDate">End date</label>
        </FloatLabel>
      </div>
      <div className={styles.itemWrapper}>
        <FloatLabel>
          <InputText
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="description">Description</label>
        </FloatLabel>
      </div>
    </div>
  );
};

export default DataFilter;
