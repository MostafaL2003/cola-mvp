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

/**
 * Maps a percentage (0 to 100) to a color transitioning from green (0%)
 * through yellow/amber (~50%) to red (100%).
 */
export function getProgressColor(value: number): string {
  const clamped = Math.min(Math.max(Number.isFinite(value) ? value : 0, 0), 100);

  if (clamped <= 50) {
    const factor = clamped / 50;
    const r = Math.round(34 + (245 - 34) * factor);
    const g = Math.round(197 + (158 - 197) * factor);
    const b = Math.round(94 + (11 - 94) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    const factor = (clamped - 50) / 50;
    const r = Math.round(245 + (244 - 245) * factor);
    const g = Math.round(158 + (0 - 158) * factor);
    const b = Math.round(11 + (9 - 11) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

