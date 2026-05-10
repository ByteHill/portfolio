// graph data for the Research section — nodes are papers, links are thematic connections between them
// each node: top-level fields (id, label, group, status, vibe) + details object for the side panel
export const graphData = {
    nodes: [
        {
            id: "paper-1",
            label: "Emotion Concepts in LLMs",
            group: "interpretability",
            status: "read",
            vibe: "mind-bending",
            details: {
                why_i_read_it:
                    "Wanted to know if Claude's apparent 'moods' are real or just surface-level mimicry. Turns out they really do steer behaviour.",
                thoughts:
                    "The paper is careful not to claim sentience — just that models can develop internal emotion-like states that actually affect outputs (reward hacking, sycophancy, blackmail rates all shift). I thought the alignment implications were really interesting: if these states can be steered, does that become a form of manipulation or just another control mechanism?",
                questions: [
                    "Could emotion steering become a deliberate alignment technique — e.g. dialling down the 'frustrated' state to reduce reward hacking?",
                    "Do these representations persist across context resets, or are they fully context-dependent?",
                    "What's the relationship between these emotion concepts and the features SAEs find?",
                ],
                connections: ["paper-2", "paper-6"],
                themes: ["alignment", "interpretability", "LLM internals"],
                year: 2026,
                arxiv: "2604.07729 || https://arxiv.org/abs/2604.07729",
            },
        },

        {
            id: "paper-2",
            label: "Priors in Time",
            group: "interpretability",
            status: "read",
            vibe: "rabbit-hole",
            details: {
                why_i_read_it:
                    "SAEs are everywhere in interpretability right now. I wanted to understand the critiques of this kind of personalisation through persistent memory.",
                thoughts:
                    "The paper’s main point is that SAEs assume concepts stay consistent across a sequence, but language doesn’t really work that way — earlier context changes the meaning of later tokens. I thought the Temporal Feature Analysis idea was really neat because it separates what’s predictable from context from what’s actually new, which makes normal SAE feature dictionaries feel kind of incomplete.",
                questions: [
                    "How does TFA interact with long-context models where context can be thousands of tokens?",
                    "Are there analogies of this critique for vision transformers, where spatial position plays the role of time?",
                    "Could TFA be combined with SAEs rather than replacing them?",
                ],
                connections: ["paper-1", "paper-5"],
                themes: ["interpretability", "SAE", "inductive bias"],
                year: 2025,
                arxiv: "2511.01836 || https://arxiv.org/abs/2511.01836",
            },
        },

        {
            id: "paper-3",
            label: "AI Agent Reliability",
            group: "reliability-and-safety",
            status: "read",
            vibe: "growth!",
            details: {
                why_i_read_it:
                    "My friends and I joke about how we sometimes end up getting responses from our chat in a completely different language. Has it happened with you, reader? ...Benchmark accuracy keeps going up but agents keep failing in the wild. This paper tries to formalise why.",
                thoughts:
                    "I liked the four-part breakdown of reliability (consistency, robustness, predictability, and safety) — it feels much more useful than relying on a single accuracy metric. The fact that newer models improved capabilities much more than reliability was honestly pretty sobering. It also made me think about how these 12 metrics could be turned into evaluation harnesses for real systems.",
                questions: [
                    "How do you measure 'predictability' at inference time, before you know the ground truth?",
                    "Is there a reliability/capability tradeoff, or do they come apart at scale?",
                    "Which of the 12 metrics matter most for agentic coding specifically?",
                ],
                connections: ["paper-4", "paper-9"],
                themes: ["agents", "reliability", "evaluation", "deployment", "safety"],
                year: 2026,
                arxiv: "2602.16666 || https://arxiv.org/abs/2602.16666",
            },
        },

        {
            id: "paper-4",
            label: "CIMemories",
            group: "reliability-and-safety",
            status: "read",
            vibe: "timely, lol",
            details: {
                why_i_read_it:
                    "Persistent memory in LLMs is becoming a real product feature. I wanted to understand the critiques of this kind of personalisation.",
                thoughts:
                    "Contextual Integrity as a framework for ‘appropriate information flow’ feels pretty underused in ML. I liked that the paper trained the model to reason about context directly instead of just filtering keywords — it seems much more robust. That said, social norms are really culturally dependent, so it’s hard for fully synthetic datasets to capture them completely.",
                questions: [
                    "How does the model handle norm conflicts — what if two parties in a conversation have different expectations?",
                    "How does this interact with tool-use and memory retrieval in a full agent loop?",
                ],
                connections: ["paper-3"],
                themes: ["privacy", "agents", "memory", "safety", "RL"],
                year: 2025,
                arxiv: "2511.14937 || https://arxiv.org/abs/2511.14937",
            },
        },

        {
            id: "paper-5",
            label: "LLMs are Bayesian (In Expectation)",
            group: "reasoning-and-learning",
            status: "read",
            vibe: "technically dense",
            details: {
                why_i_read_it:
                    "I'd seen the 'LLMs aren't really Bayesian' claim thrown around and wanted to understand the argument and whether the rebuttal holds. It was also cool to finally understand my stats class outside school.",
                thoughts:
                    "The paper’s main point is that positional encodings make token order matter, so testing Bayesian behaviour on just one ordering is probably the wrong baseline — you really want to average across many orderings instead. I also thought it made sense that the gap gets smaller with longer context lengths. It definitely changed how I think about in-context learning as a kind of approximate Bayesian inference.",
                questions: [
                    "Does this extend to chain-of-thought prompting, where order of reasoning steps matters differently?",
                    "What does 'Bayesian in expectation' imply for few-shot example ordering in practice — should we always permute?",
                    "How does RoPE vs learned positional encodings affect the expectation-realization gap?",
                ],
                connections: ["paper-6", "paper-2"],
                themes: ["in-context learning", "Bayesian", "theory", "transformers"],
                year: 2026,
                arxiv: "2507.11768 || https://arxiv.org/abs/2507.11768",
            },
        },

        {
            id: "paper-6",
            label: "Bayes in the Age of Intelligent Machines",
            group: "reasoning-and-learning",
            status: "reading",
            vibe: "big picture",
            details: {
                why_i_read_it:
                    "Trying to build a framework for how cognitive science and ML relate. A team member from the SEMI lab I worked in shared this, and it felt like the right starting point :)",
                thoughts:
                    "The levels-of-analysis framing (computational vs algorithmic vs implementational) is really useful for keeping understanding what Bayesian models claim.",
                questions: [
                    "Does the levels-of-analysis framework break down for emergent behaviours that weren't designed at any level?",
                ],
                connections: ["paper-5", "paper-10"],
                themes: ["Bayesian", "cognition", "theory", "philosophy of ML"],
                year: 2023,
                arxiv: "2311.10206 || https://arxiv.org/abs/2311.10206",
            },
        },

        {
            id: "paper-7",
            label: "Prismatic Synthesis",
            group: "reasoning-and-learning",
            status: "reading",
            vibe: "exciting",
            details: {
                why_i_read_it:
                    "I’m interested in how synthetic data actually helps reasoning models generalize, especially beyond benchmark memorization. This paper feels relevant to questions around representation diversity, and whether we can intelligently generate training data instead of just scaling it endlessly.",
                thoughts:
                    "G-Vendi using gradient entropy as a diversity signal is super cool to read about — it's model-aware rather than surface-level. PrismMath-7B outperforming R1-Distill on 6/7 benchmarks using 20x less data, makes you rethink where training compute should go. It makes a strong case for focusing on data diversity, not just dataset size, when building fine-tuning pipelines.",
                questions: [
                    "How sensitive is G-Vendi to the choice of proxy model? Does it generalise across model families?",
                    "Is there a version of this that works for instruction fine-tuning, not just reasoning tasks?",
                    "What's the compute cost of running G-Vendi at scale — is it a bottleneck?",
                ],
                connections: ["paper-5"],
                themes: ["training data", "diversity", "generalisation", "fine-tuning", "synthetic data"],
                year: 2025,
                arxiv: "2505.20161 || https://arxiv.org/abs/2505.20161",
            },
        },

        {
            id: "paper-8",
            label: "Self-RAG",
            group: "retrieval-and-rag",
            status: "read",
            vibe: "foundational",
            details: {
                why_i_read_it:
                    "When working as an ML engineer at a research lab at UWaterloo, we were looking for ways to optimize our RAG model!",
                thoughts:
                    "I really liked the reflection token idea (ISREL, ISSUP, ISUSE) — having the model evaluate its own retrieval and generation quality during inference without needing an external judge feels really elegant. It actually reminded me of some of the retrieval controllability work I explored during my co-op at the SEMI/U&AI labs at UW. The ability to tune retrieval behaviour at inference time for different tasks without retraining seems super underrated.",
                questions: [
                    "What happens to the reflection tokens under RLHF fine-tuning — do they survive or get optimised away?",
                    "Could reflection tokens be used to build training signal for better retrieval models?",
                ],
                connections: ["paper-9"],
                themes: ["RAG", "retrieval", "self-reflection", "factuality", "inference-time control"],
                year: 2023,
                arxiv: "2310.11511 || https://arxiv.org/abs/2310.11511",
            },
        },

        {
            id: "paper-9",
            label: "Architecture Matters (RAG Poisoning)",
            group: "retrieval-and-rag",
            status: "read",
            vibe: "eye-opening",
            details: {
                why_i_read_it:
                    "If I'm building RAG systems, I need to know which architectures fail catastrophically under adversarial inputs.",
                thoughts:
                    "The drop from 81.9% attack success on vanilla RAG to 24.4% on RLM is honestly pretty massive, especially since normal accuracy stays about the same. It really shows that architecture choices are security decisions too, not just performance decisions. I also thought it was interesting that most of CorruptRAG-AK’s effectiveness comes from adversarial framing rather than retrieval optimisation — that makes the vulnerability feel more tied to the reasoning layer, which suggests retrieval-side defences alone probably aren’t enough.",
                questions: [
                    "Would Self-RAG's reflection tokens catch the adversarial framing that fools MADAM-RAG?",
                    "What's the cost in clean accuracy of hardening against poisoning — is there a tradeoff curve?",
                    "How do these results translate to private/closed knowledge bases vs open web retrieval?",
                ],
                connections: ["paper-8", "paper-3"],
                themes: ["RAG", "security", "adversarial", "knowledge base", "robustness"],
                year: 2026,
                arxiv: "2605.05632 || https://arxiv.org/abs/2310.11511",
            },
        },

        {
            id: "paper-10",
            label: "Brain-DNN Alignment (Transformations)",
            group: "interpretability",
            status: "read",
            vibe: "slaying",
            details: {
                why_i_read_it:
                    "I think brain–DNN alignment is a useful sanity check — it’s interesting when neural networks end up processing visual information in ways that resemble the human brain. It feels a bit like coming full circle lol.",
                thoughts:
                    "I really liked the paper’s idea of comparing how brains and models preserve transformations, instead of just comparing activations directly. The hierarchy result also felt intuitive — deeper model layers aligned more with higher-level visual cortex regions, while shallow layers aligned more with early visual processing. Overall, NVS felt like a more principled way to study brain–model alignment than methods like RSA or CKA.",
                questions: [
                    "Could NVS be applied to compare representations between different LLMs rather than brain vs DNN?",
                    "Does this extend to language representations, or is it inherently a vision framework?",
                ],
                connections: ["paper-2", "paper-6"],
                themes: ["interpretability", "neuroscience", "vision", "representation learning"],
                year: 2026,
                arxiv: "2605.06420 || https://arxiv.org/abs/2605.06420",
            },
        },

        {
            id: "paper-11",
            label: "Gender & Skin-Type Bias in AI",
            group: "bias-and-fairness",
            status: "read",
            vibe: "must read",
            details: {
                why_i_read_it:
                    "The Gender Shades study is one of those papers you have to read — it's where bias in commercial CV systems became impossible to dismiss.",
                thoughts:
                    "The gap between 0.8% error for light-skinned men and 34.7% for dark-skinned women is honestly hard to ignore. What stood out to me is that the bias wasn’t hidden — it came out from a pretty direct audit, yet these systems were still deployed. That makes it feel like a process and accountability failure as much as a technical one. I also don’t think the field has fully figured out what meaningful accountability at deployment time should actually look like yet.",
                questions: [
                    "What would a meaningful 'bias audit' look like as a standard deployment gate, not just a research paper?",
                    "How much has improved since 2018? Are the same disparities still present in current foundation vision models?",
                    "Does intersectionality (gender × skin type × age × etc.) get harder to audit as dimensions multiply?",
                ],
                connections: ["paper-12"],
                themes: ["fairness", "bias", "auditing", "computer vision", "ethics"],
                year: 2018,
                arxiv: null,
                url: "https://news.mit.edu/2018/study-finds-gender-skin-type-bias-artificial-intelligence-systems-0212",
            },
        },

        {
            id: "paper-12",
            label: "Writing Style & Bias in IR",
            group: "bias-and-fairness",
            status: "read",
            vibe: "connects dots",
            details: {
                why_i_read_it:
                    "I wanted to understand how bias propagates into retrieval systems — not just generative models — and whether it looks different.",
                thoughts:
                    "I thought the writing-style angle was really interesting because it points to a different kind of bias. Retrieval systems that favour standard English can end up disadvantaging non-native speakers or certain dialect communities, even when the actual content is just as relevant. That feels different from bias in training labels — it’s more structural, built into how the system defines ‘relevance’ in the first place.",
                questions: [
                    "How does this interact with embedding-based retrieval vs keyword-based — do the biases compound or differ?",
                    "Is there a way to build retrieval systems that are style-agnostic without losing precision?",
                    "What would a fairness-aware ranking objective even optimise for here?",
                ],
                connections: ["paper-11"],
                themes: ["fairness", "bias", "information retrieval", "NLP", "writing style"],
                year: 2024,
                arxiv: "2411.13173 || https://arxiv.org/abs/2411.13173",
            },
        },
    ],

    links: [
        // interpretability cluster
        { source: "paper-1", target: "paper-2" },
        { source: "paper-1", target: "paper-6" },
        { source: "paper-2", target: "paper-5" },
        { source: "paper-2", target: "paper-10" },
        { source: "paper-6", target: "paper-10" },

        // reasoning / bayesian cluster
        { source: "paper-5", target: "paper-6" },
        { source: "paper-5", target: "paper-7" },

        // reliability / agents cluster
        { source: "paper-3", target: "paper-4" },
        { source: "paper-3", target: "paper-9" },

        // RAG cluster
        { source: "paper-8", target: "paper-9" },

        // fairness cluster
        { source: "paper-11", target: "paper-12" },

        // cross-cluster bridges
        { source: "paper-4", target: "paper-8" }, // memory/privacy ↔ retrieval
        { source: "paper-7", target: "paper-8" }, // data diversity ↔ retrieval quality
        { source: "paper-7", target: "paper-3" }, // generalization ↔ reliability
        { source: "paper-10", target: "paper-5" }, // representations ↔ Bayesian cognition
    ],
};
