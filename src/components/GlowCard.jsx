import { useRef } from "react";

const GlowCard = ({ card, children, index }) => {
    const cardRef = useRef([]);

    const handleMouseMove = (index) => (e) => {
        const card = cardRef.current[index];
        if (!card) return;

        const rect = card.getBoundingClientRect();

        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
        angle = (angle + 360) % 360;
        card.style.setProperty("--start", angle + 60);

    };

    return (
        <div
            ref={(el) => (cardRef.current[index] = el)}
            onMouseMove={handleMouseMove(index)}
            className="card card-border timeline-card rounded-xl p-5 md:p-6 w-full max-w-90%"
        >
            <div className="glow" />

            <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: 3 }, (_, i) => (
                    <img src="/images/star.svg" key={i} alt="star" className="size-5 star-tint" />
                ))}
            </div>

            <div className="mb-5">
                <p className="text-[#7B879B]/70 leading-7.5">
                    {card.boldOpening ? (
                        <>
                            <strong className="font-semibold text-[#677282]/80">{card.boldOpening}</strong>
                            {card.review.slice(card.boldOpening.length)}
                        </>
                    ) : card.review}
                </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
                {card.skills?.map((skill) => (
                    <span
                        key={skill}
                        className="
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                        bg-[#5090BF]
                        text-[white]
                        border border-[#d7e1ec]
                    "
                    >
                        {skill}
                    </span>
                ))}
            </div>

            {children}
        </div>
    );
};

export default GlowCard;