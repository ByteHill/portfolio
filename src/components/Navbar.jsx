import React from 'react'
import {navLinks} from "../constants/index.js";

const Navbar = () => {
    return (
        <header className={"navbar"}>
            <div className={"inner"}>
                <a className="logo text-[#58465D]" href="#hero">
                    /Alisha
                </a>

                <nav className={"desktop text-lg font-semibold"}>
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link.name} className={"group"}>
                                <a href={link.link} className="text-[#715977]">
                                    <span>{link.name}</span>
                                    <span className={"underline"}/>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <a href="#say-hi" className={"contact-btn group "}>
                    <div className="inner">
                        <span className="text-[#715977]">say hi!</span>
                    </div>
                </a>
            </div>
        </header>
    )
}
export default Navbar
