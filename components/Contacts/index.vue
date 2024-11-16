<script setup lang="ts">
import { storeToRefs } from "#build/imports";
import { userStore } from "~/store/user";
import { useInfiniteScroll } from "@vueuse/core";
const { searchedContact, contacts } = storeToRefs(userStore());
const emit = defineEmits(["update:key"]);

const clicked = ref(false);
const list = ref(null);

const tgId = ref("");

const searchFriend = async () => {
  if (!clicked.value) {
    clicked.value = true;
  }
  await userStore().searchForFriend(tgId.value);

  setTimeout(() => {
    clicked.value = false;
  }, 1000);
};

onUnmounted(() => {
  searchedContact.value = [];
});
useInfiniteScroll(
  list,
  async () => {
    await getOnScroll();
  },
  {
    distance: 10,
  },
);
const stopInfScroll = ref(false);
const getOnScroll = async () => {
  if (stopInfScroll.value) return;
  const newItems = await userStore().getFriends(contacts.value.length);
  if (newItems.length > 0) {
  } else {
    stopInfScroll.value = true;
  }
};
</script>
<template>
  <PhoneLayout title="Contacts" @update:key="emit('update:key')">
    <div class="flex h-full w-full flex-col justify-between pb-12">
      <div class="hide-scrollbar flex h-[calc(100dvh-260px)] flex-col gap-3">
        <div
          class="inline-flex items-center justify-center rounded-[41px] border-[1px] border-[#737373] border-[solid] bg-[radial-gradient(169.72%_89.02%_at_80.91%_-10.53%,_rgba(102,_102,_102,_0.50)_0%,_rgba(67,_58,_74,_0.50)_100%)]"
        >
          <UInput
            :ui="{
              rounded: '!rounded-full',
              base: ' !text-white h-12 !bg-transparent !ring-0  ',
              placeholder:
                'placeholder:text-[#A3A3A3] dark:placeholder:text-[#A3A3A3]',
              icon: {
                base: 'text-[#A3A3A3] dark:text-[#A3A3A3]',
              },
            }"
            type="text"
            v-model="tgId"
            placeholder="Add Phone Number"
            icon="material-symbols:call"
            iconposition="right"
            class="w-full"
          />

          <button
            @click="!clicked ? searchFriend() : null"
            class="flex h-12 w-16 items-center justify-center rounded-md"
          >
            <UIcon
              v-if="clicked"
              name="svg-spinners:180-ring-with-bg"
              size="20"
            />

            <UIcon name="material-symbols:search" v-else size="20" />
          </button>
        </div>

        <div
          ref="list"
          class="hide-scrollbar flex h-full flex-col gap-3 overflow-y-scroll"
        >
          <ContactsCard
            v-for="item in searchedContact"
            :item="item"
            :key="item.id"
            @handle-click="
              item.buttonText === 'ADD'
                ? userStore().addFriend(item.id)
                : userStore().askForHelp(item.id)
            "
          />
          <!-- TODO ADD A SEPERATOR BETWEEN SEARCHED AND CONTACTS -->
          <ContactsCard
            v-for="item in contacts"
            :item="item"
            :key="item.id"
            type="friendList"
            @handle-click="
              item.buttonText === 'ASK HELP'
                ? userStore().askForHelp(item.id)
                : userStore().removeFriend(item.id)
            "
          />
        </div>
      </div>
      <ContactsPhoneBox />
    </div>
  </PhoneLayout>
</template>
