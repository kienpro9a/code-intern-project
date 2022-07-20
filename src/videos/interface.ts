// AddEditVideo
export interface VideotranscriptInputType {
  start: string;
  end: string;
  transcript: string;
}

export interface TranscriptChosenType {
  index: number;
  text: string;
  duration: number;
  offset: number;
}

export interface TranscriptVideoType {
  text: string;
  duration: number;
  offset: number;
}

export interface InitialStateAddVideoType {
  levelKey: string;
  transcripts: TranscriptVideoType[];
  name: string;
  desc: string;
  videoUrl: string;
  topicKeys: string[];
  highlightWords: string[];
}

export interface InitialStateEditVideoType {
  levelKey: string;
  name: string;
  desc: string;
  videoId: number;
}
