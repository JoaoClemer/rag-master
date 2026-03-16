export const knowledgeBases = [
  {
    id: "kb-1",
    name: "Customer Support Docs",
    description: "Handbooks, FAQs, and support ticket resolutions for the Q4 cycle.",
    icon: "description",
    documents: 24,
    chunks: "1,240",
    date: "Oct 12, 2025",
  },
  {
    id: "kb-2",
    name: "Technical Specs",
    description: "API documentation and internal system architectural diagrams.",
    icon: "settings_applications",
    documents: 12,
    chunks: "850",
    date: "Oct 15, 2025",
  },
  {
    id: "kb-3",
    name: "Legal Archive",
    description: "Compliance reports, historical contracts, and regional regulations.",
    icon: "gavel",
    documents: 45,
    chunks: "3,200",
    date: "Oct 20, 2025",
  },
];

export const systemHealth = [
  { label: "INDEXING STATUS", value: "All Systems Operational", color: "bg-emerald-500" },
  { label: "TOTAL STORAGE", value: "4.2 GB / 10 GB Used", color: "bg-primary" },
  { label: "QUERIES (24H)", value: "12,482 Requests", color: "bg-blue-500" },
];

export const kbDetails = {
  name: "Technical Documentation",
  description: "Internal product manuals, API specifications, and infrastructure architecture diagrams for automated customer support grounding.",
  id: "kb_98412_tech_docs",
  created: "Oct 12, 2023",
  visibility: "Private",
  embeddingModel: "text-embedding-3-small",
  chunkSize: "512 tokens",
  overlap: "50 tokens",
  totalVectors: "12,482",
  storagePercent: 12,
};

export const documents = [
  { name: "API_Guide_v2.4.pdf", icon: "picture_as_pdf", status: "Processed" as const, size: "2.4 MB", lastSynced: "2 mins ago" },
  { name: "System_Architecture.md", icon: "article", status: "Processing" as const, size: "128 KB", lastSynced: "Just now" },
  { name: "Security_Whitepaper.pdf", icon: "picture_as_pdf", status: "Processed" as const, size: "4.1 MB", lastSynced: "Yesterday" },
  { name: "Draft_Specs_Obsolete.txt", icon: "error", status: "Failed" as const, size: "45 KB", lastSynced: "3 days ago" },
];

export const chatMessages = [
  {
    role: "assistant" as const,
    content: "Hello! I'm connected to your Knowledge Base. Ask me anything about your uploaded documents, and I'll retrieve the relevant information for you.",
  },
  {
    role: "user" as const,
    content: "Can you summarize the Q3 financial report? Pay special attention to the growth in SaaS revenue compared to last year.",
  },
  {
    role: "assistant" as const,
    content: 'Based on the Q3 Financial Report (page 12), your SaaS revenue grew by 24.5% year-over-year, reaching $4.2M. This acceleration was primarily driven by the expansion of the "Enterprise Connect" tier.\n\nCompared to Q3 of the previous year ($3.37M), this represents a significant increase in market penetration within the mid-market segment.',
    searching: true,
    searchLabel: "Searching 4 context chunks...",
  },
];

export const contextChunks = [
  {
    fileName: "Q3_Report_2023.pdf",
    score: "0.94",
    text: '"...Our SaaS revenue segment grew significantly to $4.2M, representing a 24.5% increase compared to Q3 2022. The key driver was the Enterprise Connect tier which saw 40% growth..."',
    icon: "article",
    highlighted: true,
  },
  {
    fileName: "Annual_Plan_V2.docx",
    score: "0.82",
    text: '"...revenue targets for the fiscal year include a push towards high-margin SaaS products. Previous year\'s Q3 performance was noted at $3.37M total for cloud services..."',
    icon: "article",
    highlighted: false,
  },
  {
    fileName: "Revenue_Log_Sheet.csv",
    score: "0.76",
    text: '"...row 45: SaaS-Subscription, Sep 2023, $1.4M; row 46: SaaS-Subscription, Aug 2023, $1.4M; row 47: SaaS-Subscription, Jul 2023, $1.4M..."',
    icon: "table_chart",
    highlighted: false,
  },
];

export const retrievalQuery = {
  title: "How do I scale vector indices?",
  latency: "142ms",
  topK: "5",
  model: "text-embedding-3-small",
  relevance: "High Relevance",
};

export const retrievalMetrics = [
  { label: "Max Similarity", value: "0.942", change: "+0.02", positive: true },
  { label: "Avg. Relevance Score", value: "0.881", change: "+0.01", positive: true },
  { label: "Chunks Retrieved", value: "5", change: "-2 nodes", positive: false },
];

export const retrievedChunks = [
  {
    rank: 1,
    fileName: "engineering_docs_scaling.pdf",
    similarity: 0.942,
    text: '"To scale vector indices effectively, one must consider horizontal partitioning across multiple shards. When query volume increases, replicating indices across nodes provides high availability and throughput. For large datasets, HNSW indices can be compressed using Product Quantization (PQ) to reduce memory overhead while maintaining recall..."',
    meta: ["chunk_id: chunk_422", "page: 12", "tokens: 240"],
    highlighted: true,
  },
  {
    rank: 2,
    fileName: "vector_db_benchmarks_2024.md",
    similarity: 0.891,
    text: '"...The study found that vertical scaling has diminishing returns beyond 64GB of RAM for real-time vector search. Distributed architectures like Weaviate or Pinecone handle indices in a multi-tenant environment, allowing clusters to expand as storage requirements grow linearly."',
    meta: ["chunk_id: chunk_891", "section: benchmarks"],
    highlighted: false,
  },
  {
    rank: 3,
    fileName: "internal_whitepaper_index.docx",
    similarity: 0.824,
    text: '"Indexing strategies for text documents often involve a hybrid approach where BM25 is combined with semantic embeddings to capture both keyword matches and conceptual meanings. Scaling these systems requires careful coordination..."',
    meta: ["chunk_id: chunk_003"],
    highlighted: false,
  },
];

export const queryParameters = [
  { label: "Collection", value: "prod-v3-internal", mono: true },
  { label: "Embedding Dim", value: "1536", mono: true },
  { label: "Distance Metric", value: "Cosine", mono: true },
  { label: "EF Search", value: "128", mono: true },
];

export const metadataTags = ["STABLE", "REGION: US-EAST-1", "INDEX: HNSW"];

export const sidebarNavItems = [
  { icon: "dashboard", label: "Dashboard", path: "/" },
  { icon: "database", label: "Knowledge Bases", path: "/" },
  { icon: "terminal", label: "Playground", path: "/playground" },
  { icon: "settings", label: "Settings", path: "#" },
];
