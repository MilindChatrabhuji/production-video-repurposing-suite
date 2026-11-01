# Production Deployment & Installation Manual
**Way #54 / Product #56: Production Video Repurposing Suite**

---

## 1. Prerequisites
- Node.js v18.0.0 or higher
- npm or pnpm
- Cloudflare Wrangler CLI (`npm install -g wrangler`)
- FFmpeg v5.0+ installed locally for video rendering

---

## 2. Local Setup & Testing
1. Clone the repository:
   ```bash
   git clone https://github.com/MilindChatrabhuji/production-video-repurposing-suite.git
   cd production-video-repurposing-suite
   ```

2. Test Pack 1 (Video Engine):
   ```bash
   cd engine/video_repurposing_engine
   npm install
   npm run build
   ```

3. Test Pack 2 (Edge Gateway):
   ```bash
   cd ../edge_video_gateway
   npm install
   npx wrangler dev
   ```

4. Launch Showcase:
   Open `showcase/index.html` directly in any web browser.

---

## 3. Cloudflare Edge Deployment
Deploy the edge gateway microservice:
```bash
cd engine/edge_video_gateway
npx wrangler deploy
```

---

## 4. D1 Database Initialization (Optional)
```bash
npx wrangler d1 create video-repurposing-db
npx wrangler d1 execute video-repurposing-db --file=../../monetization_video_kit/schema.sql
```
