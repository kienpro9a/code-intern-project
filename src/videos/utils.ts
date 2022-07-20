import { REGEX_TIME } from "src/common/constants/common.constants";

export const toHHMMSSFFF = (time: number) => {
  const milliseconds = Math.floor(time % 1000);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  const texthours = hours < 10 ? "0" + hours : hours;
  const textminutes = minutes < 10 ? "0" + minutes : minutes;
  const textseconds = seconds < 10 ? "0" + seconds : seconds;
  return texthours + ":" + textminutes + ":" + textseconds + "." + milliseconds;
};

export const toHHMMSS = (secs: number) => {
  const seconds = Math.floor(secs % 60);
  const minutes = Math.floor(secs / 60) % 60;
  const hours = Math.floor(secs / 3600);
  const texthours = hours < 10 ? "0" + hours : hours;
  const textminutes = minutes < 10 ? "0" + minutes : minutes;
  const textseconds = seconds < 10 ? "0" + seconds : seconds;
  return texthours + ":" + textminutes + ":" + textseconds;
};

export const toMillisecond = (time: string) => {
  const checktime = time.match(REGEX_TIME);
  if (checktime) {
    let millisec = 0;
    for (let i = 1; i < checktime.length; i++) {
      if (checktime[i]) {
        if (time.includes(".") && i === checktime.length - 1) {
          millisec += +checktime[i];
        } else millisec += +checktime[i] * 1000 * Math.pow(60, checktime.length - i - 2);
      }
    }
    return millisec;
  }
  return null;
};
