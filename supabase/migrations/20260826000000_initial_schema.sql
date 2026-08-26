-- AskMyData Production Database Schema
-- Multi-Tenant PostgreSQL Schema with Row Level Security (RLS)

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    default_role TEXT DEFAULT 'business_owner',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Workspaces Table
CREATE TABLE IF NOT EXISTS public.workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    logo_url TEXT,
    default_mode TEXT DEFAULT 'decision',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Workspace Members Table
CREATE TABLE IF NOT EXISTS public.workspace_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'analyst' CHECK (role IN ('owner', 'admin', 'analyst', 'data_scientist', 'viewer')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(workspace_id, user_id)
);

-- 4. Data Sources Table
CREATE TABLE IF NOT EXISTS public.data_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('csv', 'xlsx', 'json', 'postgresql', 'mysql', 'bigquery', 'snowflake', 'demo')),
    status TEXT DEFAULT 'active',
    config_json JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Datasets Table
CREATE TABLE IF NOT EXISTS public.datasets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    source_id UUID REFERENCES public.data_sources(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    table_name TEXT NOT NULL,
    row_count INTEGER DEFAULT 0,
    col_count INTEGER DEFAULT 0,
    health_score INTEGER DEFAULT 100,
    data_json JSONB DEFAULT '[]'::jsonb,
    schema_json JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Dataset Columns Table
CREATE TABLE IF NOT EXISTS public.dataset_columns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID NOT NULL REFERENCES public.datasets(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    data_type TEXT NOT NULL,
    null_rate REAL DEFAULT 0.0,
    distinct_count INTEGER DEFAULT 0,
    min_val TEXT,
    max_val TEXT,
    stats_json JSONB DEFAULT '{}'::jsonb
);

-- 7. Semantic Metrics Table
CREATE TABLE IF NOT EXISTS public.semantic_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    formula TEXT NOT NULL,
    source_dataset_id UUID REFERENCES public.datasets(id) ON DELETE SET NULL,
    synonyms TEXT[] DEFAULT '{}',
    owner TEXT,
    status TEXT DEFAULT 'certified' CHECK (status IN ('draft', 'verified', 'certified', 'deprecated')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Business Glossary Terms
CREATE TABLE IF NOT EXISTS public.business_terms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    term TEXT NOT NULL,
    definition TEXT NOT NULL,
    synonyms TEXT[] DEFAULT '{}',
    source TEXT,
    owner TEXT,
    status TEXT DEFAULT 'verified',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Conversations Table
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    intent_type TEXT DEFAULT 'descriptive',
    context_json JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'ai')),
    content TEXT NOT NULL,
    evidence_json JSONB DEFAULT '{}'::jsonb,
    chart_spec_json JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Saved Analyses Table
CREATE TABLE IF NOT EXISTS public.analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    question TEXT NOT NULL,
    sql_query TEXT,
    result_data JSONB DEFAULT '[]'::jsonb,
    chart_spec JSONB DEFAULT '{}'::jsonb,
    explanation_level TEXT DEFAULT 'simple',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Persistent Investigations Table
CREATE TABLE IF NOT EXISTS public.investigations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'in_review', 'resolved')),
    trigger_question TEXT NOT NULL,
    summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Investigation Steps Table
CREATE TABLE IF NOT EXISTS public.investigation_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investigation_id UUID NOT NULL REFERENCES public.investigations(id) ON DELETE CASCADE,
    step_index INTEGER NOT NULL,
    title TEXT NOT NULL,
    finding TEXT NOT NULL,
    evidence_json JSONB DEFAULT '{}'::jsonb,
    chart_spec_json JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Decision Briefs Table
CREATE TABLE IF NOT EXISTS public.decision_briefs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    situation TEXT NOT NULL,
    evidence_level TEXT DEFAULT 'Verified',
    drivers_json JSONB DEFAULT '[]'::jsonb,
    opportunities_json JSONB DEFAULT '[]'::jsonb,
    risks_json JSONB DEFAULT '[]'::jsonb,
    actions_json JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Dashboards Table
CREATE TABLE IF NOT EXISTS public.dashboards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    layout_json JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Reports Table
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    executive_summary TEXT,
    sections_json JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. Presentations Table
CREATE TABLE IF NOT EXISTS public.presentations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slides_json JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Alerts Table
CREATE TABLE IF NOT EXISTS public.alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    metric_name TEXT NOT NULL,
    condition TEXT NOT NULL,
    threshold REAL NOT NULL,
    status TEXT DEFAULT 'active',
    last_triggered TIMESTAMPTZ
);

-- Enable Row Level Security on all core tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dataset_columns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.semantic_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investigations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investigation_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decision_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Permissive public policies for authenticated workspace users
CREATE POLICY "Public Profiles Read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Profiles Update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Workspace Access Policy" ON public.workspaces FOR ALL USING (true);
CREATE POLICY "Workspace Members Policy" ON public.workspace_members FOR ALL USING (true);
CREATE POLICY "Data Sources Policy" ON public.data_sources FOR ALL USING (true);
CREATE POLICY "Datasets Policy" ON public.datasets FOR ALL USING (true);
CREATE POLICY "Dataset Columns Policy" ON public.dataset_columns FOR ALL USING (true);
CREATE POLICY "Semantic Metrics Policy" ON public.semantic_metrics FOR ALL USING (true);
CREATE POLICY "Business Terms Policy" ON public.business_terms FOR ALL USING (true);
CREATE POLICY "Conversations Policy" ON public.conversations FOR ALL USING (true);
CREATE POLICY "Messages Policy" ON public.messages FOR ALL USING (true);
CREATE POLICY "Analyses Policy" ON public.analyses FOR ALL USING (true);
CREATE POLICY "Investigations Policy" ON public.investigations FOR ALL USING (true);
CREATE POLICY "Investigation Steps Policy" ON public.investigation_steps FOR ALL USING (true);
CREATE POLICY "Decision Briefs Policy" ON public.decision_briefs FOR ALL USING (true);
CREATE POLICY "Dashboards Policy" ON public.dashboards FOR ALL USING (true);
CREATE POLICY "Reports Policy" ON public.reports FOR ALL USING (true);
CREATE POLICY "Presentations Policy" ON public.presentations FOR ALL USING (true);
CREATE POLICY "Alerts Policy" ON public.alerts FOR ALL USING (true);
