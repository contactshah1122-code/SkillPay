import fs from 'fs';
import zlib from 'zlib';

function createSolidPNG(width, height, r, g, b) {
  // Simple uncompressed or deflated raw truecolor PNG generator
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 2; // color type (RGB)
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // Raw image data: filter byte 0 + (r,g,b) per pixel
  const rowLength = 1 + width * 3;
  const rawData = Buffer.alloc(rowLength * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowLength;
    rawData[rowOffset] = 0; // filter None
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 3;
      // create emerald green gradient with gold center
      const dx = (x - width / 2) / (width / 2);
      const dy = (y - height / 2) / (height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 0.4) {
        rawData[pxOffset] = 234;     // R (Gold)
        rawData[pxOffset + 1] = 179; // G
        rawData[pxOffset + 2] = 8;   // B
      } else {
        rawData[pxOffset] = 4;       // R (Pakistani Emerald)
        rawData[pxOffset + 1] = 78;  // G
        rawData[pxOffset + 2] = 59;  // B
      }
    }
  }

  const deflated = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(12 + len);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crc = crc32(Buffer.concat([Buffer.from(type, 'ascii'), data]));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

function crc32(buf) {
  let table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }
  let crc = 0 ^ -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public', { recursive: true });
}

fs.writeFileSync('./public/pwa-192x192.png', createSolidPNG(192, 192, 4, 120, 87));
fs.writeFileSync('./public/pwa-512x512.png', createSolidPNG(512, 512, 4, 120, 87));
fs.writeFileSync('./public/pwa-maskable-512x512.png', createSolidPNG(512, 512, 4, 120, 87));
fs.writeFileSync('./public/apple-touch-icon.png', createSolidPNG(180, 180, 4, 120, 87));
console.log('PWA PNG icons generated successfully!');
