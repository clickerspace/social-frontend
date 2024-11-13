<script setup lang="ts">
const emit = defineEmits(["update:key"]);
const requests = [
  {
    name: "John Doe",
    avatar: "/avatar/avatar1.png",
    buttonText: "ADD",
  },
  {
    name: "Jane Doe",
    avatar: "/avatar/avatar3.png",
    buttonText: "ADD",
  },
  {
    name: "Astroid Destroyer",
    avatar: "/avatar/avatar2.png",
    buttonText: "HELP",
  },
];

const addFriend = () => {
  console.log("add friend");
};
</script>
<template>
  <PhoneLayout title="Requests" @update:key="emit('update:key')">
    <div class="flex h-full w-full flex-col justify-between gap-4 pb-12">
      <div
        class="hide-scrollbar flex h-[calc(100dvh-260px)] flex-col gap-3 overflow-y-scroll"
      >
        <ContactsCard
          v-for="item in requests"
          :key="item.name"
          :avatar="item.avatar"
          :name="item.name"
          :buttonText="item.buttonText"
          @handle-click="addFriend()"
        />
      </div>
      <RequestsSeekHelp />
    </div>
  </PhoneLayout>
</template>
