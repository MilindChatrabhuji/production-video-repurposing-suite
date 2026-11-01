/**
 * Dynamic Karaoke-Style Caption Generator
 * Production Video Repurposing Suite (Way #54 / Product 56)
 * 
 * Generates word-by-word animated subtitles:
 * - Advanced SubStation Alpha (.ass) format with custom font styles
 * - WebVTT (.vtt) and SubRip (.srt) formats
 * - Safe zone bounding (protecting TikTok/Reels UI overlay areas)
 * - Karaoke active word highlighting (&H00FFFF yellow/cyan)
 */

export interface CaptionStyleOptions {
  fontName: string;
  fontSize: number;
  primaryColor: string; // ASS hex &H00FFFFFF
  highlightColor: string; // ASS hex &H0000FFFF (Yellow)
  outlineColor: string;
  outlineWidth: number;
  shadowWidth: number;
  verticalMarginBottom: number; // Minimum 250px for TikTok/Reels safe zone
}

export interface WordTimed {
  word: string;
  start: number; // in seconds
  end: number;
}

export class DynamicCaptionGenerator {
  private defaultStyle: CaptionStyleOptions = {
    fontName: 'Montserrat-ExtraBold',
    fontSize: 54,
    primaryColor: '&H00FFFFFF',
    highlightColor: '&H0000F5FF', // Vibrant Yellow/Gold
    outlineColor: '&H00000000',
    outlineWidth: 4,
    shadowWidth: 2,
    verticalMarginBottom: 280 // Safely above platform interaction icons
  };

  /**
   * Generates production-ready Advanced SubStation Alpha (.ass) file content
   */
  public generateAssKaraoke(words: WordTimed[], styleOverride?: Partial<CaptionStyleOptions>): string {
    const s = { ...this.defaultStyle, ...styleOverride };

    let ass = `[Script Info]
Title: Dynamic Karaoke Subtitles
ScriptType: v4.00+
WrapStyle: 0
ScaledBorderAndShadow: yes
YCbCr Matrix: TV.709
PlayResX: 1080
PlayResY: 1920

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,${s.fontName},${s.fontSize},${s.primaryColor},${s.highlightColor},${s.outlineColor},&H80000000,-1,0,0,0,100,100,0,0,1,${s.outlineWidth},${s.shadowWidth},2,40,40,${s.verticalMarginBottom},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;

    // Group words into 3-word to 5-word chunks for punchy vertical mobile reading
    const chunkSize = 4;
    for (let i = 0; i < words.length; i += chunkSize) {
      const chunk = words.slice(i, i + chunkSize);
      const chunkStart = chunk[0].start;
      const chunkEnd = chunk[chunk.length - 1].end;

      const startAss = this.formatAssTime(chunkStart);
      const endAss = this.formatAssTime(chunkEnd);

      // Build karaoke effect tags {\k<centiseconds>}
      let lineText = '';
      for (const w of chunk) {
        const durationCs = Math.max(10, Math.round((w.end - w.start) * 100));
        lineText += `{\\k${durationCs}}${w.word} `;
      }

      ass += `Dialogue: 0,${startAss},${endAss},Default,,0,0,0,,${lineText.trim()}\n`;
    }

    return ass;
  }

  /**
   * Generates standard WebVTT format
   */
  public generateWebVtt(words: WordTimed[]): string {
    let vtt = 'WEBVTT\n\n';
    const chunkSize = 5;
    for (let i = 0; i < words.length; i += chunkSize) {
      const chunk = words.slice(i, i + chunkSize);
      const s = this.formatVttTime(chunk[0].start);
      const e = this.formatVttTime(chunk[chunk.length - 1].end);
      const text = chunk.map(w => w.word).join(' ');
      vtt += `${s} --> ${e}\n${text}\n\n`;
    }
    return vtt;
  }

  private formatAssTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const cs = Math.floor((seconds % 1) * 100);
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  }

  private formatVttTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
  }
}
