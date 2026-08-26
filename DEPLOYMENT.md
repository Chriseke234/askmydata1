# AskMyData Vercel & Supabase Deployment Guide

## Step-by-Step Deployment Instructions

1. **Supabase Project Setup**:
   - Migration file: `supabase/migrations/20260826000000_initial_schema.sql`
   - Run the migration file in the Supabase SQL Editor to create all 18 multi-tenant tables and RLS policies.

2. **Environment Variables in Vercel**:
   - `NEXT_PUBLIC_SUPABASE_URL`: `your-supabase-project-url`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: `your-supabase-publishable-key`
   - `SUPABASE_SERVICE_ROLE_KEY`: `your-supabase-service-role-key`
   - `GEMINI_API_KEY`: `your-gemini-api-key`

3. **Deploying to Vercel**:
   ```bash
   vercel --prod
   ```

4. **Production Verification Checklist**:
   - Run `npm run lint`
   - Run `npm run typecheck`
   - Run `npm run build`
