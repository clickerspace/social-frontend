<script setup lang="ts">
const emit = defineEmits(["mounted"]);
onMounted(() => {
  nextTick(() => {
    emit("mounted");
  });
});
</script>
<template>
  <div>story</div>
</template>
