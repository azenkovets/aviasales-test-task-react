import React from "react";
import { useStoreon } from "storeon/react";

import Ticket from "../Ticket";
import IState from "../../interfaces/IState";

const TicketsList: React.FC = () => {
  const { tickets } = useStoreon<IState>("tickets");

  return (
    <div className="tickets-list">
      {tickets.map((item, index) => {
        return index < 5 && <Ticket ticketInfo={item} />;
      })}
    </div>
  );
};

export default TicketsList;
