// work experience timeline — glowcards on the left, role + responsibilities on the right, GSAP scroll animations
import TitleHeader from "../components/TitleHeader.jsx";
import { expCards } from "../constants/index.js";
import GlowCard from "../components/GlowCard.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    useGSAP(() => {
        const mm = gsap.matchMedia();

        // DESKTOP ANIMATION
        mm.add("(min-width: 1280px)", () => {
            gsap.utils.toArray(".timeline-card").forEach((card) => {
                gsap.from(card, {
                    xPercent: -100,
                    opacity: 0,
                    transformOrigin: "left center",
                    duration: 1,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                });
            });
        });

        // MOBILE + TABLET ANIMATION
        mm.add("(max-width: 1279px)", () => {
            gsap.utils.toArray(".timeline-card").forEach((card) => {
                gsap.from(card, {
                    xPercent: -10,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                });
            });
        });

        // TIMELINE ANIMATION
        gsap.to(".timeline", {
            transformOrigin: "bottom bottom",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".timeline",
                start: "top center",
                end: "70% center",
                onUpdate: (self) => {
                    gsap.to(".timeline", {
                        scaleY: 1 - self.progress,
                    });
                },
            },
        });

        return () => mm.revert();
    }, []);

    return (
        <section
            id="experience"
            className="w-full md:mt-16 mt-10 section-padding xl:px-0 scroll-mt-24"
        >
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader
                    title="Professional Work Experience"
                    sub="📌 My Career Overview"
                />
            </div>

            <div className="mt-20 w-full max-w-7xl mx-auto space-y-16 xl:space-y-20 relative overflow-visible translate-x-[5x]">
                {/* TIMELINE */}
                <div className="absolute top-0 left-5 md:left-10 xl:left-[calc(40%+80px)] h-full flex justify-center pointer-events-none">
                    <div className="gradient-line" />
                    <div className="timeline" />
                </div>

                {expCards.map((card, index) => (
                    <div
                        key={card.title}
                        className="xl:grid xl:grid-cols-[2fr_3fr] xl:gap-16 xl:items-start"
                    >
                        {/* DESKTOP GLOWCARD */}
                        <div className="hidden xl:block">
                            <GlowCard card={card} index={index}>
                                <img
                                    src={card.imgPath}
                                    alt={card.title}
                                    className="h-8 max-w-[140px] object-contain mt-3"
                                />
                            </GlowCard>
                        </div>

                        {/* RIGHT SIDE */}
                        <div>
                            {/* MOBILE/TABLET GLOWCARD */}
                            <div className="xl:hidden mb-8 w-full max-w-full overflow-hidden">
                                <GlowCard card={card} index={index}>
                                    <img
                                        src={card.imgPath}
                                        alt={card.title}
                                        className="h-8 max-w-[140px] object-contain mt-3"
                                    />
                                </GlowCard>
                            </div>

                            <div className="flex items-start gap-6 relative">
                                <div className="timeline-logo flex-shrink-0 relative z-20">
                                    <img
                                        src={card.logoPath}
                                        alt={`${card.title} logo`}
                                    />
                                </div>

                                <div className="font-semibold text-2xl">
                                    <h1>{card.title}</h1>

                                    <p className="my-3 text-white-50 text-xl">
                                        {card.date}
                                    </p>

                                    <p className="text-[#839cb5] italic text-lg">
                                        Highlights
                                    </p>

                                    <ul className="list-disc ml-6 md:ml-8 mt-4 space-y-3 font-normal">
                                        {card.responsibilities.map(
                                            (responsibility) => (
                                                <li
                                                    key={responsibility}
                                                    style={{ color: "#374151" }}
                                                    className="text-[16px] md:text-[17.8px] leading-7 md:leading-9"
                                                >
                                                    {responsibility}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;