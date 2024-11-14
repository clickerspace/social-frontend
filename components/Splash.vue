<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const texts = [
  "Every decision you make will change the course of the story.",
  "Step into university life with AI-powered dynamic narratives.",
  "Shape the future of your characters through your choices.",
  "Each chapter evolves based on your decisions.",
  "Be prepared for unexpected surprises in the university world.",
  "Discover different paths and influence the storyline.",
  "A new story begins with every choice you make.",
  "Social Clicker: Your story unfolds based on your decisions.",
  "Guide the characters’ decisions and impact their lives.",
  "Explore different endings by choosing various paths.",
];

const currentTextIndex = ref(Math.floor(Math.random() * texts.length));

onMounted(() => {
  const interval = setInterval(() => {
    currentTextIndex.value = Math.floor(Math.random() * texts.length);
  }, 5000);

  onBeforeUnmount(() => {
    clearInterval(interval);
  });
});
</script>

<template>
  <div
    class="flex h-[100dvh] w-full flex-col items-center justify-around gap-5 bg-[url('@/assets/img/tutorial-bg.png')] bg-cover bg-center bg-no-repeat px-10 py-5"
  >
    <div class="flex w-full flex-col items-center gap-5">
      <img
        src="/icons/social-clicker-logo.svg"
        alt="social-clicker-logo"
        class="w-48"
      />
      <Transition name="fade" mode="out-in">
        <span class="h-24 text-center text-sm" :key="currentTextIndex">
          {{ texts[currentTextIndex] }}
        </span>
      </Transition>
    </div>
    <button
      class="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] border border-social-blue-300 bg-white text-social-blue-300"
    >
      <span>START</span>
    </button>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
