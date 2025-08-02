// Client-side stock analysis utility for static export

export interface StockAnalysis {
  symbol: string;
  analysis: {
    sentiment: 'positive' | 'negative' | 'neutral';
    confidence: number;
    news: string;
    recommendation: string;
  };
}

export interface AnalysisResult {
  stocks: StockAnalysis[];
  timestamp: string;
  note?: string;
}

export async function analyzeStocks(stocks: string[]): Promise<AnalysisResult> {
  try {
    // Try to call n8n webhook if available (cloud or local)
    const n8nUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook-test/analyze-stocks';
    const n8nResponse = await fetch(n8nUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stocks }),
    });

    if (n8nResponse.ok) {
      const analysisResult = await n8nResponse.json();
      return {
        ...analysisResult,
        timestamp: new Date().toISOString(),
      };
    }
  } catch (error) {
    console.log('n8n not available, using mock data:', error);
  }

  // Mock data when n8n is not available
  const mockAnalysisResult: AnalysisResult = {
    stocks: stocks.map((stock: string, index: number) => ({
      symbol: stock,
      analysis: {
        sentiment: ['positive', 'negative', 'neutral'][index % 3] as 'positive' | 'negative' | 'neutral',
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
        news: [
          'Strong earnings report exceeds expectations',
          'Regulatory concerns impact market sentiment',
          'Stable performance with moderate growth outlook'
        ][index % 3],
        recommendation: [
          'Buy - Strong fundamentals and growth potential',
          'Hold - Monitor regulatory developments',
          'Hold - Stable performance expected'
        ][index % 3]
      }
    })),
    timestamp: new Date().toISOString(),
    note: 'Mock data - n8n not available'
  };

  return mockAnalysisResult;
} 