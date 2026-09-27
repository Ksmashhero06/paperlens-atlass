export interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  addedAt: string;
  pages: number;
  status: "ready" | "processing" | "failed";
  citations: number;
  tags: string[];
  abstract: string;
  keyContributions: string[];
  methodology: string[];
  results: string[];
}

export const mockPapers: Paper[] = [
  {
    id: "paper-1",
    title: "Attention Is All You Need",
    authors: [
      "Ashish Vaswani",
      "Noam Shazeer",
      "Niki Parmar",
      "Jakob Uszkoreit",
      "Llion Jones",
      "Aidan N. Gomez",
      "Łukasz Kaiser",
      "Illia Polosukhin",
    ],
    year: 2017,
    venue: "NeurIPS 2017",
    addedAt: "2026-09-10",
    pages: 15,
    status: "ready",
    citations: 124800,
    tags: ["Transformer", "Deep Learning", "NLP", "Self-Attention"],
    abstract:
      "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
    keyContributions: [
      "Solely attention-based sequence transduction without recurrent or convolutional neural networks.",
      "Multi-Head Attention mechanism allowing the model to jointly attend to information from different representation subspaces.",
      "Scaled Dot-Product Attention with a scaling factor of 1/√d_k to prevent gradient vanishing into soft saturation regions.",
      "Sinusoidal positional encodings to inject absolute and relative token positions into non-recurrent layers.",
    ],
    methodology: [
      "Stacked self-attention and point-wise fully connected feed-forward layers for both encoder and decoder.",
      "Residual connections around each sub-layer followed by layer normalization (Post-LN formulation).",
      "Label smoothing with value ε_ls = 0.1 during training to improve BLEU metric and prevent overconfident predictions.",
    ],
    results: [
      "Achieved 28.4 BLEU on WMT 2014 English-to-German translation task, outperforming existing state-of-the-art models by over 2.0 BLEU.",
      "Established a new single-model state-of-the-art BLEU score of 41.8 on WMT 2014 English-to-French after training for 3.5 days on 8 P100 GPUs.",
    ],
  },
  {
    id: "paper-2",
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: [
      "Edward J. Hu",
      "Yelong Shen",
      "Phillip Wallis",
      "Zeyuan Allen-Zhu",
      "Yuanzhi Li",
      "Shean Wang",
      "Lu Wang",
      "Weizhu Chen",
    ],
    year: 2021,
    venue: "ICLR 2022",
    addedAt: "2026-09-14",
    pages: 14,
    status: "ready",
    citations: 18900,
    tags: ["Fine-Tuning", "Parameter-Efficient", "LLM", "Optimization"],
    abstract:
      "An important paradigm of natural language processing consists of large-scale pre-training on general domain data and adaptation to specific tasks. However, full fine-tuning of multi-billion parameter models becomes prohibitively expensive. We propose Low-Rank Adaptation (LoRA), which freezes pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture.",
    keyContributions: [
      "Parameter-efficient tuning freezing pre-trained weights W_0 while learning low-rank matrix pairs B and A.",
      "Zero inference latency overhead by folding adapter matrices ΔW = BA back into W_0 during deployment.",
      "Memory requirement reductions up to 3x on VRAM during training and checkpoint storage size reductions by 10,000x.",
    ],
    methodology: [
      "Decomposes dense weight updates ΔW into low-rank matrices B ∈ R^{d×r} and A ∈ R^{r×k} where intrinsic rank r ≪ min(d, k).",
      "Applies Gaussian random initialization to matrix A and zero initialization to matrix B so ΔW = 0 at start of adaptation.",
      "Scales adapter contribution by α/r where α is a constant hyperparameter.",
    ],
    results: [
      "Matches or exceeds full fine-tuning performance on GPT-3 175B with only 0.01% trainable parameters.",
      "Demonstrates higher training throughput and eliminates checkpoint switching latency on shared multi-tenant clusters.",
    ],
  },
  {
    id: "paper-3",
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    authors: [
      "Patrick Lewis",
      "Ethan Perez",
      "Aleksandra Piktus",
      "Fabio Petroni",
      "Vladimir Karpukhin",
      "Naman Goyal",
      "Heinrich Küttler",
      "Mike Lewis",
      "Wen-tau Yih",
      "Tim Rocktäschel",
      "Sebastian Riedel",
      "Douwe Kiela",
    ],
    year: 2020,
    venue: "NeurIPS 2020",
    addedAt: "2026-09-17",
    pages: 19,
    status: "ready",
    citations: 24300,
    tags: ["RAG", "Dense Retrieval", "Hallucination Reduction", "Knowledge Base"],
    abstract:
      "Large pre-trained language models have been shown to store vast amounts of factual knowledge in their parameters, but their ability to access and precisely manipulate knowledge is still limited. We explore general-purpose fine-tuning recipes for Retrieval-Augmented Generation (RAG) — models which combine pre-trained parametric and non-parametric memory for language generation.",
    keyContributions: [
      "Hybrid parametric and non-parametric architecture combining dense passage retrieval with seq2seq generation.",
      "Formulation of both RAG-Sequence and RAG-Token probability distributions over retrieved document sets.",
      "End-to-end differentiability allowing the dense retriever and seq2seq generator to be fine-tuned jointly.",
    ],
    methodology: [
      "Dense Passage Retrieval (DPR) utilizing dual BERT encoders for query and document representations.",
      "BART-large pre-trained sequence-to-sequence model as the parametric generator.",
      "Marginalization over top-k retrieved documents (k=5 to 10) during sequence generation.",
    ],
    results: [
      "Sets new state-of-the-art results on open-domain QA benchmarks including Natural Questions, TriviaQA, and WebQuestions.",
      "Generates significantly more specific, diverse, and factual text than parametric-only seq2seq baselines.",
    ],
  },
  {
    id: "paper-4",
    title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning",
    authors: [
      "DeepSeek-AI",
      "Daya Guo",
      "Dejian Yang",
      "Haowei Zhang",
      "Junxiao Song",
      "Ruoyu Zhang",
      "Runxin Xu",
      "Qihao Zhu",
    ],
    year: 2025,
    venue: "arXiv preprint 2501.12948",
    addedAt: "2026-09-19",
    pages: 28,
    status: "ready",
    citations: 6200,
    tags: ["Reasoning", "Reinforcement Learning", "Chain-of-Thought", "DeepSeek"],
    abstract:
      "We introduce our first-generation reasoning models, DeepSeek-R1-Zero and DeepSeek-R1. DeepSeek-R1-Zero, a model trained via large-scale reinforcement learning (RL) without supervised fine-tuning (SFT) as a preliminary step, demonstrates remarkable reasoning capabilities. Through RL, DeepSeek-R1-Zero naturally emerges with numerous powerful reasoning behaviors including self-verification, reflection, and generating long chains of thought.",
    keyContributions: [
      "Demonstration that pure reinforcement learning without initial supervised fine-tuning induces emergent reasoning.",
      "Multi-stage pipeline incorporating cold-start data, reasoning-oriented RL, rejection sampling, and broad-domain RL.",
      "Distillation of reasoning capabilities from DeepSeek-R1 into smaller dense models (1.5B, 7B, 14B, 32B).",
    ],
    methodology: [
      "Group Relative Policy Optimization (GRPO) omitting the critic model to reduce training memory footprint.",
      "Rule-based reward system rewarding accuracy (e.g., LeetCode/math answers) and formatting (thinking tags).",
      "Strict avoidance of neural reward models during early RL to prevent reward hacking.",
    ],
    results: [
      "Achieved 79.8% Pass@1 on AIME 2024 and 97.3% on MATH-500, competitive with OpenAI o1.",
      "Distilled DeepSeek-R1-32B outperforms open-source baselines and achieves superior inference cost efficiency.",
    ],
  },
  {
    id: "paper-5",
    title: "FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning",
    authors: ["Tri Dao"],
    year: 2023,
    venue: "ICLR 2024",
    addedAt: "2026-09-20",
    pages: 14,
    status: "processing",
    citations: 3400,
    tags: ["CUDA", "Attention Optimization", "GPU Kernel", "Hardware-Aware"],
    abstract:
      "FlashAttention is an exact attention algorithm that reduces memory reads/writes between GPU HBM and SRAM. We present FlashAttention-2, which yields a 2x speedup over FlashAttention by tweaking the algorithm to reduce non-matmul FLOPs, parallelizing the forward and backward passes across sequence length, and partitioning work across warps.",
    keyContributions: [
      "Algorithmic tweaks to reduce non-matrix-multiplication FLOPs by eliminating unnecessary scaling factor recomputations.",
      "Improved parallelism across sequence length dimensions in addition to batch size and number of heads.",
      "Work partitioning between warps within a thread block that maximizes Tensor Core utilization.",
    ],
    methodology: [
      "Online softmax computation with running maximum statistics maintained in fast SRAM registers.",
      "Optimized warp-level matrix multiply-accumulate (MMA) instructions.",
      "Split forward and backward kernel loops minimizing synchronization barriers.",
    ],
    results: [
      "Reaches up to 73% of theoretical peak GPU FLOPs on A100 GPUs (up from 35-50% in original FlashAttention).",
      "Achieves 2x faster end-to-end wall-clock training throughput for 8k-32k sequence context windows.",
    ],
  },
];
