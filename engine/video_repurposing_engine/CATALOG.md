# Pack 1 Architecture & API Catalog
**Module Identifier:** `engine/video_repurposing_engine`  
**Version:** 1.0.0  
**License:** Commercial Single Pack ($9.00 USD) / Master Suite ($19.00 USD)

## Exported Classes & Methods
- `VideoCutSegmenter`:
  - `segmentClips(segments: SpeechSegment[]): CandidateClip[]`
- `DynamicCaptionGenerator`:
  - `generateAssKaraoke(words: WordTimed[], styleOverride?): string`
  - `generateWebVtt(words: WordTimed[]): string`
- `PlatformSpecExporter`:
  - `generateFfmpegCommand(options): string`
- `VideoRepurposingEngine`:
  - Unified facade class.
