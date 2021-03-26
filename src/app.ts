import Mirai from "mirai-ts";
import {
  ChatMessage,
  Image as ImageBody,
} from "mirai-ts/dist/types/message-type";
import { downloadImage } from "./download";
import { AUTH_KEY, ENABLE_WEBSOCKET, HOST, PORT, QQ } from "./config";

const mahConfig = {
  host: HOST,
  port: PORT,
  authKey: AUTH_KEY,
  enableWebsocket: ENABLE_WEBSOCKET,
};

const mirai = new Mirai(mahConfig);

function getImageBody(msg: ChatMessage): ImageBody | undefined {
  const type = msg.type;
  if (type === "FriendMessage") {
    const body = msg.messageChain[1];
    const bodyType = body.type;
    if (bodyType === "Image") {
      return body as ImageBody;
    }
  }
}

(async function app() {
  await mirai.link(QQ);
  mirai.on("message", async (msg) => {
    const body = getImageBody(msg);
    if (body?.imageId && body?.url) {
      try {
        await downloadImage(body.imageId, body.url);
        msg.reply(`图片${body.imageId}下载成功！`);
      } catch (e) {
        console.error(e);
      }
    }
    // 复读
    // msg.reply(msg.messageChain);
  });
  mirai.listen();
})();
