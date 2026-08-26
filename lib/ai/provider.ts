// AI Provider Abstraction Interface

export interface AIAnalysisRequest {
  prompt: string;
  workspaceId: string;
  userRole?: string;
  currentDatasetId?: string;
  investigationId?: string;
  conversationHistory?: Array<{ role: 'user' | 'model'; content: string }>;
  explanationLevel?: 'simple' | 'detailed' | 'technical';
}

export interface AIAnalysisResponse {
  answer: string;
  intentType: 'descriptive' | 'diagnostic' | 'comparative' | 'exploratory' | 'statistical' | 'predictive' | 'prescriptive';
  evidence: {
    level: 'Verified' | 'Strong evidence' | 'Limited evidence' | 'Exploratory';
    metricsUsed: string[];
    datasetsReferenced: string[];
    sqlQueryExecuted?: string;
    limitations?: string[];
  };
  chartSpec?: {
    type: 'kpi' | 'line' | 'bar' | 'area' | 'scatter' | 'donut';
    title: string;
    description?: string;
    data: any[];
    xAxisKey?: string;
    yAxisKeys?: string[];
    unit?: string;
  };
  suggestedFollowUps: string[];
  investigationStep?: {
    title: string;
    finding: string;
  };
}

export interface AIProvider {
  name: string;
  analyze(request: AIAnalysisRequest): Promise<AIAnalysisResponse>;
}
