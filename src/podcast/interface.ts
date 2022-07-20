// AddEditVideo
export interface InitialStateAddPodcastType {
  audioCode: string;
  audioTypeKey: string; // internet, uploaded
  title: string;
  desc: string;
  fileId: number;
  audioThumbnailId: number;
  topicKeys: string[];
  levelKey: string;
}
