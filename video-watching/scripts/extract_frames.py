#!/usr/bin/env python3
"""Sample keyframes from a video with ffmpeg for visual analysis.

Usage:
    extract_frames.py <video> <output_dir> [--interval SECONDS] [--max-frames N]

Frames are written as frame_<seconds>.jpg so the timestamp is recoverable
from the filename. If sampling at --interval would produce more than
--max-frames frames, the interval is widened so frames stay spread evenly
across the whole video.
"""
import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path


def probe_duration(video: Path) -> float:
    result = subprocess.run(
        [
            "ffprobe", "-v", "error", "-show_entries", "format=duration",
            "-of", "json", str(video),
        ],
        capture_output=True, text=True, check=True,
    )
    return float(json.loads(result.stdout)["format"]["duration"])


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("video", type=Path)
    parser.add_argument("output_dir", type=Path)
    parser.add_argument("--interval", type=float, default=5.0,
                         help="seconds between sampled frames (default: 5)")
    parser.add_argument("--max-frames", type=int, default=40,
                         help="cap on total frames extracted (default: 40)")
    args = parser.parse_args()

    if shutil.which("ffmpeg") is None or shutil.which("ffprobe") is None:
        print("ffmpeg/ffprobe not found on PATH.", file=sys.stderr)
        return 1

    if not args.video.exists():
        print(f"video not found: {args.video}", file=sys.stderr)
        return 1

    args.output_dir.mkdir(parents=True, exist_ok=True)

    duration = probe_duration(args.video)
    interval = args.interval
    frame_count = int(duration // interval) + 1
    if frame_count > args.max_frames:
        interval = duration / args.max_frames
        frame_count = args.max_frames

    timestamps = [round(i * interval, 2) for i in range(frame_count)
                  if i * interval < duration]

    for ts in timestamps:
        out_path = args.output_dir / f"frame_{int(ts):06d}.jpg"
        subprocess.run(
            [
                "ffmpeg", "-y", "-ss", str(ts), "-i", str(args.video),
                "-frames:v", "1", "-q:v", "2", str(out_path),
            ],
            capture_output=True, check=True,
        )

    print(f"Extracted {len(timestamps)} frame(s) to {args.output_dir} "
          f"(~{interval:.1f}s apart, video duration {duration:.1f}s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
