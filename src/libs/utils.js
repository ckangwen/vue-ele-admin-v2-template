import dayjs from "dayjs";

export const formatTime = (date, showHour = false) => dayjs(date).format(`YYYY-MM-DD${showHour ? " HH:mm:ss" : ""}`);
