import { Telegraf } from "telegraf";
import TikTokDownloader from "./utils/";

const bot = new Telegraf(process.env.BOT_TOKEN || "");

bot.start((ctx) => {
  ctx.reply("Hello!");
});

bot.on("message", async (ctx) => {
  const urlParser =
    /https?:\/\/(?:www\.)?(?:vt|vm)\.tiktok\.com\/[A-Za-z0-9]+\/?|https?:\/\/(?:www\.)?tiktok\.com\/@[A-Za-z0-9._]+\/video\/\d+|https?:\/\/(?:www\.)?instagram\.com\/reel\/[A-Za-z0-9_-]+\/?|https?:\/\/(?:www\.)?facebook\.com\/reel\/[A-Za-z0-9]+\/?|https?:\/\/(?:www\.)?facebook\.com\/reels\/[A-Za-z0-9]+\/?/g;

  if (ctx.text) {
    const url = ctx.text.match(urlParser);

    if (url?.length) {
      const downloader = new TikTokDownloader("./yt-dlp");
      const info = await downloader.getVideoInfo(url[0]);

      const m = await ctx.reply("Downloading your video...");

      const stream = await downloader.streamVideo(url[0]);

      await ctx.replyWithVideo(
        {
          source: stream,
          filename: `${info.title}.mp4`,
        },
        {
          caption: "Thanks for using our bot! 😄",
        },
      );

      await ctx.deleteMessage(m.message_id);
    }
  }
});

await bot.launch(() => console.log("Bot is ready!"));
