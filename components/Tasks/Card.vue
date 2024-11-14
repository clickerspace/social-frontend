<script setup lang="ts">
const status = ref(3);
</script>
<template>
  <div
    class="radial-bg flex w-full items-center justify-between p-3"
    :class="
      status === 1
        ? 'radial-bg'
        : status === 2
          ? '!border !border-black'
          : 'radial-bg-disabled'
    "
  >
    <div class="flex items-center gap-2">
      <UIcon name="tabler:user-up" size="48" class="text-social-purple-100" />
      <div class="flex flex-col gap-1">
        <span>Daily Login</span>
        <div class="flex items-center">
          <img src="/icons/energy-icon-white.svg" class="size-4" />
          <span class="text-xs">+10</span>
        </div>
      </div>
    </div>
    <UIcon
      :name="
        status === 1
          ? 'iconoir:page-right'
          : status === 2
            ? 'line-md:uploading'
            : 'simple-line-icons:check'
      "
      size="36"
      :class="
        status === 1
          ? 'text-social-purple-100'
          : status === 2
            ? 'text-black'
            : 'text-social-purple-300'
      "
    />
  </div>
</template>
