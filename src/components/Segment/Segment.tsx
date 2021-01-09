import React from "react";

import ISegment from "../../interfaces/ISegment";
import { formatDuration, formatInterval, formatStopsText } from "../../utils";
import "./Segment.scss";

const Segment: React.FC<ISegment> = (props: ISegment) => {
  const { origin, destination, date, duration, stops } = props;

  return (
    <div className="ticket__segment segment">
      <div className="segment__column">
        <div className="label">
          {origin} - {destination}
        </div>
        <div className="value">{formatInterval(date, duration)}</div>
      </div>
      <div className="segment__column">
        <div className="label">В пути</div>
        <div className="value">{formatDuration(duration)}</div>
      </div>
      <div className="segment__column">
        <div className="label">{formatStopsText(stops.length)}</div>
        <div className="value">{stops && stops.join(", ")}</div>
      </div>
    </div>
  );
};

export default Segment;
