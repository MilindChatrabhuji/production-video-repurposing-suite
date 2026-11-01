/**
 * Video Repurposing Engine Entry Point
 * Production Video Repurposing Suite (Way #54 / Product 56)
 */

export * from './video_cut_segmenter';
export * from './dynamic_caption_generator';
export * from './platform_spec_exporter';

import { VideoCutSegmenter } from './video_cut_segmenter';
import { DynamicCaptionGenerator } from './dynamic_caption_generator';
import { PlatformSpecExporter } from './platform_spec_exporter';

export class VideoRepurposingEngine {
  public segmenter = new VideoCutSegmenter();
  public captions = new DynamicCaptionGenerator();
  public specs = new PlatformSpecExporter();
}
