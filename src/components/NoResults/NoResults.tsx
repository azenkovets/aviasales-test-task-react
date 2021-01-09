import React from "react";

import "./NoResults.scss";

const NoResults: React.FC = () => {
  return (
    <div className="no-results">
      <h2>Мы не нашли билетов по заданным фильтрам.</h2>
      <p>
        Попробуйте изменить значение фильтра <b>Количество пересадок</b>
      </p>
    </div>
  );
};

export default NoResults;
