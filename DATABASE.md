# AskMyData Database Schema Specification

## Core Tables (Supabase PostgreSQL)

- `profiles`: User accounts, default workspace role (`business_owner`, `analyst`, `data_scientist`).
- `workspaces`: Multi-tenant organization boundaries.
- `workspace_members`: Role assignments (`owner`, `admin`, `analyst`, `data_scientist`, `viewer`).
- `data_sources`: Connections (`csv`, `xlsx`, `json`, `postgresql`, `mysql`, `bigquery`, `snowflake`).
- `datasets`: Tables, schema definitions, data quality health score (0-100).
- `dataset_columns`: Null rates, distinct counts, min/max values, quality stats.
- `semantic_metrics`: Certified metric formulas (`certified`, `verified`, `draft`).
- `business_terms`: Glossary definitions, synonyms, owners.
- `conversations` & `messages`: AI chat transcripts, evidence JSON, chart specs.
- `analyses`: Saved analyst SQL queries, results, visualizations.
- `investigations` & `investigation_steps`: Signature multi-step branching investigation threads.
- `decision_briefs`: Executive situation, evidence level, drivers, opportunities, risks, next actions.
- `dashboards`, `reports`, `presentations`: Visual dashboard grids, printable reports, slide decks.
- `alerts`, `audit_logs`, `ai_usage`: System monitoring and security event tracking.
