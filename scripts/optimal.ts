export interface DemandProbability {
  demand: number;
  probability: number;
}

export function calculateOptimalPurchase(
  demandProbabilities: DemandProbability[],
  purchaseCost: number,
  salePrice: number
): { optimalPurchase: number; expectedValue: number } {
  // Рассчитываем ожидаемую стоимость продажи сметаны
  let expectedSaleValue = 0;
  for (let demand of demandProbabilities) {
    expectedSaleValue += demand.probability * (salePrice - purchaseCost);
  }

  // Рассчитываем, сколько бидонов сметаны следует закупить
  let optimalPurchase = Math.ceil(expectedSaleValue / purchaseCost);

  // Рассчитываем ожидаемую стоимостную ценность решения
  let expectedValue = expectedSaleValue - optimalPurchase * purchaseCost;

  return {
    optimalPurchase,
    expectedValue,
  };
}
