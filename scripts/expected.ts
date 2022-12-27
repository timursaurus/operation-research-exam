const demandProbabilities = [0.2, 0.2, 0.5, 0.1];
const demand = [7, 8, 9, 10];
const purchasePrice = 70;
const salePrice = 110;

// Рассчитываем ожидаемую прибыль

// Рассчитываем ожидаемую прибыль для каждого количества бидонов сметаны
let expectedProfit = 0;
for (let i = 0; i < demandProbabilities.length; i++) {
  expectedProfit += demandProbabilities[i] * (salePrice - purchasePrice) * demand[i];
}


