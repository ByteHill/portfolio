//NOTE: This is an inspiration from https://github.com/gazijarin/Gazi-V2/blob/main/src/components/AsciiPortrait.jsx. I don't claim this work. Check her out - super cool work!

import React, { useEffect, useRef, useState } from "react";

const chars = " .,:;i1tfLCG08@*".split("");

const calculateSize = (width) => {
    if (width <= 480) return Math.min(240, width - 40);
    if (width <= 768) return Math.min(300, width - 60);
    return 360;
};

const AsciiRipple = ({ imageSrc = "/images/art-profile.png" }) => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: -1000, y: -1000, active: false });
    const mouseTargetRef = useRef({ x: -1000, y: -1000 });
    const startTimeRef = useRef(null);

    const [size, setSize] = useState(() => calculateSize(window.innerWidth));
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const updateSize = () => setSize(calculateSize(window.innerWidth));
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    useEffect(() => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageSrc;

        img.onload = () => {
            const offscreen = document.createElement("canvas");
            const ctx = offscreen.getContext("2d");

            offscreen.width = size;
            offscreen.height = size;

            const scale = 0.92;
            const imgAspect = img.width / img.height;

            let drawHeight = size * scale;
            let drawWidth = drawHeight * imgAspect;

            if (drawWidth > size * scale) {
                drawWidth = size * scale;
                drawHeight = drawWidth / imgAspect;
            }

            const offsetX = (size - drawWidth) / 2;
            const offsetY = (size - drawHeight) / 2;

            ctx.filter =  "contrast(1.25) brightness(1.05) saturate(0.7)";
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            ctx.filter = "none";

            const imageData = ctx.getImageData(0, 0, size, size);
            const pixels = imageData.data;

            const fontSize = size <= 300 ? 5 : 7;
            const colGap = fontSize * 0.58;
            const rowGap = fontSize * 0.9;

            const particles = [];

            for (let y = 0; y < size; y += rowGap) {
                for (let x = 0; x < size; x += colGap) {
                    const i = (Math.floor(y) * size + Math.floor(x)) * 4;
                    const alpha = pixels[i + 3];

                    if (alpha > 120) {
                        const r = pixels[i];
                        const g = pixels[i + 1];
                        const b = pixels[i + 2];

                        const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

                        let contrasted = brightness;

// selectively deepen shadows
                        if (brightness < 0.55) {
                            contrasted *= 0.72;
                        }

// gently brighten highlights
                        if (brightness > 0.75) {
                            contrasted = Math.min(1, contrasted * 1.08);
                        }

                        const boosted = Math.pow(brightness, 0.9);
                        const charIndex = Math.floor(boosted * (chars.length - 1));
                        particles.push({
                            x: x + (Math.random() - 0.5) * 500,
                            y: y + (Math.random() - 0.5) * 500,
                            targetX: x,
                            targetY: y,
                            vx: 0,
                            vy: 0,
                            char: chars[charIndex],
                            alpha: 0.42 + (1 - brightness) * 0.28,
                            delay: Math.random() * 0.5,
                            shimmer: Math.random() * Math.PI * 2,
                        });
                    }
                }
            }

            particlesRef.current = particles;
            startTimeRef.current = performance.now();
            setReady(true);
        };
    }, [imageSrc, size]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !ready) return;

        const ctx = canvas.getContext("2d");
        const dpr = window.devicePixelRatio || 1;

        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        let animationId;

        const draw = () => {
            animationId = requestAnimationFrame(draw);
            ctx.clearRect(0, 0, size, size);

            const elapsed = (performance.now() - startTimeRef.current) / 1000;
            const mouse = mouseRef.current;
            const mouseTarget = mouseTargetRef.current;

            mouse.x += (mouseTarget.x - mouse.x) * 0.18;
            mouse.y += (mouseTarget.y - mouse.y) * 0.18;

            const fontSize = size <= 300 ? 5 : 7;

            ctx.font = `${fontSize}px 'Courier New'`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            particlesRef.current.forEach((p) => {
                const particleTime = elapsed - p.delay;
                if (particleTime < 0) return;

                const fade = Math.min(particleTime / 1.3, 1);
                const easedFade = 1 - Math.pow(1 - fade, 2);

                if (mouse.active) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDist = size * 0.22;

                    if (dist < maxDist && dist > 0) {
                        const force = (1 - dist / maxDist) * 5.5;
                        p.vx += (dx / dist) * force;
                        p.vy += (dy / dist) * force;
                    }
                }

                const homeX = p.targetX - p.x;
                const homeY = p.targetY - p.y;

                p.vx += homeX * 0.065;
                p.vy += homeY * 0.065;

                const rippleX = Math.sin(elapsed * 1.2 + p.targetY * 0.06) * 0.08;
                const rippleY = Math.cos(elapsed * 1.2 + p.targetX * 0.06) * 0.08;

                p.vx += rippleX;
                p.vy += rippleY;

                p.vx *= 0.91;
                p.vy *= 0.91;

                p.x += p.vx;
                p.y += p.vy;

                const shimmer = Math.sin(elapsed * 2 + p.shimmer) * 0.08;
                const currentAlpha = Math.max(0, (p.alpha + shimmer) * easedFade);

                ctx.fillStyle = `rgba(95, 25, 168, ${currentAlpha})`;
                ctx.fillText(p.char, p.x, p.y);
            });
        };

        const moveMouse = (clientX, clientY) => {
            const rect = canvas.getBoundingClientRect();
            mouseTargetRef.current.x = clientX - rect.left;
            mouseTargetRef.current.y = clientY - rect.top;
            mouseRef.current.active = true;
        };

        const handleMouseMove = (e) => moveMouse(e.clientX, e.clientY);

        const handleTouchMove = (e) => {
            const touch = e.touches[0];
            moveMouse(touch.clientX, touch.clientY);
            if (e.cancelable) e.preventDefault();
        };

        const handleLeave = () => {
            mouseRef.current.active = false;
            mouseTargetRef.current.x = -1000;
            mouseTargetRef.current.y = -1000;
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleLeave);
        canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
        canvas.addEventListener("touchend", handleLeave);

        draw();

        return () => {
            cancelAnimationFrame(animationId);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleLeave);
            canvas.removeEventListener("touchmove", handleTouchMove);
            canvas.removeEventListener("touchend", handleLeave);
        };
    }, [ready, size]);

    return (
        <canvas
            ref={canvasRef}
            className="rounded-2xl"
            style={{
                cursor: "crosshair",
                touchAction: "none",
            }}
        />
    );
};

export default AsciiRipple;