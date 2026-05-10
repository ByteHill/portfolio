// three "personality cards" rendered below the hero — interests, current role, fuel
import React from "react";
import { counterItems } from "../constants/index.js";

const Counter = () => {
    return (
        <div id="counter" className="padding-x-lg xl:-mt-6 mt-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {counterItems.map((item) => (
                    <div
                        key={item.label}
                        className="counter-card
                        bg-[#1A1A2E]/95
                        border border-[#1A1A2E]
                        rounded-xl
                        px-8 py-8
                        flex flex-col justify-center items-center text-center
                        shadow-sm
                        transition-all duration-300
                        hover:scale-[1.03]
                        hover:-translate-y-1
                        hover:shadow-xl
                        active:scale-[1.03]
                        active:-translate-y-1
                        active:shadow-xl
                        "
                    >
                        <p className="font-sans text-[#E5D19A] font-bold text-[12px] uppercase tracking-widest mb-2 opacity-80">
                            {item.label}
                        </p>
                        <p className="font-sans text-[#936F93] text-base md:text-lg font-semibold leading-snug tracking-tight">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Counter;