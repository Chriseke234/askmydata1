# ASKMYDATA
**AI-Native Data Intelligence, Analytics & Decision Platform**

Turn your data into better decisions. AskMyData connects to your data, understands what is happening, explains why, helps you investigate deeper, and turns analysis into decisions your team can act on.

---

## Audiences & Product Modes

- **Business Owners & Executives (Decision Mode)**: Understand your business in plain English. Access Executive Decision Briefs, anomaly highlights, and action plans.
- **Data Analysts (Analyst Mode)**: Explore schemas, write read-only queries with dry-run safety validation, inspect verified evidence panels, and manage certified metric definitions.
- **Data Scientists (Data Science Mode)**: Perform statistical regressions, scenario analysis simulations ("What happens if marketing spend increases 20%?"), time-series forecasting, and ML experiment tracking.

---

## Tech Architecture

- **Frontend**: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, Lucide React (SVG icons), Recharts.
- **Backend**: Supabase PostgreSQL database with Row-Level Security (RLS) policies, Supabase Auth (`@supabase/ssr`), and Supabase Storage.
- **AI Engine**: Google Gemini API via `@google/generative-ai` with function calling architecture (`get_dataset_schema`, `run_readonly_query`, `calculate_statistics`, `create_visualization_spec`).
- **Brand Palette**: Obsidian Black (`#0B0C0E`), Warm Gold (`#D4AF37`), Clarity White (`#FFFFFF`).

---

## Quick Start

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   GEMINI_API_KEY=your-gemini-api-key
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```
