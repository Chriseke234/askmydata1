import Papa from 'papaparse';
import { createClient } from '@/lib/supabase/client';

export interface ColumnMetadata {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  sampleValues: any[];
  nullCount: number;
  uniqueCount: number;
}

export interface RealtimeDataset {
  id: string;
  name: string;
  description: string;
  source: 'CSV Upload' | 'Excel Upload' | 'JSON Upload' | 'Sample Dataset' | 'PostgreSQL';
  rowCount: number;
  colCount: number;
  healthScore: number;
  columns: ColumnMetadata[];
  rows: Record<string, any>[];
  createdAt: string;
  updatedAt: string;
}

// Sample Business Templates for Instant 1-Click Testing
export const SAMPLE_DATASETS: RealtimeDataset[] = [
  {
    id: 'sample-saas-revenue',
    name: 'SaaS Monthly Subscriptions & MRR',
    description: 'Real-time subscription metrics including MRR, plan types, churn status, and customer region.',
    source: 'Sample Dataset',
    rowCount: 25,
    colCount: 7,
    healthScore: 98,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    columns: [
      { name: 'customer_name', type: 'string', sampleValues: ['Acme Corp', 'Nexus AI', 'Vortex Systems'], nullCount: 0, uniqueCount: 25 },
      { name: 'plan_tier', type: 'string', sampleValues: ['Enterprise', 'Pro', 'Basic'], nullCount: 0, uniqueCount: 3 },
      { name: 'mrr', type: 'number', sampleValues: [1200, 450, 89], nullCount: 0, uniqueCount: 18 },
      { name: 'region', type: 'string', sampleValues: ['North America', 'Europe', 'Asia Pacific'], nullCount: 0, uniqueCount: 4 },
      { name: 'churn_risk', type: 'string', sampleValues: ['Low', 'Medium', 'High'], nullCount: 0, uniqueCount: 3 },
      { name: 'signup_date', type: 'date', sampleValues: ['2025-01-15', '2025-02-01', '2025-03-10'], nullCount: 0, uniqueCount: 20 },
      { name: 'active_users', type: 'number', sampleValues: [45, 12, 3], nullCount: 0, uniqueCount: 15 }
    ],
    rows: [
      { customer_name: 'Acme Corp', plan_tier: 'Enterprise', mrr: 2400, region: 'North America', churn_risk: 'Low', signup_date: '2025-01-15', active_users: 120 },
      { customer_name: 'Nexus Tech', plan_tier: 'Enterprise', mrr: 1800, region: 'Europe', churn_risk: 'Low', signup_date: '2025-01-18', active_users: 85 },
      { customer_name: 'Vortex Labs', plan_tier: 'Pro', mrr: 500, region: 'North America', churn_risk: 'Medium', signup_date: '2025-02-01', active_users: 24 },
      { customer_name: 'Horizon Software', plan_tier: 'Pro', mrr: 450, region: 'Asia Pacific', churn_risk: 'Low', signup_date: '2025-02-14', active_users: 18 },
      { customer_name: 'Starlight Analytics', plan_tier: 'Enterprise', mrr: 3100, region: 'North America', churn_risk: 'Low', signup_date: '2025-02-20', active_users: 140 },
      { customer_name: 'CyberMetrics', plan_tier: 'Basic', mrr: 99, region: 'Europe', churn_risk: 'High', signup_date: '2025-03-01', active_users: 4 },
      { customer_name: 'Quantum Systems', plan_tier: 'Pro', mrr: 600, region: 'Latin America', churn_risk: 'Medium', signup_date: '2025-03-05', active_users: 30 },
      { customer_name: 'Pulse Health', plan_tier: 'Enterprise', mrr: 2900, region: 'North America', churn_risk: 'Low', signup_date: '2025-03-12', active_users: 110 },
      { customer_name: 'CloudScale', plan_tier: 'Pro', mrr: 550, region: 'Europe', churn_risk: 'Low', signup_date: '2025-03-19', active_users: 28 },
      { customer_name: 'Apex Global', plan_tier: 'Enterprise', mrr: 4200, region: 'North America', churn_risk: 'Low', signup_date: '2025-04-02', active_users: 210 }
    ]
  },
  {
    id: 'sample-ecommerce-orders',
    name: 'E-Commerce Orders & Fulfillment',
    description: 'Order transactions, product categories, unit prices, shipping costs, and customer review ratings.',
    source: 'Sample Dataset',
    rowCount: 20,
    colCount: 7,
    healthScore: 96,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    columns: [
      { name: 'order_id', type: 'string', sampleValues: ['ORD-9001', 'ORD-9002'], nullCount: 0, uniqueCount: 20 },
      { name: 'category', type: 'string', sampleValues: ['Electronics', 'Office Supplies', 'Apparel'], nullCount: 0, uniqueCount: 4 },
      { name: 'amount', type: 'number', sampleValues: [299.99, 49.50, 1200.00], nullCount: 0, uniqueCount: 18 },
      { name: 'quantity', type: 'number', sampleValues: [1, 3, 5], nullCount: 0, uniqueCount: 6 },
      { name: 'country', type: 'string', sampleValues: ['United States', 'United Kingdom', 'Germany'], nullCount: 0, uniqueCount: 5 },
      { name: 'status', type: 'string', sampleValues: ['Delivered', 'Processing', 'Shipped'], nullCount: 0, uniqueCount: 3 },
      { name: 'rating', type: 'number', sampleValues: [5, 4, 3], nullCount: 0, uniqueCount: 5 }
    ],
    rows: [
      { order_id: 'ORD-1001', category: 'Electronics', amount: 899.00, quantity: 1, country: 'United States', status: 'Delivered', rating: 5 },
      { order_id: 'ORD-1002', category: 'Apparel', amount: 145.50, quantity: 2, country: 'United Kingdom', status: 'Delivered', rating: 4 },
      { order_id: 'ORD-1003', category: 'Office Supplies', amount: 89.20, quantity: 4, country: 'Germany', status: 'Delivered', rating: 5 },
      { order_id: 'ORD-1004', category: 'Electronics', amount: 1299.00, quantity: 1, country: 'United States', status: 'Shipped', rating: 5 },
      { order_id: 'ORD-1005', category: 'Home & Kitchen', amount: 210.00, quantity: 3, country: 'Canada', status: 'Processing', rating: 4 },
      { order_id: 'ORD-1006', category: 'Electronics', amount: 450.00, quantity: 2, country: 'France', status: 'Delivered', rating: 4 },
      { order_id: 'ORD-1007', category: 'Apparel', amount: 78.00, quantity: 1, country: 'United States', status: 'Delivered', rating: 5 },
      { order_id: 'ORD-1008', category: 'Office Supplies', amount: 320.00, quantity: 10, country: 'United States', status: 'Delivered', rating: 5 }
    ]
  }
];

