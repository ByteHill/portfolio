// two-part section: ASCII ripple art intro up top, then a masonry art wall + project list below
import AsciiRipple from "../components/AsciiRipple";
import ProjectList from "../components/ProjectList.jsx";

const Art = () => {
    return (
        <>
            <figure
                id="art"
                className="w-full min-h-[80vh] flex items-center px-6 md:px-16 pt-8 pb-4"
            >
                <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">

                    {/* LEFT RIPPLE ART */}
                    <div className="w-full md:w-[420px] flex justify-center">
                        <AsciiRipple imageSrc="/images/art-profile.png" />
                    </div>

                    {/* RIGHT INTRO TEXT */}
                    <div className="w-full md:w-[560px]">
                        <p className="w-full text-left text-[15px] sm:text-[15px] md:text-[17px] leading-relaxed md:leading-loose italic text-black/50">
                            I realised when building this <span className="not-italic">arts</span> section that I've done a really bad
                            job in keeping up with my doodling hobby...and a really good job in
                            rewatching my third run of Modern Family. So, for the lack of my
                            projects, here's some old artwork and a few CS projects...I consider
                            a peculiar form of "art."
                        </p>
                        <span className="block text-[13px] sm:text-[15px] md:text-[12px] text-gray-700/35 mt-3">
                            can you find Cheshire cat smiling in this image, hehe?
                            <br />
                            ps: this "ripple" work has been inspired by @gazijarin on GitHub. she has some really cool work!
                        </span>
                    </div>
                </div>
            </figure>

            <section className="w-full px-6 md:px-16 pt-4 pb-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* LEFT: scrollable art wall */}
                    <div className="h-[720px] overflow-y-auto p-8 md:p-10 scrollbar-thin scrollbar-thumb-[#999] scrollbar-track-transparent">
                        <div className="columns-2 md:columns-2 gap-4 space-y-4">

                            {[
                                "flower.jpg",
                                "cat.jpg",
                                "city.png",
                                "face.png",
                                "eye.jpg",
                                "coconuts.png",
                                "fish.jpeg",
                                "fruits.jpg",
                                "blob.png",
                                "umbrella.jpeg",
                                "bust.jpg",
                            ].map((img, i) => (
                                <img
                                    key={i}
                                    src={`/images/art/${img}`}
                                    alt="Artwork"
                                    className="
                w-full
                mb-4
                break-inside-avoid
                object-cover
                rounded-sm
                hover:scale-[1.01]
                transition-transform duration-300
            "
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: project list */}
                    <div className="h-[720px] bg-[#806184] px-8 md:px-10 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <ProjectList />
                    </div>

                </div>
            </section>
        </>
    );
};

export default Art;