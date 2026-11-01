# Pack 2 Architecture & API Catalog
**Module Identifier:** `engine/edge_video_gateway`  
**Version:** 1.0.0  
**License:** Commercial Single Pack ($9.00 USD) / Master Suite ($19.00 USD)

## Exported Classes & Methods
- `VideoMetadataGenerator`:
  - `generate(input: ClipMetadataInput): GeneratedMetadataPayload`
- `WebhookDispatcher`:
  - `generatePresignedUploadUrl(fileName: string, contentType?: string)`
  - `dispatchWebhook(callbackUrl: string, jobStatus: RenderJobStatus)`
- `worker`:
  - Default Cloudflare Workers fetch handler.
