// contact section — short intro blurb + list of ways to reach out (email, linkedin, github etc.)
import { contactLinks } from "../constants/ways.js";

const ContactLink = ({ link }) => {
    return (
        <a
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center gap-4 bg-[#dc6430] rounded-2xl px-5 py-4 group hover:bg-[#c86ca8] transition-colors no-underline"
        >
            <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-semibold"
                style={{ backgroundColor: link.iconBg, color: link.iconColor }}
            >
                {link.symbol}
            </div>

            <div className="flex flex-col gap-0.5">
                <span className="text-sm text-white/80 font-medium">{link.label}</span>
                <span className="text-xs text-white/30">{link.value}</span>
            </div>

            <span className="ml-auto text-white/20 group-hover:text-white/50 transition-colors">
        →
      </span>
        </a>
    );
};

export default function Contact() {
    return (
        <section id="say-hi" className="relative z-20 min-h-screen px-6 pt-4 pb-16 bg-[#f8f4f0] select-none">
            <div className="mx-auto max-w-7xl">
                <h2 className="text-5xl font-bold text-[#191A1C] mb-2 pt-20">
                    say hi<span className="text-[#4ec9b0]">.</span>
                </h2>

                <p className="text-sm text-[#191A1C]/40 mb-12">
                    // always down to chat, collab, or just vibes
                </p>

                <div className="flex flex-col gap-6 justify-between max-w-xl">
                    <p className=" text-[#191A1C]/60 leading-relaxed">
                        i'm Alisha — AI/ML researcher, enthusiast and dessert lover.
                        whether it's a collab, a question, or just to say hi, my inbox is open XD
                    </p>

                    <div className="flex flex-col gap-3">
                        {contactLinks.map((link) => (
                            <ContactLink key={link.label} link={link} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}