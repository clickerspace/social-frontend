<script setup lang="ts">
const emit = defineEmits(["update:key"]);
</script>
<template>
  <PhoneLayout title="Contacts" @update:key="emit('update:key')"
    >contact</PhoneLayout
  >
</template>
