import fs from "fs";
import path from "path";
import http from "http";
import { DOWNLOAD_PATH } from "./config";

const imageTypeMapper = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/gif", ".gif"],
]);

export function downloadImage(imageId: string, url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let imgData = "";
      const imageType = res.headers["content-type"] as string;
      const fileExt = imageTypeMapper.get(imageType);
      res.setEncoding("binary");
      res.on("data", (chunk) => (imgData += chunk));
      res.on("end", () => {
        fs.writeFileSync(
          path.resolve(process.cwd(), DOWNLOAD_PATH, imageId + fileExt),
          imgData,
          "binary"
        );
        resolve();
      });
      res.on("error", (err) => reject(err));
    });
  });
}
