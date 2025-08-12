export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

/**
 * Detects the actual MIME type of a file from its buffer content
 * @param file - The uploaded file object
 * @returns The detected MIME type
 */
export function detectMimeType(file: Express.Multer.File): string {
  let actualMimeType = file.mimetype;

  // If MIME type is generic octet-stream, try to detect from file signature
  if (
    file.mimetype === 'application/octet-stream' ||
    !file.mimetype.startsWith('image/')
  ) {
    const buffer = file.buffer;

    // Check file signatures (magic numbers) to determine actual file type
    if (buffer.length >= 4) {
      // JPEG signatures
      if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
        actualMimeType = 'image/jpeg';
      }
      // PNG signature
      else if (
        buffer[0] === 0x89 &&
        buffer[1] === 0x50 &&
        buffer[2] === 0x4e &&
        buffer[3] === 0x47
      ) {
        actualMimeType = 'image/png';
      }
      // WebP signature
      else if (buffer.subarray(8, 12).toString() === 'WEBP') {
        actualMimeType = 'image/webp';
      }
      // GIF signatures
      else if (buffer.subarray(0, 3).toString() === 'GIF') {
        actualMimeType = 'image/gif';
      }
      // Default to JPEG if we can't detect but it looks like an image upload
      else if (
        file.originalname &&
        /\.(jpe?g|png|gif|webp)$/i.test(file.originalname)
      ) {
        actualMimeType = 'image/jpeg'; // Default fallback
      }
    }
  }

  return actualMimeType;
}
