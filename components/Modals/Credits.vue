<script setup>
const isOpen = defineModel("isOpen", { type: Boolean });
</script>

<template>
  <UModal
    v-model="isOpen"
    :ui="{
      container: 'items-center !shadow-none',
      width: 'w-full',
      background: '!bg-transparent',
      shadow: '!shadow-none',
      inner: 'hide-scrollbar overflow-x-hidden w-max-screen select-none',
    }"
    fullscreen
  >
    <div class="hide-scrollbar relative w-full max-w-xl">
      <UIcon
        @click="isOpen = false"
        name="material-symbols-light:close-rounded"
        size="24"
        class="absolute right-5 top-5 z-20 cursor-pointer"
      />
      <div
        class="hide-scrollbar relative animate-scrollCredits select-none space-y-6 py-44 text-center !text-white ease-linear"
      >
        <div>
          <h2 class="text-2xl font-semibold">CO CEO & CTO</h2>
          <p class="text-lg">Faruk ARIGUN</p>
        </div>
        <div>
          <h2 class="text-2xl font-semibold">CO CEO</h2>
          <ul class="list-none space-y-1">
            <li>Umurcan GORUR</li>
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-semibold">Lead Developer</h2>
          <ul class="list-none space-y-1">
            <li>Batihan OZDEMIR</li>
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-semibold">Frontend Developers</h2>
          <ul class="list-none space-y-1">
            <li>Furkan AVCI</li>
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-semibold">Backend Developers</h2>
          <ul class="list-none space-y-1">
            <li>Erol Umut ATALAY</li>
            <li>Ugur Can CELIKEL</li>
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-semibold">Head of Design</h2>
          <p class="text-lg">Atilla GUNES</p>
        </div>
      </div>
    </div>
  </UModal>
</template>

<style scoped>
@keyframes scrollCredits {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>
