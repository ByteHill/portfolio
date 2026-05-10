// interactive 3D force graph of research papers — click a node to fly the camera and open a side panel
// on mobile the graph hides entirely when a panel is open so there's room to read
import React, { useRef, useState } from "react";

// 3D force graph library
import ForceGraph3D from "react-force-graph-3d";

// Used to render text labels in 3D space
import SpriteText from "three-spritetext";

// Core Three.js library
import * as THREE from "three";

import { graphData } from '../constants/researchPapers.js'


// ========================================
// NODE COLOR HELPER
// ========================================

const getColor = (group) => {
    if (group === "interpretability") return "#c586c0";
    if (group === "reasoning-and-learning") return "#569cd6";
    if (group === "reliability-and-safety") return "#ce9178";
    if (group === "retrieval-and-rag") return "#4ec9b0";
    if (group === "bias-and-fairness") return "#dcdcaa";
    return "#93c5fd";
};
// Group label color (for the badge in the panel)
const getGroupBg = (group) => {
    if (group === "interpretability") return "bg-purple-900/60 text-purple-300";
    if (group === "reasoning-and-learning") return "bg-sky-900/60 text-sky-300";
    if (group === "reliability-and-safety") return "bg-red-900/60 text-red-300";
    if (group === "retrieval-and-rag") return "bg-green-900/60 text-green-300";
    if (group === "bias-and-fairness") return "bg-yellow-900/60 text-yellow-300";
    return "bg-blue-900/60 text-blue-300";
};

// ========================================
// SIDE PANEL COMPONENT
// ========================================

