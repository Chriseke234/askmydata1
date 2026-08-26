// Northstar Commerce - Fictional Business Demo Dataset

export interface NorthstarCustomer {
  customer_id: string;
  name: string;
  email: string;
  region: 'North America' | 'Europe' | 'Asia-Pacific' | 'Latin America';
  segment: 'Enterprise' | 'SMB' | 'Consumer';
  ltv: number;
  signup_date: string;
  status: 'Active' | 'Churned' | 'At Risk';
}

export interface NorthstarOrder {
  order_id: string;
  customer_id: string;
  date: string;
  category: 'Electronics' | 'Apparel' | 'Home & Office' | 'Software';
  amount: number;
  quantity: number;
  region: 'North America' | 'Europe' | 'Asia-Pacific' | 'Latin America';
  status: 'Completed' | 'Refunded' | 'Pending';
}

export interface NorthstarProduct {
  product_id: string;
  name: string;
  category: 'Electronics' | 'Apparel' | 'Home & Office' | 'Software';
  price: number;
  unit_cost: number;
  stock_level: number;
  growth_rate_yoy: number;
}

export interface NorthstarMarketing {
  date: string;
  channel: 'Google Ads' | 'Meta' | 'Email Newsletter' | 'Organic Search' | 'LinkedIn';
  spend: number;
  conversions: number;
  revenue_attributed: number;
  roas: number;
}

export interface NorthstarSupportTicket {
  ticket_id: string;
  customer_id: string;
  category: 'Billing' | 'Product Issue' | 'Shipping Delay' | 'Feature Request';
  csat_score: number; // 1-5
  resolution_hours: number;
  date: string;
}

export const NORTHSTAR_CUSTOMERS: NorthstarCustomer[] = [
  { customer_id: 'CUST-101', name: 'Acme Global Corp', email: 'billing@acmeglobal.com', region: 'North America', segment: 'Enterprise', ltv: 45200, signup_date: '2024-01-15', status: 'Active' },
  { customer_id: 'CUST-102', name: 'Berlin Tech Solutions', email: 'contact@berlintech.de', region: 'Europe', segment: 'Enterprise', ltv: 38900, signup_date: '2024-02-10', status: 'At Risk' },
  { customer_id: 'CUST-103', name: 'Tokyo Retail KK', email: 'orders@tokyoretail.jp', region: 'Asia-Pacific', segment: 'Enterprise', ltv: 52100, signup_date: '2023-11-04', status: 'Active' },
  { customer_id: 'CUST-104', name: 'Paris Design Studio', email: 'hello@parisdesign.fr', region: 'Europe', segment: 'SMB', ltv: 12400, signup_date: '2024-03-22', status: 'Churned' },
  { customer_id: 'CUST-105', name: 'Austin Innovations', email: 'sales@austininno.io', region: 'North America', segment: 'SMB', ltv: 18700, signup_date: '2024-04-18', status: 'Active' },
  { customer_id: 'CUST-106', name: 'London Financial Ltd', email: 'ops@londonfin.co.uk', region: 'Europe', segment: 'Enterprise', ltv: 61000, signup_date: '2023-09-12', status: 'At Risk' },
  { customer_id: 'CUST-107', name: 'São Paulo Logistics', email: 'contato@saopaulolog.br', region: 'Latin America', segment: 'SMB', ltv: 9800, signup_date: '2024-05-01', status: 'Active' },
  { customer_id: 'CUST-108', name: 'Sydney Digital', email: 'info@sydneydigital.au', region: 'Asia-Pacific', segment: 'SMB', ltv: 15400, signup_date: '2024-01-30', status: 'Active' },
  { customer_id: 'CUST-109', name: 'Toronto Cloud Inc', email: 'admin@torontocloud.ca', region: 'North America', segment: 'Enterprise', ltv: 48000, signup_date: '2023-12-05', status: 'Active' },
  { customer_id: 'CUST-110', name: 'Madrid Commerce', email: 'ventas@madridcommerce.es', region: 'Europe', segment: 'SMB', ltv: 11200, signup_date: '2024-06-14', status: 'Churned' },
];

export const NORTHSTAR_PRODUCTS: NorthstarProduct[] = [
  { product_id: 'PROD-01', name: 'Enterprise Analytics Suite', category: 'Software', price: 2999, unit_cost: 300, stock_level: 9999, growth_rate_yoy: 34.2 },
  { product_id: 'PROD-02', name: 'Smart IoT Workstation Hub', category: 'Electronics', price: 899, unit_cost: 450, stock_level: 140, growth_rate_yoy: -14.5 },
  { product_id: 'PROD-03', name: 'Ergonomic Desk Pro', category: 'Home & Office', price: 650, unit_cost: 220, stock_level: 320, growth_rate_yoy: 28.6 },
  { product_id: 'PROD-04', name: 'Executive Noise-Canceling Headset', category: 'Electronics', price: 349, unit_cost: 110, stock_level: 85, growth_rate_yoy: -8.2 },
  { product_id: 'PROD-05', name: 'Data Pro Wireless Keyboard', category: 'Home & Office', price: 179, unit_cost: 45, stock_level: 520, growth_rate_yoy: 19.4 },
];

export const NORTHSTAR_SUMMARY_METRICS = {
  monthly_revenue: 485200,
  revenue_change_mom: -11.8,
  total_orders: 1420,
  orders_change_mom: -9.4,
  average_order_value: 341.69,
  aov_change_mom: -2.6,
  active_customers: 840,
  customer_churn_rate: 4.2,
  top_declining_region: 'Europe (-22.4% drop in Electronics)',
  top_growing_category: 'Home & Office (+24.1% YoY)',
};

export const NORTHSTAR_REVENUE_TREND = [
  { month: 'Mar 2026', NorthAmerica: 180000, Europe: 165000, AsiaPacific: 95000, LatinAmerica: 45000 },
  { month: 'Apr 2026', NorthAmerica: 185000, Europe: 162000, AsiaPacific: 98000, LatinAmerica: 47000 },
  { month: 'May 2026', NorthAmerica: 192000, Europe: 158000, AsiaPacific: 102000, LatinAmerica: 46000 },
  { month: 'Jun 2026', NorthAmerica: 195000, Europe: 145000, AsiaPacific: 108000, LatinAmerica: 48000 },
  { month: 'Jul 2026', NorthAmerica: 201000, Europe: 135000, AsiaPacific: 112000, LatinAmerica: 50000 },
  { month: 'Aug 2026', NorthAmerica: 208000, Europe: 128000, AsiaPacific: 115000, LatinAmerica: 52000 },
];
