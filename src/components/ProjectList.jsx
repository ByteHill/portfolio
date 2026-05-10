// list of personal/CS projects shown in the right panel of the Art section
import React from "react";
import { projects } from "../constants/personalProjects.js";

export default function ProjectList() {
    return (
        <div className="w-full h-full flex flex-col justify-start px-2 py-6">
            {/* Header */}
            <p className="text-[10px] tracking-[0.12em] uppercase text-white/20 mb-6">
                projects
            </p>

            {/* Rows */}
            <div className="flex flex-col text-[#F4EDE7]/75">
                {projects.map((project) => (
                    <div
                        key={project.title}
                        className="
              group
              grid
              grid-cols-1
              md:grid-cols-[1fr_220px]
              gap-4 md:gap-6
              items-start
              py-5
              border-t border-[#F4EDE7]/10
              last:border-b last:border-[#F4EDE7]/10
            "
                    >
                        {/* Left: title + description */}
                        <div>
                            <p
                                className="
                  text-[15px]
                  font-bold
                  text-white/80
                  md:text-[#E8D7E6]/45
                  md:group-hover:text-white/85
                  transition-colors
                  duration-150
                  mb-1
                "
                            >
                                {project.title}
                            </p>

                            <p
                                className="
                  text-[12px]
                  text-[#F4EDE7]/55
                  md:text-white/25
                  md:group-hover:text-[#F4EDE7]/55
                  transition-colors
                  duration-150
                  leading-relaxed
                "
                            >
                                {project.description}
                            </p>
                        </div>

                        {/* Right: category + tags */}
                        <div className="md:text-right shrink-0">
                            <p className="text-[10px] tracking-[0.06em] uppercase text-[#E5D19A]/75 mb-2">
                                {project.type}
                            </p>

                            <div className="flex flex-wrap gap-x-2 gap-y-1 md:justify-end w-full">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="
                      font-mono
                      text-[9.5px]
                      text-[#E5D19A]/75
                      md:text-[#B8D8D8]/70
                      md:group-hover:text-[#E5D19A]/80
                      transition-colors
                      duration-150
                      break-words
                    "
                                    >
                    {tag}
                  </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}