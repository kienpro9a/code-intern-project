import { REGEX_YOUTUBE } from "src/common/constants/common.constants";

export function parseYoutubeUrl(url: string) {
  const urlMatch = url.match(REGEX_YOUTUBE);
  if (urlMatch) return urlMatch[1];
  return null;
}
