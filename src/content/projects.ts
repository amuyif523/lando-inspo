export type Project = {
  id: number;
  name: string;
  description: string;
  tech: string[];
  category: string;
  status?: "active" | "archived" | "prototype";
};

export const projects: Project[] = [
  {
    id: 1,
    name: "AI Assistant Platform",
    description: "LLM-powered assistants with evaluation harnesses and retrieval pipelines.",
    tech: ["TypeScript", "Next.js", "OpenAI", "Postgres", "Pinecone"],
    category: "AI/ML",
    status: "active",
  },
  {
    id: 2,
    name: "Vision Quality Lab",
    description: "Camera and defect detection pipeline with human-in-the-loop review.",
    tech: ["Python", "YOLO", "FastAPI", "Kafka", "OpenCV"],
    category: "Computer Vision",
    status: "active",
  },
  {
    id: 3,
    name: "Data Reliability Mesh",
    description: "Streaming + batch pipelines with monitoring, lineage, and data quality gates.",
    tech: ["Airflow", "dbt", "Great Expectations", "Snowflake", "Kafka"],
    category: "Data Engineering",
    status: "active",
  },
  {
    id: 4,
    name: "Neural Interface Portfolio",
    description: "WebGL-driven portfolio with 3D neural network visualization.",
    tech: ["Next.js", "Three.js", "Framer Motion", "Tailwind"],
    category: "Web",
    status: "prototype",
  },
];
