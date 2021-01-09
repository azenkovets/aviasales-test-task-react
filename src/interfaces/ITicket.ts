import ISegment from "./ISegment";

interface ITicket {
  price: number;
  carrier: string;
  segments: [ISegment, ISegment];
}

export default ITicket;
