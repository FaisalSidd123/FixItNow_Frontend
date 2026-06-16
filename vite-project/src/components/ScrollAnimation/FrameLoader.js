// Total number of frames extracted from your video
export const TOTAL_FRAMES = 240;

// Chunk size — load this many frames at a time to avoid browser memory spike
const CHUNK_SIZE = 40;

/**
 * Generates all frame paths as a flat array.
 * Uses Vite's import.meta.glob for reliable static asset resolution
 * instead of dynamic new URL() which silently fails on many frames.
 *
 * HOW TO USE:
 * In your Vite project, add this one-liner at the top of FrameLoader.js:
 *   const frameModules = import.meta.glob('../../assets/frames/*.jpg', { eager: true, as: 'url' });
 * Then replace getFramePaths() with:
 *   export const getFramePaths = () => Object.values(frameModules).sort();
 *
 * For now this version uses the padded URL approach as fallback.
 */
export const getFramePaths = () => {
  const paths = [];
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const frameNum = String(i).padStart(4, '0');
    paths.push(`/frames/frame${frameNum}.jpg`);
    // ^ Put your frames in /public/frames/ folder instead of /src/assets/frames/
    // This makes Vite serve them as static files — 100% reliable, no build-time resolution issues
  }
  return paths;
};

/**
 * Loads frames in chunks to avoid memory spike and browser throttling.
 * Uses ImageBitmap where available — it's decoded off the main thread
 * which means zero jank during preload.
 *
 * @param {string[]} paths - Array of image paths
 * @param {function} onProgress - Called with 0-100 percentage
 * @returns {Promise<(HTMLImageElement | ImageBitmap)[]>}
 */
export const preloadFrames = async (paths, onProgress) => {
  const total = paths.length;
  if (total === 0) {
    onProgress?.(100);
    return [];
  }

  const results = new Array(total);
  let loadedCount = 0;

  // Split paths into chunks
  const chunks = [];
  for (let i = 0; i < total; i += CHUNK_SIZE) {
    chunks.push(paths.slice(i, i + CHUNK_SIZE));
  }

  // Load each chunk sequentially — prevents browser from opening 240 connections at once
  for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
    const chunk = chunks[chunkIndex];
    const startIndex = chunkIndex * CHUNK_SIZE;

    const chunkPromises = chunk.map((path, localIndex) => {
      const globalIndex = startIndex + localIndex;

      return new Promise((resolve) => {
        // Use fetch + createImageBitmap if supported (off-main-thread decode = no jank)
        if (typeof createImageBitmap !== 'undefined') {
          fetch(path)
            .then((res) => res.blob())
            .then((blob) => createImageBitmap(blob))
            .then((bitmap) => {
              results[globalIndex] = bitmap;
              loadedCount++;
              onProgress?.(Math.round((loadedCount / total) * 100));
              resolve();
            })
            .catch(() => {
              // Fallback to HTMLImageElement if fetch/createImageBitmap fails
              loadViaImage(path, globalIndex, results, () => {
                loadedCount++;
                onProgress?.(Math.round((loadedCount / total) * 100));
                resolve();
              });
            });
        } else {
          // Fallback for browsers without createImageBitmap
          loadViaImage(path, globalIndex, results, () => {
            loadedCount++;
            onProgress?.(Math.round((loadedCount / total) * 100));
            resolve();
          });
        }
      });
    });

    await Promise.all(chunkPromises);
  }

  return results;
};

// Helper: classic HTMLImageElement fallback
const loadViaImage = (path, index, results, onDone) => {
  const img = new Image();
  img.src = path;
  img.onload = () => {
    results[index] = img;
    onDone();
  };
  img.onerror = () => {
    console.warn(`Frame failed to load: ${path}`);
    results[index] = null;
    onDone();
  };
};