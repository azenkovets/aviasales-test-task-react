import React from "react";

import ISegment from "../../interfaces/ISegment";
import { formatDuration, formatInterval, formatStopsText } from "../../utils";

import styles from "./Segment.module.scss";

const Segment: React.FC<ISegment> = (props: ISegment) => {
  const { origin, destination, date, duration, stops } = props;

  return (
    <div className={styles.segment}>
      <div className={styles.segment__column}>
        <div className={styles.label}>
          {origin} - {destination}
        </div>
        <div className={styles.value}>{formatInterval(date, duration)}</div>
      </div>
      <div className={styles.segment__column}>
        <div className={styles.label}>В пути</div>
        <div className={styles.value}>{formatDuration(duration)}</div>
      </div>
      <div className={styles.segment__column}>
        <div className={styles.label}>{formatStopsText(stops.length)}</div>
        <div className={styles.value}>{stops && stops.join(", ")}</div>
      </div>
    </div>
  );
};

export default Segment;
