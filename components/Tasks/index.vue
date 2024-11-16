<script setup lang="ts">
import { userStore } from "~/store/user";
import { storeToRefs } from "pinia";
const { getTasks } = userStore();
const { tasks } = storeToRefs(userStore());
const emit = defineEmits(["update:key"]);
onMounted(async () => {
  await getTasks();
});
</script>
<template>
  <PhoneLayout title="Tasks" @update:key="emit('update:key')">
    <TasksCard v-for="item in tasks" :key="item" :task="item" />
  </PhoneLayout>
</template>
