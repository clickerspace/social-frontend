<script setup lang="ts">
import { storeToRefs } from "#build/imports";
import { userStore } from "~/store/user";
const { searchedContact, contacts } = storeToRefs(userStore());
const emit = defineEmits(["update:key"]);

const clicked = ref(false);

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
onMounted(async () => {
  await userStore().getFriends();
});
</script>
<template>
  <PhoneLayout title="Contacts" @update:key="emit('update:key')">
    <div class="flex h-full w-full flex-col justify-between pb-12">
      <div
        class="hide-scrollbar flex h-[calc(100dvh-260px)] flex-col gap-3 overflow-y-scroll"
      >
        <div class="flex items-center gap-3">
          <UInput
            :ui="{
              rounded: '!rounded-full',
              base: 'h-12 radial-bg !border !border-[#737373] !bg-transparent !ring-0  ',
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
            class="w-full"
          />

          <button
            @click="!clicked ? searchFriend() : null"
            class="flex h-12 w-16 items-center justify-center rounded-md bg-social-purple-200"
          >
            <UIcon
              v-if="clicked"
              name="svg-spinners:180-ring-with-bg"
              size="20"
            />

            <UIcon name="material-symbols:search" v-else size="20" />
          </button>
        </div>

        <ContactsCard
          v-for="item in searchedContact"
          :key="item.name"
          :avatar="item.avatar"
          :name="item.name"
          :buttonText="item.buttonText"
          @handle-click="
            item.buttonText === 'ADD'
              ? userStore().addFriend(item.id)
              : userStore().askForHelp(item.id)
          "
        />
        <!-- TODO ADD A SEPERATOR BETWEEN SEARCHED AND CONTACTS -->
        <ContactsCard
          v-for="item in contacts"
          :key="item.name"
          :avatar="item.avatar"
          :name="item.name"
          :buttonText="item.buttonText"
          @handle-click="
            item.buttonText === 'ADD'
              ? userStore().addFriend(item.id)
              : userStore().askForHelp(item.id)
          "
        />
      </div>
      <ContactsPhoneBox />
    </div>
  </PhoneLayout>
</template>
