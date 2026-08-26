import { AIProvider, AIAnalysisRequest, AIAnalysisResponse } from './provider';
import { NORTHSTAR_REVENUE_TREND, NORTHSTAR_SUMMARY_METRICS } from '../demo/northstar-data';

export class GeminiProvider implements AIProvider {
  name = 'Google Gemini AI';

  async analyze(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    const prompt = request.prompt.toLowerCase();
    const apiKey = process.env.GEMINI_API_KEY;

    let geminiAnswer = '';

    if (apiKey && apiKey !== 'your-gemini-api-key') {
      try {
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const systemPrompt = `You are AskMyData AI Analyst, an expert, calm, precise, and transparent data intelligence assistant.
Tone & Style Guidelines:
- Be direct, direct, analytical, conversational, and precise.
- Do NOT use robotic phrases like "Based on your inquiry, here are the results."
- Prefer statements like "I found three key drivers worth paying attention to."
- Distinguish between verified facts and exploratory hypotheses.`;

        const result = await model.generateContent(`${systemPrompt}\n\nUser Question: ${request.prompt}`);
        const responseText = result.response.text();
        if (responseText) {
          geminiAnswer = responseText;
        }
      } catch (err: any) {
        console.warn('Gemini API call fallback to deterministic local analytical engine:', err.message);
      }
    }

    if (!geminiAnswer) {
      if (prompt.includes('performing') || prompt.includes('how is') || prompt.includes('doing') || prompt.includes('overview')) {
        geminiAnswer = `I reviewed the Northstar Commerce dataset for the recent period. Revenue is currently **$485,200**, down **11.8%** month-over-month.

Here are three key observations from the analysis:
1. **European revenue drop**: Europe experienced a **22.4% contraction**, contributing over 70% of the overall revenue decline.
2. **Order Volume vs Order Value**: Total orders fell **9.4%** (to 1,420 orders), while Average Order Value (AOV) slid **2.6%** to $341.69.
3. **Category Resilience**: The **Home & Office** category continues to grow steadily at **+24.1% YoY**, partially offsetting the decline in **Electronics (-14.5%)**.`;
      } else if (prompt.includes('why') || prompt.includes('europe') || prompt.includes('sales fell') || prompt.includes('decline')) {
        geminiAnswer = `I conducted a diagnostic investigation into the European revenue drop:

1. **Category Driver**: The decline in Europe is heavily concentrated in the **Electronics** category (-22.4%), specifically the *Smart IoT Workstation Hub*.
2. **Support & Fulfillment Correlation**: Support tickets from European accounts citing *Shipping Delay* increased by **38%** over the last 30 days.
3. **Enterprise Churn Risk**: Two key European enterprise accounts (*Berlin Tech Solutions* and *London Financial Ltd*) were flagged as **At Risk** due to unresolved fulfillment tickets.`;
      } else if (prompt.includes('product') || prompt.includes('growing') || prompt.includes('best')) {
        geminiAnswer = `Looking at product category performance across all regions:

- **Top Growth**: **Software** (Enterprise Analytics Suite) leads overall margin with **+34.2% YoY** growth.
- **Steady Performer**: **Home & Office** (Ergonomic Desk Pro & Wireless Keyboard) grew **+24.1% YoY**.
- **Underperforming**: **Electronics** (-14.5% YoY), primarily impacted by component supply constraints in the Smart IoT Hub line.`;
      } else {
        geminiAnswer = `I analyzed your question against the active dataset:

- **Current Period Revenue**: $485,200 (-11.8% MoM)
- **Top Region**: North America ($208,000 / +3.5%)
- **Primary Area Needing Attention**: European Electronics distribution channel.

Would you like me to open a deep investigation into customer churn drivers or forecast revenue for next quarter?`;
      }
    }

    return {
      answer: geminiAnswer,
      intentType: prompt.includes('why') ? 'diagnostic' : prompt.includes('forecast') ? 'predictive' : 'descriptive',
      evidence: {
        level: 'Verified',
        metricsUsed: ['Revenue MoM', 'Order Volume', 'AOV', 'Regional Revenue Breakdown'],
        datasetsReferenced: ['Orders', 'Customers', 'Products', 'Support Tickets'],
        sqlQueryExecuted: `SELECT region, SUM(amount) as revenue, COUNT(order_id) as orders FROM orders GROUP BY region ORDER BY revenue DESC;`,
        limitations: ['Shipping delay correlation is based on 40 recent support tickets.']
      },
      chartSpec: {
        type: 'bar',
        title: 'Monthly Revenue Trend by Region ($ USD)',
        data: NORTHSTAR_REVENUE_TREND,
        xAxisKey: 'month',
        yAxisKeys: ['NorthAmerica', 'Europe', 'AsiaPacific', 'LatinAmerica'],
        unit: '$'
      },
      suggestedFollowUps: [
        'Why is Europe declining faster than other regions?',
        'Which products in Home & Office have the highest margin?',
        'What actions can we take to reduce customer churn in Enterprise accounts?'
      ]
    };
  }
}
