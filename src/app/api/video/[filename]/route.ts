import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename;

  // Sanitize filename to prevent directory traversal
  const safeFilename = path.basename(filename);
  let filePath = path.join(process.cwd(), safeFilename);

  // If not found in root, check public/videos
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), 'public', 'videos', safeFilename);
  }

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Video not found', { status: 404 });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = request.headers.get('range');

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : Math.min(start + 5 * 1024 * 1024 - 1, fileSize - 1); // 5MB chunk max
    const chunkSize = end - start + 1;

    const fileStream = fs.createReadStream(filePath, { start, end });
    const stream = new ReadableStream({
      start(controller) {
        fileStream.on('data', (chunk) => controller.enqueue(chunk));
        fileStream.on('end', () => controller.close());
        fileStream.on('error', (err) => controller.error(err));
      },
      cancel() {
        fileStream.destroy();
      },
    });

    return new NextResponse(stream as any, {
      status: 206,
      headers: {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize.toString(),
        'Content-Type': 'video/mp4',
      },
    });
  } else {
    // Return first 5MB or full if small
    const end = Math.min(fileSize - 1, 5 * 1024 * 1024 - 1);
    const fileStream = fs.createReadStream(filePath, { start: 0, end });
    const stream = new ReadableStream({
      start(controller) {
        fileStream.on('data', (chunk) => controller.enqueue(chunk));
        fileStream.on('end', () => controller.close());
        fileStream.on('error', (err) => controller.error(err));
      },
      cancel() {
        fileStream.destroy();
      },
    });

    return new NextResponse(stream as any, {
      status: 200,
      headers: {
        'Content-Length': (end + 1).toString(),
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes',
      },
    });
  }
}
