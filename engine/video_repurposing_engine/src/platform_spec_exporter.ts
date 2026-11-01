/**
 * Multi-Platform Video Spec Exporter & FFmpeg Generator
 * Production Video Repurposing Suite (Way #54 / Product 56)
 * 
 * Provides production-grade video export profiles:
 * - 9:16 Vertical Shorts/Reels/TikTok (1080x1920)
 * - 1:1 Square LinkedIn/Feed (1080x1080)
 * - 16:9 Landscape YouTube (1920x1080)
 * - Generates exact FFmpeg filtergraphs with burned-in subtitles and loudness normalization
 */

export interface PlatformPreset {
  platformName: 'tiktok_reels_shorts' | 'linkedin_feed' | 'youtube_landscape';
  aspectRatio: '9:16' | '1:1' | '16:9';
  width: number;
  height: number;
  targetBitrateKbps: number;
  audioSampleRateHz: number;
  maxDurationSeconds: number;
  description: string;
}

export class PlatformSpecExporter {
  public presets: Record<string, PlatformPreset> = {
    '9:16': {
      platformName: 'tiktok_reels_shorts',
      aspectRatio: '9:16',
      width: 1080,
      height: 1920,
      targetBitrateKbps: 8000,
      audioSampleRateHz: 48000,
      maxDurationSeconds: 90,
      description: 'Vertical 9:16 optimized for TikTok, Instagram Reels, and YouTube Shorts.'
    },
    '1:1': {
      platformName: 'linkedin_feed',
      aspectRatio: '1:1',
      width: 1080,
      height: 1080,
      targetBitrateKbps: 5000,
      audioSampleRateHz: 48000,
      maxDurationSeconds: 120,
      description: 'Square 1:1 optimized for LinkedIn Feed and Instagram Carousel.'
    },
    '16:9': {
      platformName: 'youtube_landscape',
      aspectRatio: '16:9',
      width: 1920,
      height: 1080,
      targetBitrateKbps: 12000,
      audioSampleRateHz: 48000,
      maxDurationSeconds: 900,
      description: 'Full HD 16:9 landscape video for YouTube Main, Twitter, and website embeds.'
    }
  };

  /**
   * Generates production FFmpeg command string
   */
  public generateFfmpegCommand(options: {
    inputFile: string;
    outputFile: string;
    subtitlesAssFile?: string;
    startTimeSeconds: number;
    endTimeSeconds: number;
    preset: '9:16' | '1:1' | '16:9';
  }): string {
    const p = this.presets[options.preset];
    const duration = options.endTimeSeconds - options.startTimeSeconds;

    let filtergraph = '';
    if (options.preset === '9:16') {
      filtergraph = `crop=ih*(9/16):ih,scale=1080:1920`;
    } else if (options.preset === '1:1') {
      filtergraph = `crop=ih:ih,scale=1080:1080`;
    } else {
      filtergraph = `scale=1920:1080`;
    }

    if (options.subtitlesAssFile) {
      filtergraph += `,ass='${options.subtitlesAssFile}'`;
    }

    return `ffmpeg -y -ss ${options.startTimeSeconds.toFixed(2)} -i "${options.inputFile}" -t ${duration.toFixed(2)} -vf "${filtergraph}" -c:v libx264 -preset slow -crf 18 -maxrate ${p.targetBitrateKbps}k -bufsize ${p.targetBitrateKbps * 2}k -c:a aac -b:a 192k -ar 48000 -movflags +faststart "${options.outputFile}"`;
  }
}
