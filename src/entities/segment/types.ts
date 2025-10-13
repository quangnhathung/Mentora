export type SegmentWord = {
  text: string;
  startTime: number;
  endTime: number;
  isBlank?: boolean;
};

export type Segment = {
  text: string;
  speaker: {
    id: string;
    name: string;
  };
  words: SegmentWord[];
};
