<script setup lang="ts">
const emit = defineEmits(["update:key"]);
</script>
<template>
  <PhoneLayout title="Tasks" @update:key="emit('update:key')"
    >request</PhoneLayout
  >
</template>
