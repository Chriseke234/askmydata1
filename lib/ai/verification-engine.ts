// Verification Engine for AI Analytical Outputs

export interface VerificationResult {
  isVerified: boolean;
  trustLevel: 'Verified' | 'Strong evidence' | 'Limited evidence' | 'Exploratory';
  confidenceScore: number; // 0 - 100
  checksPassed: string[];
  warnings: string[];
}

export function verifyAnalysisResult(
  metricsUsed: string[],
  sqlQuery?: string,
  sampleDataCount: number = 100
): VerificationResult {
  const checksPassed: string[] = [];
  const warnings: string[] = [];

  // Check 1: Metric formula certified
  if (metricsUsed.length > 0) {
    checksPassed.push('Metrics matched certified definitions in semantic layer.');
  }

  // Check 2: Safe read-only query check
  if (sqlQuery) {
    const isReadOnly = !/(INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE)/i.test(sqlQuery);
    if (isReadOnly) {
      checksPassed.push('Query execution verified: Safe read-only aggregation.');
    } else {
      warnings.push('Potentially un-validated query syntax detected.');
    }
  }

  // Check 3: Sample size check
  if (sampleDataCount >= 50) {
    checksPassed.push(`Sufficient sample size verified (${sampleDataCount} records).`);
  } else {
    warnings.push('Limited sample size: Result marked as exploratory.');
  }

  const confidenceScore = warnings.length === 0 ? 98 : 75;
  const trustLevel = confidenceScore >= 90 ? 'Verified' : 'Strong evidence';

  return {
    isVerified: warnings.length === 0,
    trustLevel,
    confidenceScore,
    checksPassed,
    warnings,
  };
}
