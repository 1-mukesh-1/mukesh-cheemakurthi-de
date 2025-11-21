import { ResumeData } from './types';

export const RESUME_DATA: ResumeData = {
  personal: {
    name: "Mukesh Cheemakurthi",
    title: "Data Engineer",
    location: "Boston, MA, USA",
    email: "cheemakurthi.m@northeastern.edu",
    phone: "+1 (716) 418-9488",
    linkedin: "https://www.linkedin.com/in/mukesh003/",
    github: "https://github.com/1-mukesh-1",
    summary: "Data Engineer experienced in building large-scale ETL and streaming pipelines, enhancing system performance, and optimizing cloud costs. Successfully reduced pipeline runtimes from 8 hours to 1 hour using advanced cloud parameters and developed CI/CD pipelines on GCP for automated deployment. Focused on leveraging data engineering expertise to optimize data workflows and drive improvements in analytics and cloud environments."
  },
  education: [
    {
      school: "Northeastern University",
      degree: "Master of Science, Computer Science",
      period: "Sep 2024 - Apr 2026",
      location: "Boston, MA, USA",
      gpa: "3.93",
      coursework: "Algorithms, Foundations of AI, Data Mining Techniques, Programming Design Paradigms"
    },
    {
      school: "Vellore Institute of Technology",
      degree: "Bachelor of Technology, Computer Science and Engineering",
      period: "Jul 2018 - May 2022",
      location: "Vellore, TN, India",
      coursework: "Computer Networks, Database Management, Operating Systems, Data Warehousing"
    }
  ],
  experience: [
    {
      company: "Walmart Global Tech",
      role: "Data Engineer 2",
      period: "Jul 2022 - Aug 2024",
      location: "Bengaluru, KA, India",
      description: [
        "Engineered stakeholder-aligned solutions for data projects via iterative requirement gathering, improving project delivery timelines.",
        "Developed large-scale ETL pipelines processing 1TB+ data using Apache Spark, Hadoop, Airflow and Kafka.",
        "Enhanced Cloud parameters reducing pipeline runtime from 8 hours to 1 hour, cutting cloud costs.",
        "Architected Google BigQuery dimensional models (star/snowflake) with SCDs, optimizing enterprise analytics.",
        "Built CI/CD pipelines with Jenkins, Docker and GitHub, automating pipeline deployment on GCP.",
        "Built Spark Streaming pipelines for Kafka-to-DeltaLake tables ingestion with windowed aggregations, reducing latency.",
        "Contributed to the development of a YAML-driven pipeline framework in Java, integrating ETL, Airflow, Kubernetes, Data Governance, reporting, logging, and warehousing, which streamlined processes and reduced deployment time.",
        "Integrated 5+ OMS components and migrated 50+ tables from RDBMS to DataLake, enhancing data accessibility and performance."
      ]
    },
    {
      company: "Walmart Global Tech",
      role: "Data Scientist (Internship)",
      period: "Jan 2022 - Jul 2022",
      location: "Bengaluru, KA, India",
      description: [
        "Performed data cleaning, transformation, and analysis using NumPy and Pandas, improving model accuracy and reliability.",
        "Utilized PYOMO linear optimizer and local search algorithms for multi-objective optimization, enhancing decision-making efficiency.",
        "Performed time series analysis to forecast demand patterns and determine seasonality coefficients, leading to more accurate pricing.",
        "Conducted A/B testing on pricing models and presented key metrics to stakeholders, facilitating data-driven pricing strategies."
      ]
    }
  ],
  projects: [
    {
      title: "E-commerce Data Warehouse with dbt & Databricks",
      period: "May 2025 - Jun 2025", // Kept as per resume (future date noted)
      association: "Northeastern University",
      location: "Boston, MA, USA",
      points: [
        "Built end-to-end ELT pipeline ingesting data from PostgreSQL to S3 data lake using AWS DMS, processing 500K daily transactions.",
        "Developed 30+ dbt models for data transformation with incremental loads, snapshot tables, and automated testing for data quality.",
        "Implemented Databricks lakehouse architecture with Bronze/Silver/Gold layers, optimizing Delta tables with Z-ordering.",
        "Created star schema data warehouse in Redshift with fact tables for sales/inventory and dimension tables for products/customers.",
        "Automated pipeline monitoring using dbt tests and AWS CloudWatch, achieving 99.5% data accuracy with email alerts for failures.",
        "Built PowerBI dashboard connecting to Redshift showing KPIs (revenue trends, customer retention, product performance metrics)."
      ]
    },
    {
      title: "HiveQL Schema Generator using JSON Schema",
      period: "Jun 2024 - Jul 2024",
      association: "Walmart Global Tech",
      location: "Bengaluru, KA, India",
      points: [
        "A simple web application that converts Avro schema definitions to Hive SQL CREATE TABLE statements using DFS algorithm by converting JSON into Graph Data Structure.",
        "This tool helps data engineers and developers quickly generate Hive table definitions from Json Files."
      ]
    }
  ],
  skills: [
    { category: "Languages", skills: ["Python", "Scala", "Java", "JavaScript", "Shell/Bash", "PySpark", "Spark-SQL", "SQL", "NoSQL"] },
    { category: "Big Data ETL", skills: ["Apache Spark", "Hadoop", "MapReduce", "Data Lake", "Kafka", "Delta Lake"] },
    { category: "Storage", skills: ["BigQuery", "Snowflake", "MongoDB", "Oracle", "JSON", "Parquet"] },
    { category: "Cloud & DevOps", skills: ["AWS", "GCP", "Github", "Kubernetes", "Terraform", "Docker", "Jenkins", "Airflow", "Helm"] },
    { category: "Web", skills: ["REST APIs", "Microservices", "React", "Scrapy"] }
  ]
};