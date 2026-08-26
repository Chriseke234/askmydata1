# AskMyData System Architecture

## Overview Architecture

```
User Query / Request
      ↓
Next.js App Router (Client / Server Boundary)
      ↓
AI Provider Abstraction Layer (lib/ai/provider.ts)
      ↓
Gemini AI Engine (lib/ai/gemini-provider.ts)
      ↓
Controlled AI Function Tools (lib/ai/tools.ts)
  ├── get_dataset_schema
  ├── run_readonly_query
  └── calculate_statistics
      ↓
Data Engine & Profiler (lib/data/)
      ↓
Supabase PostgreSQL with RLS Policies
      ↓
Verification & Evidence Engine (lib/ai/verification-engine.ts)
      ↓
Interactive Canvas / Recharts / Executive Decision Brief
```

## Security & Multi-Tenancy

Every database resource is linked to `workspace_id` and enforced via Supabase PostgreSQL Row Level Security (RLS). Client bundle env vars are strictly limited to `NEXT_PUBLIC_` prefixes, preserving secret key protection for server handlers.
