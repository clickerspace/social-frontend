<script setup lang="ts">
import debounce from "lodash/debounce";
interface Props {
  title: string;
  toggleFunction?: (value: boolean) => void;
  sliderFunction?: (value: number) => void;
}
const props = withDefaults(defineProps<Props>(), {
  title: "title",
  toggleFunction: () => {},
  sliderFunction: () => {},
});

const debouncedToggle = debounce((value: boolean) => {
  props.toggleFunction(value);
}, 300);

const debouncedSlider = debounce((value: number) => {
  props.sliderFunction(value);
}, 300);

const toggle = defineModel<boolean>("toggle", { default: undefined });
const slider = defineModel<number>("slider", { default: undefined });
</script>
<template>
  <div
    class="bg-cbrown-400 flex w-full items-center justify-between rounded-md px-4 py-3 font-roboto"
  >
    <span
      class="text-cbrown-100 shrink-0 grow-0 basis-1/4 font-black capitalize"
      >{{ title }}</span
    >

    <URange
      :ui="{
        progress: {
          base: ' overflow-hidden ',
          background: 'bg-white dark:bg-white ',
        },
        thumb: {
          background:
            '[&::-webkit-slider-thumb]:bg-transparent [&::-webkit-slider-thumb]:dark:bg-transparent [&::-moz-range-thumb]:bg-transparent',
          ring: '[&::-webkit-slider-thumb]:ring-0 ',
        },
        track: {
          background:
            '[&::-webkit-slider-runnable-track]:bg-[#656565] [&::-moz-range-track]:bg-[#656565] [&::-webkit-slider-runnable-track]:dark:bg-[#656565] [&::-moz-range-track]:dark:bg-[#656565]',
        },
      }"
      v-if="slider !== undefined"
      class="shrink-0 grow-0 basis-1/2"
      :class="toggle ? 'brightness-100' : 'brightness-50'"
      size="lg"
      v-model="slider"
      :disabled="!toggle"
      @change="debouncedSlider(slider)"
    />

    <div class="flex grow-0 basis-1/4">
      <UToggle
        :ui="{
          active: 'bg-[#7C6F8850] dark:bg-[#7C6F8850] border border-[#9285AC]',
          inactive:
            'bg-[#7C6F8850] dark:bg-[#7C6F8850] border border-[#656565]',
          container: {
            base: 'pointer-events-none relative inline-block rounded-full  shadow transform ring-0 transition ease-in-out duration-200 translate-y-[1px]',
            inactive: '!bg-[#858585] dark:!bg-[#858585]',
            active: {
              md: '!bg-white dark:!bg-white',
            },
          },
        }"
        size="md"
        class="ml-auto"
        v-if="toggle !== undefined"
        v-model="toggle"
        @change="debouncedToggle(!toggle)"
      />
    </div>
    <!-- music level -->
  </div>
</template>
