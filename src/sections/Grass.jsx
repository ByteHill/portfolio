// photo gallery of life outside work — two horizontally scrollable rows with ‹/› arrow buttons
import React, { useRef, useState, useEffect } from "react";
import { photos } from "../constants/grassPhotos.js";

const PhotoRow = ({ items }) => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateArrows = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    useEffect(() => {
        updateArrows();
    }, []);

    const scroll = (dir) => {
        scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
    };

    return (
        <div className="relative">
            {canScrollLeft && (
                <button
                    onClick={() => scroll(-1)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-10 w-8 h-8 rounded-full bg-[#f8f4f0]/90 border border-[#191A1C]/10 flex items-center justify-center text-[#191A1C]/50 hover:text-[#191A1C]/80 hover:bg-white transition-all shadow-sm"
                >
                    ‹
                </button>
            )}

            <div
                ref={scrollRef}
                onScroll={updateArrows}
                className="flex gap-4 overflow-x-auto pb-4"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#d0ccc8 transparent" }}
            >
                {items.map((photo, i) => (
                    <div key={i} className="flex-shrink-0 flex flex-col items-center">
                        <div className="w-52 h-40 rounded-2xl overflow-hidden bg-[#e8e4e0]">
                            <img
                                src={photo.src}
                                alt={photo.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="mt-2 text-xs text-[#191A1C]/45 font-mono">
                            {photo.title}
                        </p>
                    </div>
                ))}
            </div>

            {canScrollRight && (
                <button
                    onClick={() => scroll(1)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-10 w-8 h-8 rounded-full bg-[#f8f4f0]/90 border border-[#191A1C]/10 flex items-center justify-center text-[#191A1C]/50 hover:text-[#191A1C]/80 hover:bg-white transition-all shadow-sm"
                >
                    ›
                </button>
            )}
        </div>
    );
};

const TouchingGrass = () => {
    const midpoint = Math.ceil(photos.length / 2);
    const topRow = photos.slice(0, midpoint);
    const bottomRow = photos.slice(midpoint);

    return (
        <section
            id="grass"
            className="relative z-20 min-h-screen px-6 pt-24 pb-4 bg-[#f8f4f0]"
        >
            <div className="mx-auto max-w-7xl">
                <p className="text-sm text-[#191A1C]/40 mb-10 font-mono">
                    // life outside the terminal
                </p>

                <div className="flex flex-col gap-6">
                    <PhotoRow items={topRow} />
                    <PhotoRow items={bottomRow} />
                </div>
            </div>
        </section>
    );
};

export default TouchingGrass;
