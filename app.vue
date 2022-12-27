<template>
  <div class="text-center mx-auto max-w-lg bg-gray-100 py-4 rounded-xl">
    <div>
      <div class="mb-2">
        <span class="mx-2">Цена закупки</span>
        <span class="mx-2">Цена продажи</span>
      </div>
      <input
        class="p-2 mx-2 bg-white border-0 rounded text-base outline-none text-gray-700"
        type="text"
        v-model="purchaseCost"
      />
      <input
        class="p-2 mx-2 bg-white border-0 rounded text-base outline-none text-gray-700"
        type="text"
        v-model="salePrice"
      />
    </div>

    <div class="my-4">
      <div class="" >
        <span class="mx-2">Спрос</span>
        <span class="mx-2">Вероятность</span>
      </div>
      <div
        class="align-center group my-2"
        v-for="(demandProbability, index) in demand"
        :key="index"
      >
        <span>
          <input
            type="text"
            class="p-2 mx-2 bg-white border-0 rounded text-base outline-none text-gray-700"
            v-model="demandProbability.demand"
          />
        </span>
        <span>
          <input
            type="text"
            class="p-2 mx-2 bg-white border-0 rounded text-base outline-none text-gray-700"
            max="1"
            v-model="demandProbability.probability"
          />
        </span>
        <span>
          <remove-icon
            v-if="canRemoveDemand"
            @click="removeDemandByIndex(index)"
            title="Удалить требование"
            class="absolute group-hover:visible hover:text-gray-500 invisible text-gray-300"
          />
        </span>
      </div>
      <div>
        <plus-icon
          class="text-gray-300 duration-200 hover:text-gray-500"
          @click="addDemand"
        />
        <!-- <button @click="addDemand">Добавить требование</button> -->
      </div>
    </div>

    <div>

      <div class="pt-4">
        <button
          @click="enterExample"
          class="bg-gray-300 text-white hover:bg-gray-400 duration-200 border-0 rounded p-2 px-4"
        >
          Ввести пример
        </button>
      </div>
    </div>
    <div class="mt-4 text-left">
      <div class="mx-10" v-if="solution">
        <div v-for="(item, idx) in solution">
          <div
            :class="{
              'bg-gray-200':
                highestProb === item2 * demand[idx - 1].probability,
            }"
            v-for="(item2, index) in item"
          >
            <span>
              D<sub class="font-bold"> {{ idx }}{{ index }} </sub> =
            </span>
            <span> {{ item2 }} </span>
            <span class="text-gray-500">
              <span class="text-red-500"> * </span>
              {{ demand[idx - 1].probability }} =
              {{ item2 * demand[idx - 1].probability }}</span
            >
          </div>
        </div>

        <!-- <div>
          {{ solution }}

        </div> -->
        <div class="my-4" >
          <div
            class="mb-4 flex border-dashed border-b-1 border-0 justify-between"
          >
            <span>Оптимальное количество закупок: </span>
            <span>{{ answer }}</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DemandProbability } from "./scripts/optimal";
import { calculateProfitMatrix } from "./scripts/k";

const salePrice = ref<number>(0);
const purchaseCost = ref<number>(0);

// let demandProbabilities = [
//   { demand: 7, probability: 0.2 },
//   { demand: 8, probability: 0.2 },
//   { demand: 9, probability: 0.5 },
//   { demand: 10, probability: 0.1 }
// ];

const enterExample = () => {
  purchaseCost.value = 85;
  salePrice.value = 150;
  demand.value = [
    { demand: 7, probability: 0.2 },
    { demand: 8, probability: 0.3 },
    { demand: 9, probability: 0.3 },
    { demand: 10, probability: 0.2 },
  ];
};

const result = ref<Record<number, number>>({});

const answer = computed(() => {
  // find result's key by its value
  const key = Object.keys(result.value).find(
    (key) => result.value[Number(key)] === highestProb.value
  );
  return key;
});


const highestProb = computed(() => {
  if (solution.value) {
    const arr: number[] = [];

    Object.entries(solution.value).forEach(([key, value]) => {
      const p = demand.value[Number(key) - 1].probability;
      arr.push(value[Number(key)] * p);
      result.value[demand.value[Number(key) - 1].demand] =
        value[Number(key)] * p;
    });
    return Math.max(...arr);
  }
});

const solution = computed(() => {
  if (salePrice.value && purchaseCost.value) {
    return calculateProfitMatrix(
      demand.value,
      purchaseCost.value,
      salePrice.value
    );
  }
  return null;
});

const addDemand = () => {
  demand.value.push({
    demand: 0,
    probability: 0,
  });
};

useHead({
  title: "Оптимальное количество закупок",
});

const removeDemandByIndex = (index: number) => {
  if (canRemoveDemand.value) {
    demand.value.splice(index, 1);
  }
};

const canRemoveDemand = computed(() => {
  return demand.value.length > 1;
});

const demand = ref<DemandProbability[]>([
  {
    demand: 0,
    probability: 0.1,
  },
]);
</script>
