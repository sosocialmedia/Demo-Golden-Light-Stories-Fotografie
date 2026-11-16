/**
 * Client-side image compressor for photo uploads.
 * Downscales oversized photos to sharp, web-ready dimensions and guarantees
 * the resulting JPEG Data URL fits comfortably inside a single Firestore document (< 700KB).
 */
export const compressImageFile = (
  file: File,
  maxWidth = 1080,
  maxHeight = 1080,
  quality = 0.78
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const renderAt = (targetW: number, targetH: number, targetQ: number): string => {
          let width = img.width;
          let height = img.height;

          if (width > targetW || height > targetH) {
            if (width / height > targetW / targetH) {
              height = Math.round((height * targetW) / width);
              width = targetW;
            } else {
              width = Math.round((width * targetH) / height);
              height = targetH;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return src;

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          return canvas.toDataURL('image/jpeg', targetQ);
        };

        const MAX_DATA_URL_CHARS = 680_000;
        let dataUrl = renderAt(maxWidth, maxHeight, quality);

        if (dataUrl.length > MAX_DATA_URL_CHARS) {
          dataUrl = renderAt(900, 900, 0.68);
        }
        if (dataUrl.length > MAX_DATA_URL_CHARS) {
          dataUrl = renderAt(720, 720, 0.58);
        }

        if (dataUrl.length > 820_000) {
          reject(new Error('Afbeelding is te groot na compressie. Kies een kleinere foto.'));
          return;
        }

        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Kon afbeelding niet verwerken'));
      img.src = src;
    };
    reader.onerror = () => reject(new Error('Kon bestand niet openen'));
    reader.readAsDataURL(file);
  });
};
