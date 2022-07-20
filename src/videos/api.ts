import { execute } from "src/common/lib/request/index";
import { LEVELS, TOPICS, VIDEOS } from "src/common/constants/urlAPI";
import { InitialStateAddVideoType, InitialStateEditVideoType } from "./interface";

export const getVideoTranscript = (url: string, videoType: string) =>
  execute.get(`${VIDEOS}/transcript?url=${url}&videoType=${videoType}`);

export const addTranscript = (addTran) => execute.post(`${VIDEOS}/transcript`, addTran);

export const editTranscript = (editTran) =>
  execute.patch(`${VIDEOS}/transcript`, editTran);

export const deleteTranscript = (transcriptId) =>
  execute.delete(`${VIDEOS}/transcript`, { data: transcriptId });

export const getVideo = (id: number) => execute.get(`${VIDEOS}/${id}`);

export const getVideos = (page: number, limit: number, search: string) =>
  execute.get(`${VIDEOS}?page=${page}&limit=${limit}&search=${search}`);

export const addVideo = (addVideo: InitialStateAddVideoType) =>
  execute.post(`${VIDEOS}`, addVideo);

export const editVideo = (editVideo: InitialStateEditVideoType) =>
  execute.patch(`${VIDEOS}`, editVideo);

export const deleteVideos = (ids) => execute.delete(`${VIDEOS}`, { data: ids });

export const addTopic = (topic) => execute.post(`${VIDEOS}/topic`, topic);

export const deleteTopic = (videoToTopicId) =>
  execute.delete(`${VIDEOS}/topic`, { data: videoToTopicId });

export const getLevels = (page: number, limit: number) =>
  execute.get(`${LEVELS}?page=${page}&limit=${limit}`);

export const getTopics = (page: number, limit: number) =>
  execute.get(`${TOPICS}?page=${page}&limit=${limit}`);
