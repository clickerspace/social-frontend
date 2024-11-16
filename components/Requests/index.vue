<script setup lang="ts">
import { userStore } from "~/store/user";
import { storeToRefs } from "#build/imports";
const emit = defineEmits(["update:key"]);
const { friendshipRequests, helpList } = storeToRefs(userStore());

const list = ref(null);
useInfiniteScroll(
  list,
  async () => {
    await getOnScroll();
  },
  {
    distance: 10,
  },
);
const switchToHelpRequests = ref(false);
const stopInf = ref(false);
const getOnScroll = async () => {
  if (stopInf.value) return;
  if (switchToHelpRequests.value) {
    const newItems = await userStore().getHelpRequests(helpList.value.length);
    if (newItems.length > 0) {
      helpList.value.push(...newItems);
    } else {
      stopInf.value = true;
    }
  } else {
    const newItems = await userStore().friendRequests(
      friendshipRequests.value.length,
    );

    if (newItems.length > 0) {
    } else {
      switchToHelpRequests.value = true;
    }
  }
};
</script>
<template>
  <PhoneLayout title="Requests" @update:key="emit('update:key')">
    <div class="flex h-full w-full flex-col justify-between gap-4 pb-12">
      <div
        ref="list"
        class="hide-scrollbar flex h-[calc(100dvh-260px)] flex-col gap-3 overflow-y-scroll"
      >
        <ContactsCard
          v-for="item in friendshipRequests"
          :item="item"
          type="friendRequest"
          @handle-click="
            item.buttonText === 'ADD'
              ? userStore().acceptFriendRequest(item.id)
              : userStore().rejectFriendRequest(item.id)
          "
        />
        <ContactsCard
          v-for="item in helpList"
          :item="item"
          @handle-click="userStore().sendHelp(item.id)"
        />
      </div>
      <RequestsSeekHelp />
    </div>
  </PhoneLayout>
</template>
