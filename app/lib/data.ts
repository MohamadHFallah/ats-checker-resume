// lib/data.ts
export const resumeData = {
  resumeResult: {
    name: "Mohamad Hassan Fallah",
    phone: "+989118296582",
    summery: "I'm a Full Stack JavaScript Developer with 10+ years of experience building reliable applications. My skills include a wide range of technologies: Node.js, TypeScript, Nest.js, Docker, GraphQL, PostgreSQL, React.js, and more. I enjoy solving complex challenges and designing clean, maintainable architecture.",
    skills: [
      "Node.js",
      "TypeScript",
      "NestJS",
      "REST API",
      "GraphQL",
      "Jest",
      "ORM",
      "React.js",
      "Next.js",
      "React-router",
      "Storybook",
      "Tailwind CSS",
      "MUI",
      "PostgreSQL",
      "Redis",
      "Elasticsearch",
      "Neo4j",
      "Git",
      "Cursor AI",
      "Jira",
      "Scrum",
      "Vercel"
    ],
    projects: [],
    experience: [
      {
        company: "Notion Wave Inc, Tehran",
        position: "Senior Full-Stack Developer",
        startDate: "May 2024",
        endDate: "Apr 2026",
        description: "Worked on Scinito – Academic Research Platform: designed and built multi-tier Plan & Quota Management system supporting Subscription, Trial, and Enterprise usage tracking; built responsive UI components using React and MUI; implemented integration testing for APIs using Jest to improve system reliability; developed Notes Service for communication researchers; shipped logs to ClickHouse for observability; implemented authentication and authorization using Keycloak.\n\nAlso worked on Mira – Smart Local Guide for Cities (AI Chat): architected end-to-end Next.js application for AI-powered city guide chatbot; integrated Google Maps services for location-based features; implemented authentication using Clerk; configured PWA with offline support; built fully responsive UI using Tailwind CSS and shadcn/ui; implemented i18n for English and Italian (multilingual).",
        technologies: [
          "React",
          "MUI",
          "Jest",
          "ClickHouse",
          "Keycloak",
          "Next.js",
          "Google Maps API",
          "Clerk",
          "PWA",
          "Tailwind CSS",
          "shadcn/ui"
        ]
      },
      {
        company: "Avid Technology Development - Tehran",
        position: "Senior Full-Stack Developer",
        startDate: "Mar 2019",
        endDate: "Sep 2024",
        description: "Troweb Saas & Troweb Ecosystem: Developed GraphQL APIs using Apollo Server; built high-performance pipelines for importing large-scale data; implemented 4 frontend applications integrated with the Troweb SaaS knowledge management platform.\n\nRecommender Paper: Architected and optimized data processing pipelines for 210M academic papers stored in Elasticsearch (Microsoft Academic Graph); optimized PostgreSQL query performance and implemented Elasticsearch indexing for full-text search; used Redis caching to reduce response time; created backup and restore scripts on AWS S3.\n\nCrosslink – Graph Traversal System: Designed and implemented graph-based traversal system using Neo4j handling up to 5,000 connected nodes; implemented algorithms to find optimal paths and relationships between entities; worked with NestJS framework.",
        technologies: [
          "GraphQL",
          "Apollo Server",
          "PostgreSQL",
          "Elasticsearch",
          "Redis",
          "AWS S3",
          "Neo4j",
          "NestJS"
        ]
      }
    ],
    education: [
      {
        institution: "University of Guilan",
        degree: "Master's degree",
        field: "Computer Software Engineering",
        startDate: "Sep 2014",
        endDate: "Mar 2017"
      }
    ]
  },
  analyserResult: {
    overallScore: 8,
    strengths: [
      "Clear and detailed experience descriptions with specific technologies and responsibilities.",
      "Strong skills section listing relevant technologies and tools.",
      "Use of keywords relevant for ATS (e.g., technologies, methodologies).",
      "Good use of bullet points and clear structuring within experience entries.",
      "Inclusion of achievements like optimizing pipelines and implementing caching strategies."
    ],
    weaknesses: [
      "Dates in the future (May 2024 - Apr 2026) may confuse ATS or recruiters if viewed before those dates.",
      "Summary contains a typo: 'summery' instead of 'summary'.",
      "No separate section for certifications or professional achievements which could enhance the resume.",
      "No quantifiable achievements with metrics in some places to showcase impact more explicitly.",
      "The 'projects' section is empty, missing opportunity to highlight key deliverables or contributions separately."
    ],
    atsIssues: [
      {
        issue: "The 'summery' field is misspelled; standard ATS systems expect 'summary'.",
        severity: "medium",
        explanation: "Misspelling of a common section header can result in ATS not recognizing the summary section content properly."
      },
      {
        issue: "Date ranges include future dates from 2024-2026, potentially confusing ATS or recruiters.",
        severity: "low",
        explanation: "Future dates may be interpreted inaccurately by ATS or reviewers and cause questions about accuracy or intent."
      },
      {
        issue: "No use of standard section headings like 'Summary', 'Experience', 'Education' in the JSON structure.",
        severity: "medium",
        explanation: "ATS typically rely on common section headers to parse data correctly; non-standard labels or missing headings can reduce parsing accuracy."
      }
    ],
    suggestions: [
      {
        title: "Correct 'summery' to 'summary'",
        explanation: "Fixing this typo ensures ATS can recognize and extract the summary section correctly."
      },
      {
        title: "Update or clarify dates to avoid confusion",
        explanation: "Using current or past dates or clarifying the expected periods reduces confusion for both ATS and human reviewers."
      },
      {
        title: "Add quantifiable achievements with metrics",
        explanation: "Including measurable outcomes (e.g., improved performance by X%, reduced response time by Y seconds) strengthens the impact of experience descriptions."
      },
      {
        title: "Populate the projects section with key highlights",
        explanation: "Adding notable projects separately increases visibility of accomplishments and provides extra context beyond experience entries."
      },
      {
        title: "Use standardized section headings",
        explanation: "Structuring the resume with standard headings improves ATS parsing and ensures better alignment with recruiter expectations."
      }
    ]
  }
}