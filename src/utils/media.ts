import path from "path";

export const videoExtensions = [".mov"];

export type MediaType = "video" | "image";

export const getVideoType = (uri: string) => {
  return videoExtensions.includes(path.extname(uri)) ? "video" : "image";
};
