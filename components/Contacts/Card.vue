<script setup lang="ts">
import { userStore } from "~/store/user";
const { removeFriend, rejectFriendRequest, telegramId } = userStore();
const emit = defineEmits(["handleClick"]);

export interface Props {
  item: {
    id: string;
    name: string;
    avatar: string;
    buttonText: string;
  };
  type?: "friendRequest" | "friendList";
}
const { type, item } = defineProps<Props>();

const { name, avatar, buttonText, id } = toRefs(item);
const clicked = ref(false);

const handleClick = () => {
  if (!clicked.value) {
    clicked.value = true;
    emit("handleClick");
  }

  setTimeout(() => {
    clicked.value = false;
  }, 1000);
};
const handleClickForRed = () => {
  if (!clicked.value) {
    clicked.value = true;
  }
  if (type === "friendRequest") {
    rejectFriendRequest(id.value);
  } else {
    removeFriend(id.value);
  }

  setTimeout(() => {
    clicked.value = false;
  }, 1000);
};
</script>
<template>
  <div class="radial-bg">
    <div class="flex cursor-pointer select-none justify-between p-2">
      <div class="flex items-center justify-start gap-2">
        <img :src="avatar" :alt="name" />
        <div class="flex flex-col gap-1">
          <span class="font-sm font-semibold">{{ name }}</span>
        </div>
      </div>
      <div class="flex items-center justify-end gap-2">
        <button
          @click="handleClickForRed()"
          v-if="type === 'friendRequest' || type === 'friendList'"
          class="flex w-16 items-center justify-center rounded-md bg-social-red-100 p-2"
        >
          <UIcon
            v-if="clicked"
            name="svg-spinners:180-ring-with-bg"
            size="20"
          />
          <UIcon
            v-else-if="type === 'friendRequest'"
            name="material-symbols:person-remove-rounded"
            size="20"
          />
          <UIcon v-else name="mdi:account-remove" size="20" />
        </button>
        <button
          @click="handleClick()"
          v-if="buttonText"
          class="inline-flex flex-shrink-0 items-center justify-end rounded-[6px] bg-[#7C6F88] p-2 font-[Inter] text-[12px] font-semibold text-[white]"
        >
          <UIcon
            v-if="clicked"
            name="svg-spinners:180-ring-with-bg"
            size="20"
          />
          <span v-else>
            {{ buttonText }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
