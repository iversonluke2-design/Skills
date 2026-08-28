---
name: video-watching
description: Analyze or "watch" a video file or URL by sampling keyframes with ffmpeg and pairing them with the audio transcript, so Claude can describe visual content, on-screen text, and events over time instead of only the spoken words. Use when the user shares a video and asks Claude to watch, describe, summarize, review, or answer questions about what happens in it, or requests a scene-by-scene breakdown.
---

# Video Watching

Claude cannot play video directly, but can approximate "watching" it by combining
two things along a shared timeline:

1. **Keyframes** — still images sampled from the video at intervals, read with the
   Read tool so Claude can see actions, on-screen text, people, and cuts.
2. **Transcript** — the spoken audio, from an existing transcript tool when the
   source has one (e.g. YouTube), or transcribed from the extracted audio track.

Skip this skill for audio-only files (just transcribe) or when the user only
wants the transcript/captions — fetch that directly instead of extracting frames.

## Workflow

### 1. Get the video onto disk
- Local file path given: use it as-is.
- YouTube URL: prefer a transcript/metadata tool already available in the session
  (e.g. a YouTube transcript MCP tool) over downloading the video. Only download
  the actual video file if visual analysis is required and a downloader (e.g.
  `yt-dlp`) is present — check with `which yt-dlp` first; don't install packages
  unless the user asks.
- Other URLs: fetch only if the file is a reasonable size and doing so is
  appropriate for the source.

### 2. Extract keyframes
Check `which ffmpeg` first — this step requires it. Then run:

```
python3 scripts/extract_frames.py <video> <output_dir> [--interval SECONDS] [--max-frames N]
```

Default: one frame every 5 seconds, capped at 40 frames total (frames are
resampled evenly across the duration if that cap would otherwise be exceeded).
Frames are named `frame_<seconds>.jpg` so timestamps are recoverable from the
filename.

### 3. Get the transcript
- If a transcript tool exists for the source, use it instead of transcribing
  audio yourself — it will be more accurate and already timestamped.
- Otherwise extract audio with ffmpeg (`ffmpeg -i <video> -vn -ac 1 -ar 16000
  audio.wav`) and transcribe it only if a speech-to-text tool is available in
  the session. If none is available, say so and proceed on visuals alone.

### 4. Read and describe
Read each extracted frame in timestamp order (the Read tool displays images
directly). Cross-reference frame timestamps against the transcript's
timestamps to build one chronological account of what's shown and said.

### 5. Answer the user's request
Synthesize frames + transcript into whatever was asked (summary, Q&A, scene
breakdown, fact-check, etc.), citing approximate timestamps for claims.

## Limitations
This is a sampling approximation, not true playback — content between sampled
frames, fast motion, or brief on-screen text can be missed. Say so plainly if
the user's question needs frame-perfect precision (e.g. "count exactly how
many times X appears").
