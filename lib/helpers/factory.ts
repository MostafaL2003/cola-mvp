import { factoriesData } from "@/lib/data";
import { FactoryData, LineData } from "@/types/mes";

export function getAllFactories(): FactoryData[] {
  return factoriesData;
}

export function getFactoryById(id: string): FactoryData | undefined {
  return factoriesData.find((f) => f.id.toLowerCase() === id.toLowerCase());
}

export function getLineById(
  factoryId: string,
  lineId: string,
): LineData | undefined {
  const factory = getFactoryById(factoryId);
  if (!factory) return undefined;
  return factory.lines.find((l) => l.id.toLowerCase() === lineId.toLowerCase());
}