const LOCAL_STORAGE_KEY = 'askmydata_user_datasets_v1';

export class RealtimeDataStore {
  // Helper to infer column primitive types
  private static inferType(value: any): 'string' | 'number' | 'date' | 'boolean' {
    if (value === null || value === undefined || value === '') return 'string';
    if (typeof value === 'boolean' || value === 'true' || value === 'false') return 'boolean';
    if (!isNaN(Number(value)) && String(value).trim() !== '') return 'number';
    if (!isNaN(Date.parse(value)) && String(value).length > 6 && (value.includes('-') || value.includes('/') || value.includes(':'))) return 'date';
    return 'string';
  }

  // Parse raw CSV string or File into RealtimeDataset object
  public static async parseCSVFile(file: File): Promise<RealtimeDataset> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            const rawRows = results.data as Record<string, any>[];
            if (!rawRows || rawRows.length === 0) {
              throw new Error('CSV file is empty or missing headers.');
            }

            const sampleRow = rawRows[0];
            const colNames = Object.keys(sampleRow);

            const columns: ColumnMetadata[] = colNames.map((colName) => {
              const values = rawRows.map((r) => r[colName]);
              const nonNullValues = values.filter((v) => v !== null && v !== undefined && v !== '');
              const inferredType = nonNullValues.length > 0 ? this.inferType(nonNullValues[0]) : 'string';
              const uniqueValues = new Set(nonNullValues);

              return {
                name: colName,
                type: inferredType,
                sampleValues: nonNullValues.slice(0, 3),
                nullCount: values.length - nonNullValues.length,
                uniqueCount: uniqueValues.size
              };
            });

            // Calculate health score (0-100 based on completeness)
            const totalCells = rawRows.length * colNames.length;
            const totalNulls = columns.reduce((acc, c) => acc + c.nullCount, 0);
            const healthScore = Math.max(70, Math.min(100, Math.round(((totalCells - totalNulls) / totalCells) * 100)));

            const dataset: RealtimeDataset = {
              id: `ds-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
              name: file.name.replace(/\.[^/.]+$/, ''),
              description: `Uploaded on ${new Date().toLocaleDateString()} (${rawRows.length} rows, ${colNames.length} columns)`,
              source: file.name.endsWith('.json') ? 'JSON Upload' : 'CSV Upload',
              rowCount: rawRows.length,
              colCount: colNames.length,
              healthScore,
              columns,
              rows: rawRows,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };

            resolve(dataset);
          } catch (err: any) {
            reject(err);
          }
        },
        error: (error) => reject(error)
      });
    });
  }

  // Get all active user datasets (from localStorage & active memory)
  public static getDatasets(): RealtimeDataset[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) return [];
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to load datasets from localStorage', e);
      return [];
    }
  }

  // Save a dataset
  public static saveDataset(dataset: RealtimeDataset): RealtimeDataset[] {
    const existing = this.getDatasets();
    const updated = [dataset, ...existing.filter((d) => d.id !== dataset.id)];
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    // Asynchronously try to sync to Supabase if session exists
    this.syncToSupabase(dataset).catch((err) => {
      console.log('Supabase sync skipped/deferred (guest mode):', err);
    });
    return updated;
  }

  // Delete a dataset
  public static deleteDataset(datasetId: string): RealtimeDataset[] {
    const existing = this.getDatasets();
    const updated = existing.filter((d) => d.id !== datasetId);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return updated;
  }

  // Get single dataset by ID
  public static getDatasetById(datasetId: string): RealtimeDataset | null {
    // Check custom user datasets
    const userDatasets = this.getDatasets();
    const foundUser = userDatasets.find((d) => d.id === datasetId);
    if (foundUser) return foundUser;

    // Check sample datasets
    const foundSample = SAMPLE_DATASETS.find((d) => d.id === datasetId);
    if (foundSample) return foundSample;

    return null;
  }

  // Optional Supabase sync for authenticated users
  public static async syncToSupabase(dataset: RealtimeDataset): Promise<void> {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      await supabase.from('datasets').upsert({
        id: dataset.id,
        user_id: session.user.id,
        name: dataset.name,
        description: dataset.description,
        source: dataset.source,
        row_count: dataset.rowCount,
        col_count: dataset.colCount,
        health_score: dataset.healthScore,
        columns: dataset.columns,
        sample_rows: dataset.rows.slice(0, 100),
        updated_at: new Date().toISOString()
      });
    } catch (e) {
      // Non-blocking for guest access
    }
  }
}
