<script setup lang="ts">
const emit = defineEmits(["handleClick"]);

export interface Props {
  avatar?: string;
  buttonText?: string;
  name?: string;
  type?: string;
}
const { avatar, buttonText, name } = defineProps<Props>();
const clicked = ref(false);

const handleClick = () => {
  if (!clicked.value) {
    clicked.value = true;
    emit("handleClick");
  }

  setTimeout(() => {
    clicked.value = false;
  }, 1000);
};
</script>
<template>
  <div class="radial-bg">
    <div
      class="flex w-full cursor-pointer select-none items-center justify-between p-2"
    >
      <div class="flex items-center gap-2">
        <img :src="avatar" :alt="name" />
        <div class="flex flex-col gap-1">
          <span class="font-sm font-semibold">{{ name }}</span>
        </div>
      </div>
      <button
        @click="handleClick()"
        v-if="type === 'friendRequest'"
        class="flex w-20 items-center justify-center rounded-md bg-social-red-100 p-2"
      >
        <UIcon v-if="clicked" name="svg-spinners:180-ring-with-bg" size="20" />
        <span v-else>
          {{ buttonText }}
        </span>
      </button>
      <button
        @click="handleClick()"
        v-if="buttonText"
        class="flex w-20 items-center justify-center rounded-md bg-social-purple-200 p-2"
      >
        <UIcon v-if="clicked" name="svg-spinners:180-ring-with-bg" size="20" />
        <span v-else>
          {{ buttonText }}
        </span>
      </button>
    </div>
  </div>
</template>
