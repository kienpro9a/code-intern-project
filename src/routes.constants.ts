export const LOGIN_PAGE = "/login";
export const HOME_PAGE = "/";
export const DICTIONARY_PAGE = "/dictionary";
export const USER_INFO = "/user-info";
export const AUTHORIZATION = "/authorization";
export const VIDEO_PAGE = "/video";
export const ADDVIDEO_PAGE = relativePath([VIDEO_PAGE, "add-video"]);
export const EDITVIDEO_PAGE = relativePath([VIDEO_PAGE, "details/:videoID"]);
export const PODCAST_PAGE = "/podcast";
export const ADDPODCAST_PAGE = relativePath([PODCAST_PAGE, "add-podcast"]);
export const EDITPODCAST_PAGE = relativePath([PODCAST_PAGE, "details/:podcastID"]);
function relativePath(paths: string[]) {
  return paths.join("/");
}
