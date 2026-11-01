# Client Delivery & Retainer Execution Workflow
**Standard Operating Procedure for Video Repurposing Retainers**

---

## 1. Video Ingestion (T-0 Hours)
1. Client uploads master footage to secure Cloudflare R2 / S3 presigned URL.
2. Ingest transcript into `VideoCutSegmenter` to identify high-virality hook points.

---

## 2. Dynamic Captioning & Re-Framing (T-24 Hours)
1. Crop horizontal 16:9 video to vertical 9:16 safe-zone framing.
2. Generate word-level karaoke animated subtitles (.ass) via `DynamicCaptionGenerator`.
3. Render short-form clips via `PlatformSpecExporter` FFmpeg filtergraph commands.
4. Prepare multi-platform metadata packets via `VideoMetadataGenerator`.

---

## 3. Client Review & Delivery (T-48 Hours)
1. Deliver video preview files and metadata text to client.
2. Incorporate revisions (24h SLA).
3. Transmit final 1080x1920 MP4 assets.
