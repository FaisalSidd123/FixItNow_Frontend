import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getFramePaths, preloadFrames } from './FrameLoader';
import Overlay from './Overlay';
import './ScrollCanvas.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollCanvas = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const frameIndexRef = useRef(0);
  const animFrameIdRef = useRef(null);
  const imagesRef = useRef([]);
  // Track last drawn index to skip redundant draws
  const lastDrawnRef = useRef(-1);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // ─── Preload ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const paths = getFramePaths();

    preloadFrames(paths, (pct) => {
      setProgress(pct);
    })
      .then((loadedImages) => {
        imagesRef.current = loadedImages.filter(Boolean);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Preload error:', err);
        setLoading(false);
      });

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  // ─── GSAP ScrollTrigger + Canvas ────────────────────────────────────────────
  useEffect(() => {
    if (loading || imagesRef.current.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    fitCanvas();
    drawFrame(0);

    const totalFrames = imagesRef.current.length;
    const frameObj = { index: 0 };

    const animation = gsap.to(frameObj, {
      index: totalFrames - 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        /**
         * FIX 1: scrub: 0.3 instead of scrub: 1
         * scrub: 1 means GSAP waits 1 full second to catch up — feels laggy.
         * scrub: 0.3 = 300ms catch-up — snappy but still smooth.
         * scrub: true = instant/no lag (use this if 0.3 still feels slow)
         */
        scrub: 0.3,
      },
      onUpdate: () => {
        const idx = Math.round(frameObj.index);
        if (frameIndexRef.current !== idx) {
          frameIndexRef.current = idx;
          scheduleDrawFrame(idx);
        }
      },
    });

    // Fade heading on early scroll
    const headingTween = gsap.to('.hero-heading', {
      opacity: 0,
      y: -40,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'top -15%',
        scrub: true,
      },
    });

    // Fade scroll indicator
    const indicatorTween = gsap.to('.scroll-indicator', {
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'top -8%',
        scrub: true,
      },
    });

    window.addEventListener('resize', fitCanvas);

    return () => {
      window.removeEventListener('resize', fitCanvas);
      animation.scrollTrigger?.kill();
      headingTween.scrollTrigger?.kill();
      indicatorTween.scrollTrigger?.kill();
      animation.kill();
      headingTween.kill();
      indicatorTween.kill();
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [loading]);

  // ─── Canvas Helpers ──────────────────────────────────────────────────────────

  /**
   * FIX 2: scheduleDrawFrame
   * Only schedules a new rAF if one isn't already pending.
   * Previous code cancelled the pending rAF and rescheduled on every scroll tick —
   * causing frames to never actually paint during fast scrolling.
   */
  const scheduleDrawFrame = (index) => {
    if (animFrameIdRef.current !== null) return; // Already queued, let it paint
    animFrameIdRef.current = requestAnimationFrame(() => {
      animFrameIdRef.current = null;
      // Only draw if the frame actually changed since last paint
      if (lastDrawnRef.current !== frameIndexRef.current) {
        lastDrawnRef.current = frameIndexRef.current;
        drawFrame(frameIndexRef.current);
      }
    });
  };

  // Cover-fit draw — centers and crops image to fill canvas
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false }); // FIX 3: alpha:false skips alpha compositing = faster
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img) return;

    const iw = img.width;
    const ih = img.height;
    const cw = canvas.width;
    const ch = canvas.height;

    const imgRatio = iw / ih;
    const canvasRatio = cw / ch;

    let dw = cw, dh = ch, ox = 0, oy = 0;

    if (imgRatio > canvasRatio) {
      dw = ch * imgRatio;
      ox = (cw - dw) / 2;
    } else {
      dh = cw / imgRatio;
      oy = (ch - dh) / 2;
    }

    ctx.drawImage(img, ox, oy, dw, dh);
  };

  // Sets canvas pixel dimensions to match actual viewport
  const fitCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Redraw current frame after resize — use frameIndexRef not 0
    drawFrame(frameIndexRef.current);
  };

  const handleBookNow = () => {
    const el = document.getElementById('contact');
    el
      ? el.scrollIntoView({ behavior: 'smooth' })
      : window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <>
      {loading && (
        <div className="loader-screen">
          <div className="loader-content">
            <h2 className="loader-title">FixItNow</h2>
            <p className="loader-subtitle">Loading cinematic experience...</p>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="progress-text">{progress}%</span>
          </div>
        </div>
      )}

      <div className="scroll-animation-container" ref={containerRef}>
        <div className="canvas-sticky-wrapper">
          <canvas className="scroll-canvas" ref={canvasRef} />
          {!loading && <Overlay onBookNowClick={handleBookNow} />}
        </div>
      </div>
    </>
  );
};

export default ScrollCanvas;