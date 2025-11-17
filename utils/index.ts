import YTDlpWrap, { type YTDlpOptions } from "yt-dlp-wrap";
import path from "path";

class TikTokDownloader {
  private ytDlpWrap: YTDlpWrap;

  constructor(binaryPath: string = "yt-dlp") {
    this.ytDlpWrap = new YTDlpWrap(binaryPath);
  }

  hasVideo(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const emitter = this.exec(["-s", url]);

      emitter.on("ytDlpEvent", (event, data) => {
        console.log(`[${event}] ${data}`);
      });

      emitter.on("error", (error) => {
        reject(error);
      });
    });
  }

  exec(
    args: string[] = [],
    options: YTDlpOptions = {},
    signal: AbortSignal | null = null,
  ) {
    args.push("--cookies", "cookies.txt");
    return this.ytDlpWrap.exec(args, options, signal);
  }

  execStream(
    args: string[] = [],
    options: YTDlpOptions = {},
    signal: AbortSignal | null = null,
  ) {
    args.push("--cookies", "cookies.txt");
    return this.ytDlpWrap.execStream(args, options, signal);
  }

  async streamVideo(videoUrl: string, withWatermark: boolean = false) {
    const ext =
      "best" +
      (withWatermark ? "[format_note*=watermarked][ext=mp4]" : "[ext=mp4]");
    const ytDlpEventEmitter = this.execStream([videoUrl, "-f", ext]);

    return ytDlpEventEmitter;
  }

  /**
   * Unduh video TikTok tanpa watermark
   * @param videoUrl URL video TikTok
   * @param outputFolder Folder untuk menyimpan video
   * @returns Promise<string> Path file yang diunduh
   */
  async downloadVideo(
    videoUrl: string,
    withWatermark: boolean = false,
    outputFolder: string = "./downloads",
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const fs = require("fs");
      if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
      }

      const outputPath = path.join(outputFolder, "%(title)s.%(ext)s");

      const ext =
        "best" +
        (withWatermark ? "[format_note*=watermarked][ext=mp4]" : "[ext=mp4]");
      const ytDlpEventEmitter = this.exec([
        videoUrl,
        "-f",
        ext,
        "-o",
        outputPath,
        "--no-playlist",
      ]);

      let downloadedPath = "";

      ytDlpEventEmitter.on("progress", (progress) => {
        console.log(`Downloading: ${Math.round(progress.percent!)}% done`);
        console.log(`Speed: ${progress.currentSpeed} | ETA: ${progress.eta}`);
      });

      ytDlpEventEmitter.on("ytDlpEvent", (eventType, eventData) => {
        console.log(`[${eventType}] ${eventData}`);

        // Tangkap path file saat download selesai
        if (eventType === "download" && eventData.includes("Destination:")) {
          downloadedPath = eventData.replace("Destination: ", "").trim();
        }
      });

      ytDlpEventEmitter.on("error", (error) => {
        reject(new Error(`Download failed: ${error}`));
      });

      ytDlpEventEmitter.on("close", (code) => {
        if (code === 0 && downloadedPath) {
          resolve(downloadedPath);
        } else {
          reject(new Error(`Process exited with code ${code}`));
        }
      });
    });
  }

  /**
   * Dapatkan informasi video tanpa mengunduh
   */
  async getVideoInfo(videoUrl: string): Promise<any> {
    try {
      const info = await this.ytDlpWrap.getVideoInfo(videoUrl);
      return info;
    } catch (error) {
      throw new Error(`Failed to get video info: ${error}`);
    }
  }
}

async function main() {
  const downloader = new TikTokDownloader("./yt-dlp");

  try {
    const videoUrl = "https://vt.tiktok.com/ZSyc781F/";

    // const info = await downloader.getVideoInfo(videoUrl);
    // console.log("Video Info:", {
    //   title: info.title,
    //   duration: info.duration,
    //   uploader: info.uploader,
    // });

    const test = downloader.hasVideo(videoUrl);

    // console.log(info);
  } catch (error) {
    console.error("❌ Error:", (error as Error).message);
  }
}

if (import.meta.main) {
  main();
}

export default TikTokDownloader;