const NodePanel = ({ node, onClose }) => {
    const { label, group, details } = node;


    return (
        <div className="flex flex-col gap-5 h-full">

            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                    <h2 className="text-base font-semibold text-white leading-snug">
                        {label}
                    </h2>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full w-fit font-medium ${getGroupBg(group)}`}>
                        {group}
                    </span>
                </div>
                <button
                    onClick={onClose}
                    className="text-white/30 hover:text-white/80 transition-colors text-lg leading-none mt-0.5 flex-shrink-0"
                >
                    ✕
                </button>
            </div>

            {node.status && (
                <div className="flex flex-col gap-1.5">
                    <p className="text-[10px] text-white/35 uppercase tracking-widest font-medium">
                        status
                    </p>
                    <p className="text-sm text-white/60">{node.status}</p>
                </div>
            )}

            <hr className="border-white/10" />
            {/* Vibe */}
            {node.vibe && (
                <div className="flex flex-col gap-1.5">
                    <p className="text-[10px] text-white/35 uppercase tracking-widest font-medium">
                        Vibe
                    </p>
                    <p className="text-sm text-white/75 leading-relaxed">
                        {node.vibe}
                    </p>
                </div>
            )}

            {/* Why I Read It */}
            <div className="flex flex-col gap-1.5">
                <p className="text-[10px] text-white/35 uppercase tracking-widest font-medium">
                    Why I Read It
                </p>
                <p className="text-sm text-white/75 leading-relaxed">
                    {details.why_i_read_it}
                </p>
            </div>

            {/* Thoughts */}
            <div className="flex flex-col gap-1.5">
                <p className="text-[10px] text-white/35 uppercase tracking-widest font-medium">
                    Thoughts
                </p>
                <p className="text-sm text-white/75 leading-relaxed">
                    {details.thoughts}
                </p>
            </div>

            {/* Open Questions */}
            <div className="flex flex-col gap-2">
                <p className="text-[10px] text-white/35 uppercase tracking-widest font-medium">
                    Open Questions
                </p>
                <ul className="flex flex-col gap-2">
                    {details.questions.map((q, i) => (
                        <li
                            key={i}
                            className="text-sm text-white/65 flex gap-2 leading-relaxed"
                        >
                            <span className="text-white/25 mt-0.5 flex-shrink-0">→</span>
                            {q}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-2">
                <p className="text-[10px] text-white/35 uppercase tracking-widest font-medium">
                    Tags
                </p>
                <div className="flex flex-wrap gap-1.5">
                    {details.themes.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-full bg-white/8 border border-white/10 text-white/50"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Year */}
            {details.year && (
                <div className="flex flex-col gap-1.5">
                    <p className="text-[10px] text-white/35 uppercase tracking-widest font-medium">
                        Year
                    </p>
                    <p className="text-sm text-white/75">{details.year}</p>
                </div>
            )}

            {/* source */}
            {details.arxiv && (
                <div className="flex flex-col gap-1.5">
                    <p className="text-[10px] text-white/35 uppercase tracking-widest font-medium">
                        source
                    </p>
                    <p className="text-sm text-white/60">{details.arxiv}</p>
                </div>
            )}

        </div>
    );
};


// ========================================
// MAIN COMPONENT
// ========================================

const Research = () => {

    // Ref to control the graph camera
    const graphRef = useRef();

    // Tracks which node is selected (null = panel closed)
    const [selectedNode, setSelectedNode] = useState(null);

    const resetCamera = () => {
        if (!graphRef.current) return;

        graphRef.current.cameraPosition(
            { x: -10, y: 10, z: 350 }, // original/default-ish angle
            { x: 0, y: 0, z: 0 },   // look at graph center
            1200                    // animation duration
        );
    };

    const closePanel = () => {
        setSelectedNode(null);
        resetCamera();
    };

    return (
        <section
            id="research"
            className="relative z-20 min-h-screen px-6 pt-24 pb-8 bg-[#f8f4f0]"
        >
            <div className="mx-auto max-w-7xl">

                {/* Outer row — graph + panel sit side by side */}
                <div className="flex gap-4 h-[700px]">

                    {/* ======================================== */}
                    {/* GRAPH CARD                               */}
                    {/* shrinks from full width → 2/3 when panel opens */}
                    {/* ======================================== */}
                    <div
                        className={`
                            relative overflow-hidden rounded-3xl
                            border border-white/10 bg-[#191A1C]
                            transition-all duration-300
                            ${selectedNode ? "hidden md:block md:w-2/3" : "w-full"}
                        `}
                    >
                        {/* title bar */}
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-white/5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                            <span className="ml-3 text-[11px] text-white/30 font-mono">
                                researchPlayground — map.jsx
                            </span>
                        </div>

                        <div className="absolute top-14 left-5 z-10 flex flex-col gap-4">
                            <div className="flex items-center gap-3 text-white/40 text-sm">
                                <img
                                    src="/images/constellation.svg"
                                    className="w-6 h-6 object-contain opacity-70"
                                    style={{
                                        filter: "invert(83%) sepia(8%) saturate(373%) hue-rotate(179deg) brightness(93%)",
                                    }}
                                    alt=""
                                />
                                <span>//spin to explore relationships</span>
                            </div>

                            <div className="flex items-center gap-3 text-white/40 text-sm">
                                <img
                                    src="/images/constellation.svg"
                                    className="w-6 h-6 object-contain opacity-70"
                                    style={{
                                        filter: "invert(83%) sepia(8%) saturate(373%) hue-rotate(179deg) brightness(93%)",
                                    }}
                                    alt=""
                                />
                                <span> //drag nodes to reshape the map</span>
                            </div>

                            <div className="flex items-center gap-3 text-white/40 text-sm">
                                <img
                                    src="/images/constellation.svg"
                                    className="w-6 h-6 object-contain opacity-70"
                                    style={{
                                        filter: "invert(83%) sepia(8%) saturate(373%) hue-rotate(179deg) brightness(93%)",
                                    }}
                                    alt=""
                                />
                                <span>//click for insights</span>
                            </div>
                        </div>

                        <ForceGraph3D
                            ref={graphRef}
                            graphData={graphData}
                            backgroundColor="#0C1116"
                            nodeRelSize={10}
                            linkColor={() => "rgba(220,225,240,0.78)"}
                            linkWidth={1.2}
                            linkDirectionalParticles={2}
                            linkDirectionalParticleWidth={1.5}

                            // ----------------------------------------
                            // CUSTOM NODE: sphere + label
                            // ----------------------------------------
                            nodeThreeObject={(node) => {
                                const group = new THREE.Group();

                                // Sphere
                                const sphere = new THREE.Mesh(
                                    new THREE.SphereGeometry(6, 24, 24),
                                    new THREE.MeshBasicMaterial({
                                        color: getColor(node.group),
                                    })
                                );

                                // Label
                                const label = new SpriteText(node.label);
                                label.color = "#cbd5e1";
                                label.textHeight = 4;
                                label.position.y = 10;

                                group.add(sphere);
                                group.add(label);
                                return group;
                            }}

                            // ----------------------------------------
                            // CLICK: fly camera + open panel
                            // ----------------------------------------
                            onNodeClick={(node) => {
                                // Fly camera toward node
                                const distance = 80;
                                const distRatio =
                                    1 + distance / Math.hypot(node.x, node.y, node.z);

                                graphRef.current.cameraPosition(
                                    {
                                        x: node.x * distRatio,
                                        y: node.y * distRatio,
                                        z: node.z * distRatio,
                                    },
                                    node,
                                    1200
                                );

                                // Open the side panel with this node's data
                                setSelectedNode(node);
                            }}
                        />
                        {/* STATUS BAR */}
                        <div
                            className
                                ="
                                absolute bottom-0
                                left-0 w-full flex items-center
                                gap-4
                                px-4
                                py-1
                                bg-[#4ec9b0]
                                text-[#0a1a10]
                                text-[9px]
                                font-mono z-20">
                            <span>⎇ main</span>
                            <span>{graphData.nodes.length} nodes</span>
                            <span className="ml-auto">map.jsx</span>
                        </div>

                    </div>


                    {/* ======================================== */}
                    {/* SIDE PANEL                               */}
                    {/* slides in from the right when a node     */}
                    {/* is selected                              */}
                    {/* ======================================== */}
                    {selectedNode && (
                        <div
                            className="
                                w-full md:w-1/3 md:flex-shrink-0
                                bg-[#0C1116]
                                rounded-3xl
                                border border-white/10
                                p-6
                                overflow-y-auto
                                animate-slide-in
                            "
                        >
                            <NodePanel
                                node={selectedNode}
                                onClose={closePanel}
                            />
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};

export default Research;