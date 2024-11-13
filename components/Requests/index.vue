<script setup lang="ts">
import { userStore } from "~/store/user";
import { storeToRefs } from "#build/imports";
const emit = defineEmits(["update:key"]);
const { friendshipRequests, helpList } = storeToRefs(userStore());
onMounted(async () => {
  await userStore().friendRequests();
  await userStore().getHelpRequests();
});
</script>
<template>
  <PhoneLayout title="Requests" @update:key="emit('update:key')">
    <div class="flex h-full w-full flex-col justify-between gap-4 pb-12">
      <div
        class="hide-scrollbar flex h-[calc(100dvh-260px)] flex-col gap-3 overflow-y-scroll"
      >
        <ContactsCard
          v-for="item in friendshipRequests"
          :key="item.name"
          :avatar="item.avatar"
          :name="item.name"
          :buttonText="item.buttonText"
          type="friendRequest"
          @handle-click="
            item.buttonText === 'ADD'
              ? userStore().acceptFriendRequest(item.id)
              : userStore().rejectFriendRequest(item.id)
          "
        />
        <ContactsCard
          v-for="item in helpList"
          :key="item.name + item.buttonText"
          :avatar="item.avatar"
          :name="item.name"
          :buttonText="item.buttonText"
          @handle-click="userStore().sendHelp(item.id)"
        />
      </div>
      <RequestsSeekHelp />
    </div>
  </PhoneLayout>
</template>
