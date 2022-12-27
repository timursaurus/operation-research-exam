export interface DemandProbability {
  demand: number;
  probability: number;
}

export function calculateProfitMatrix(
  demand: DemandProbability[],
  purchasePrice: number,
  salePrice: number
) {
  const profitMatrix: Record<number, Record<number, number>> = {};
  for (let i = 0; i < demand.length; i++) {
    const demandItem = demand[i].demand;
    const purchase = demandItem * purchasePrice;
    const sale = demandItem * salePrice;
    const profit = sale - purchase;
    profitMatrix[i + 1] = { [i + 1]: profit };
  }

  return profitMatrix;
}



// console.log(calculateProfitMatrix([7, 8, 9, 10], 150, 85));

console.log(
  calculateProfitMatrix(
    [
      {
        demand: 7,
        probability: 0.2,
      },
      {
        demand: 8,
        probability: 0.3,
      },
      {
        demand: 9,
        probability: 0.3,
      },
      {
        demand: 10,
        probability: 0.2,
      },
    ],
    150,
    85
  )
);
