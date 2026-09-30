export function formatProductionNumber(num: number): string {
  if (num >= 1_000_000) {
    const val = num / 1_000_000;
    return `${Number.isInteger(val) ? val : val.toFixed(1)}M`;
  }
  if (num >= 1_000) {
    const val = num / 1_000;
    return `${Number.isInteger(val) ? val : val.toFixed(1)}K`;
  }
  return num.toLocaleString();
}

export function formatActiveLinesRatio(
  ratio: { active: number; total: number } | string | number,
): string {
  if (
    typeof ratio === "object" &&
    ratio !== null &&
    "active" in ratio &&
    "total" in ratio
  ) {
    return `${ratio.active}:${ratio.total}`;
  }
  return String(ratio);
}

export function formatQualityDisplay(quality: number): string {
  if (quality <= 100) {
    return `${quality}%`;
  }
  return quality.toLocaleString();
}
