<script setup lang="ts">
const emit = defineEmits(["mounted"]);
onMounted(() => {
  nextTick(() => {
    emit("mounted");
  });
});
const bg = ref('bg-[url("@/assets/img/game-bg.png")]');
</script>
<template>
  <div
    class="flex h-[calc(100dvh+1px)] w-full select-none items-end bg-cover bg-center bg-no-repeat"
    :class="bg"
  >
    <div
      class="hide-scrollbar flex h-56 w-full flex-col gap-5 overflow-y-auto bg-gradient-to-t from-[#6ec1eb70] from-10% via-[#37679280] via-80% to-[#323c6600] p-5"
    >
      <h1 class="font-bold text-white dark:text-white">LOREM IPSUM</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. In perferendis
        aliquid nobis alias Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Dolorem natus ab saepe placeat! Facilis molestias adipisci
        accusantium inventore, ad ipsam?
      </p>
      <div class="flex w-full items-center justify-center gap-5">
        <button
          class="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] border"
          :class="
            true
              ? 'border-[#999999] text-[#999999]'
              : 'border-white text-white dark:border-white dark:text-white'
          "
        >
          <UIcon name="material-symbols:arrow-back-ios" size="20" />
          <span>BACK</span>
        </button>
        <button
          class="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] border border-social-blue-300 bg-white text-social-blue-300"
        >
          <span class="">NEXT</span>
          <UIcon name="material-symbols:arrow-forward-ios" size="20" />
        </button>
      </div>
    </div>
  </div>
</template>
<style>
.linear-bg {
  opacity: 0.96;
  background: linear-gradient(180deg, #6ec1eb 4%, #376792 14.5%, #323c66 54.1%);
  filter: blur(50px);
}
</style>
