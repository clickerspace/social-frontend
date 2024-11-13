<script setup lang="ts">
import { set } from "@vueuse/core";

const emit = defineEmits(["update:key"]);

const contacts = [
  {
    name: "John Doe",
    avatar: "/avatar/avatar1.png",
    buttonText: "HELP",
  },
  {
    name: "Jane Doe",
    avatar: "/avatar/avatar3.png",
    buttonText: "HELP",
  },
  {
    name: "Astroid Destroyer",
    avatar: "/avatar/avatar2.png",
    buttonText: "HELP",
  },
];
const clicked = ref(false);
const helpFriend = () => {
  console.log("help friend");
};
const addFriend = () => {
  if (!clicked.value) {
    clicked.value = true;
  }
  setTimeout(() => {
    clicked.value = false;
  }, 1000);
  console.log("add friend");
};
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
            placeholder="Add Phone Number"
            icon="material-symbols:call"
            class="w-full"
          />

          <button
            @click="addFriend()"
            class="flex h-12 w-16 items-center justify-center rounded-md bg-social-purple-200"
          >
            <UIcon
              v-if="clicked"
              name="svg-spinners:180-ring-with-bg"
              size="20"
            />
            <span v-else> ADD </span>
          </button>
        </div>

        <ContactsCard
          v-for="item in contacts"
          :key="item.name"
          :avatar="item.avatar"
          :name="item.name"
          :buttonText="item.buttonText"
          @handle-click="helpFriend()"
        />
      </div>
      <ContactsPhoneBox />
    </div>
  </PhoneLayout>
</template>
