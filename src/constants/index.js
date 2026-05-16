// central data file — nav links, hero word carousel, personality cards, and experience entries
const navLinks = [
    {
        name: "Work Quests",
        link: "#experience",
    },
    {
        name: "Research Sandbox",
        link: "#research",
    },
    {
        name: "Art",
        link: "#art",
    },
    {
        name: "Touching Grass",
        link: "#grass",
    },
];

const words = [
    { text: "corner of the internet", imgPath: "/images/ideas.svg" },
    { text: "world", imgPath: "/images/concepts.svg" },
    { text: "experiments", imgPath: "/images/designs.svg" },
    { text: "curiosity", imgPath: "/images/code.svg" },
    { text: "corner of the internet", imgPath: "/images/ideas.svg" },
    { text: "world", imgPath: "/images/concepts.svg" },
    { text: "experiments", imgPath: "/images/designs.svg" },
    { text: "curiosity", imgPath: "/images/code.svg" },
];

const counterItems = [
    { value: "AI Systems • Research • Design", label: "interests:" },
    { value: "Computer Engineering @ UWaterloo", label: "currently:" },
    { value: "Tea. Then some more.", label: "Fuel:" },
];

const expCards = [
    {
        boldOpening: "One unexpected thing",
        review:
            "One unexpected thing I learned was how collaborative AI research really is. We spent just as much time debating definitions, tradeoffs, and unintended consequences as we did building models. Some of the most interesting moments came from people challenging each other's assumptions — those remain my favourite conversations :) ",
        skills: ["PyTorch", "Hugging Face", "LangChain", "MCP"],
        imgPath: "/images/exp1.png",
        logoPath: "/images/logo1.png",
        title: "AI/ML Engineer",
        date: "January 2026 - April 2026",
        responsibilities: [
            "Engineered a RAG model with BGE embeddings, FAISS, and hybrid semantic retrieval for large-scale policy and research document analysis.",
            "Led hyperparameter sweeps over chunking, overlap, and similarity thresholds - boosting recall@k and throughput.",
        ],
    },
    {
        boldOpening: "Sometime during my co-op",
        review:
            "Sometime during my co-op, I realized I had gone from silently Googling every acronym in meetings to actively contributing to discussions about network topology and automation. That transition happened slowly, but looking back, it's probably the thing I'm most proud of.",
        skills: ["Python", "Docker", "REST APIs", "Linux"],
        imgPath: "/images/exp2.png",
        logoPath: "/images/logo2.png",
        title: "Software Developer (Network Management)",
        date: "September 2024 - December 2024",
        responsibilities: [
            "Built and optimized an internal dashboard to monitor OpenStack cloud, reducing a 45-minute provisioning process to under 2 minutes.",
            "Deployed live network testing environments with T-API and Swagger, reducing telecom VM provisioning and network configuration debugging time by 67%.",
        ],
    },
    {
        boldOpening: "Fun fact:",
        review:
            "Fun fact: parts of my work were under NDA - which made me feel equal parts mildly terrified and incredibly cool. More than anything, it taught me how much invisible effort goes into securing critical infrastructure, and how carefully even small edge cases are treated in production environments.",
        skills: ["Python/C/C++", "Entropy Analysis", "Post-Quantum Crypto", "GNNs"],
        imgPath: "/images/exp3.png",
        logoPath: "/images/logo2.png",
        title: "Cybersecurity Engineer (Quantum Computing)",
        date: "January 2024 - May 2024",
        responsibilities: [
            "Built an entropy-based threat detection pipeline to identify anomalous patterns in live optical network traffic.",
            "Benchmarked next-generation encryption algorithms (post-quantum cryptography) under telco data streams, cutting performance bottlenecks.",
        ],
    },
    {
        boldOpening: "Working around sensitive medical workflows",
        review:
            "Working around sensitive medical workflows taught me to slow down, verify details carefully, and treat even routine tasks with precision. It was the first time I understood how deeply technical decisions can affect real people - even if they sometimes seem invisible to others.",
        skills: ["R/MATLAB", "SQL", "Regression Modeling", "pandas"],
        imgPath: "/images/exp4.png",
        logoPath: "/images/logo3.png",
        title: "Data Scientist",
        date: "April 2023 - June 2023",
        responsibilities: [
            "Developed SQL validation pipelines and EDA workflows across point-of-sale datasets to improve data integrity and reporting accuracy.",
            "Designed regression models to analyze cost and operational trends, translating findings into actionable recommendations for design and business teams.",
        ],
    },
];

export {
    words,
    counterItems,
    expCards,
    navLinks,
};
