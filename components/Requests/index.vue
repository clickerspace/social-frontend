<script setup lang="ts">
const emit = defineEmits(["update:key"]);
</script>
<template>
  <PhoneLayout title="Requests" @update:key="emit('update:key')"
    >request</PhoneLayout
  >
</template>
