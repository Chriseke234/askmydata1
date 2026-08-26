// Controlled Tool Definitions for Gemini AI Function Calling

export const ASKMYDATA_TOOLS = [
  {
    name: 'get_dataset_schema',
    description: 'Retrieves dataset column schemas, types, null rates, and distribution stats.',
    parameters: {
      type: 'OBJECT',
      properties: {
        dataset_name: { type: 'STRING', description: 'Name of the dataset to inspect (e.g. orders, customers, products)' }
      },
      required: ['dataset_name']
    }
  },
  {
    name: 'run_readonly_query',
    description: 'Executes controlled read-only statistical aggregation over a dataset.',
    parameters: {
      type: 'OBJECT',
      properties: {
        dataset_name: { type: 'STRING' },
        group_by: { type: 'STRING' },
        metric: { type: 'STRING', description: 'revenue, orders, ltv, etc.' },
        filter_region: { type: 'STRING' },
        time_period: { type: 'STRING' }
      },
      required: ['dataset_name', 'metric']
    }
  },
  {
    name: 'calculate_statistics',
    description: 'Calculates mean, percentage changes, YoY trends, or variance for key metrics.',
    parameters: {
      type: 'OBJECT',
      properties: {
        metric_name: { type: 'STRING' },
        current_value: { type: 'NUMBER' },
        previous_value: { type: 'NUMBER' }
      },
      required: ['metric_name', 'current_value', 'previous_value']
    }
  },
  {
    name: 'create_visualization_spec',
    description: 'Generates chart visualization specification for rendering in Recharts.',
    parameters: {
      type: 'OBJECT',
      properties: {
        chart_type: { type: 'STRING', enum: ['kpi', 'line', 'bar', 'area', 'scatter', 'donut'] },
        title: { type: 'STRING' },
        x_axis: { type: 'STRING' },
        y_axis: { type: 'STRING' }
      },
      required: ['chart_type', 'title']
    }
  }
];

export async function executeToolCall(name: string, args: Record<string, any>) {
  switch (name) {
    case 'get_dataset_schema':
      return {
        status: 'success',
        columns: [
          { name: 'date', type: 'date', null_rate: 0.0 },
          { name: 'region', type: 'categorical', distinct: 4 },
          { name: 'category', type: 'categorical', distinct: 4 },
          { name: 'amount', type: 'currency', min: 10, max: 2999 },
          { name: 'quantity', type: 'numeric', min: 1, max: 50 }
        ]
      };
    case 'run_readonly_query':
      return {
        status: 'success',
        summary: `Query executed on ${args.dataset_name}. Metric: ${args.metric}. Filter: ${args.filter_region || 'All regions'}.`,
        result: [
          { region: 'North America', value: 208000, change: '+3.5%' },
          { region: 'Europe', value: 128000, change: '-22.4%' },
          { region: 'Asia-Pacific', value: 115000, change: '+5.2%' },
          { region: 'Latin America', value: 52000, change: '+4.0%' }
        ]
      };
    case 'calculate_statistics':
      const diff = args.current_value - args.previous_value;
      const pctChange = ((diff / args.previous_value) * 100).toFixed(1);
      return {
        metric: args.metric_name,
        difference: diff,
        percentage_change: `${pctChange}%`,
        direction: diff < 0 ? 'decline' : 'growth'
      };
    default:
      return { status: 'executed', result: 'OK' };
  }
}
