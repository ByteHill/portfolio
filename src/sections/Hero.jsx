// landing section — animated word carousel, intro text, CTA button, 3D game scene, personality cards
import { words } from '../constants/index.js'
import Button from '../components/Button.jsx'
import HeroExperience3 from '../components/HeroModels/HeroExperience3.jsx'
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import Counter from "../components/Counter.jsx";

export const Hero = () => {
    useGSAP(() => {
        gsap.fromTo(
            ['.hero-text h1', '.hero-slider', '.hero-introduction'],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 1.5, ease: 'power2.inOut' }
        )

        gsap.fromTo(
            '.hero-bubble',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: 'power2.inOut', delay: 1.7 }
        )
    })
    return (
        <section id="hero" className="relative overflow-hidden">
            <div className="absolute top-0 left-0 z-10">
                <img src="/images/bg.png" alt="background" />
            </div>

            <div className="hero-layout">
                <header className="
                        flex flex-col
                        justify-center
                        md:w-full
                        w-screen
                        md:px-20
                        px-5
                        md:-mt-10
                    ">
                    <div className="flex flex-col md:gap-7 gap-6">
                        <div className="hero-text relative z-10">
                            <h1>Welcome to my</h1>

                            <div className="hero-slider mt-2 md:h-20 h-14 overflow-hidden">
                                <span className="slide block">
                                    <span className="wrapper block">
                                        {words.map((word) => (
                                            <span
                                                key={word.text}
                                                className="
                                                    flex
                                                    items-center
                                                    md:gap-3
                                                    gap-2
                                                    md:h-20
                                                    h-14
                                                    md:-ml-4
                                                    -ml-2
                                                  "
                                                                                            >
                                                <img
                                                    src={word.imgPath}
                                                    alt={word.text}
                                                    className="
                                                    xl:size-10
                                                    md:size-8
                                                    size-6
                                                    opacity-60
                                                    brightness-0
                                                    saturate-100
                                                    hue-rotate-[220deg]
                                                  "
                                                />
                                                <span className="text-[#4f8fbf]">{word.text}</span>
                                            </span>
                                        ))}
                                    </span>
                                </span>
                            </div>
                        </div>

                        <p className="hero-introduction text-white-50 md:text-xl relative z-10 pointer-events-none">
                            Hi, I'm <span className="text-gray-800 italic">Alisha</span>, a developer who loves a good problem to dig into.
                        </p>

                        <Button
                            className="md:w-80 md:h-16 w-60 h-12"
                            id="counter"
                            text="take a peek 👀"
                        />
                    </div>
                </header>

                {/* Speech-bubble tooltip — floats above the 3D model, top-right of the hero */}
                <div className="hero-bubble absolute top-[46.5%] md:top-[25%] right-[4%] md:right-[8%] z-20 pointer-events-none" style={{ opacity: 0 }}>
                    <div className="
                    relative
                    bg-[#dedad3]
                    text-[#1a1a1a]
                    text-[10px] md:text-xs
                    italic
                    font-normal
                    px-3 md:px-4
                    py-1.5 md:py-2
                    rounded-md
                    w-[160px] md:w-[260px]
                    leading-relaxed
                    shadow-sm
                    ">
                        ps: i kept spinning this thing while building it. the cube's texture looks too much like butter, and now i want toast.
                        {/* Downward tail */}
                        <span className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-[#dedad3]" />
                    </div>
                </div>

                <figure>
                    <div className="hero-3d-layout">
                        <HeroExperience3 />
                    </div>
                </figure>
            </div>


            <Counter />
        </section>
    )
}

export default Hero