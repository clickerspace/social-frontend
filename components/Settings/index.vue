<script setup lang="ts">
import { modalStore } from "~/store/modalStore";
import { userStore } from "~/store/user";
import { storeToRefs } from "pinia";
import { fxHandler } from "~/composables/fxHandler";

const emit = defineEmits(["update:key"]);
const user = userStore();
const { fxController } = fxHandler();

const { soundFxOn, musicOn, soundFxLevel, musicLevel, vibration, connected } =
  storeToRefs(user);
const credistModal = ref(false);
const startCredits = () => {
  credistModal.value = !credistModal.value;
};
</script>
<template>
  <ModalsCredits v-model:is-open="credistModal" />
  <PhoneLayout title="Settings" @update:key="emit('update:key')">
    <button
      class="settings-button h-10"
      @click="modalStore().setTutorialModal(true)"
    >
      Tutorial
    </button>
    <button class="settings-button h-10" @click="startCredits()">
      Credits
    </button>
    <button class="settings-button h-10">Watch Story</button>

    <SettingsToggleSlider
      title="music"
      v-model:toggle="musicOn"
      v-model:slider="musicLevel"
      :toggleFunction="(v) => fxController?.toggleMusic(v)"
      :sliderFunction="(v) => fxController?.setMusicLevel(v)"
    />
  </PhoneLayout>
</template>
<style>
.settings-button {
  border-radius: 6px;
  border: 1px solid #702f9b;
  background: radial-gradient(
    169.72% 89.02% at 80.91% -10.53%,
    rgba(175, 119, 184, 0.5) 0%,
    rgba(66, 0, 124, 0.5) 100%
  );
  backdrop-filter: blur(10px);
}
</style>
