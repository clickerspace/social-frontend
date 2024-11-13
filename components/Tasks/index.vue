<script setup lang="ts">
const emit = defineEmits(["update:key"]);
</script>
<template>
  <PhoneLayout title="Tasks" @update:key="emit('update:key')">
    <TasksCard v-for="item in 5" :key="item" />
  </PhoneLayout>
</template>
