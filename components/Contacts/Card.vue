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
const clicked2 = ref(false);

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
  if (!clicked2.value) {
    clicked2.value = true;
  }
  if (type === "friendRequest") {
    rejectFriendRequest(id.value);
  } else {
    removeFriend(id.value);
  }

  setTimeout(() => {
    clicked2.value = false;
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
      <div class="my-2 flex w-full justify-end gap-2">
        <button
          v-if="type"
          @click="handleClickForRed()"
          class="flex min-h-8 w-12 items-center justify-center rounded-md bg-social-red-100 opacity-65"
        >
          <UIcon
            v-if="clicked2"
            name="svg-spinners:180-ring-with-bg"
            size="20"
          />
          <UIcon
            v-else-if="type === 'friendRequest'"
            name="mdi:account-remove"
            size="20"
          />
          <UIcon
            v-else
            name="material-symbols:person-remove-rounded"
            size="20"
          />
        </button>
        <button
          @click="handleClick()"
          v-if="buttonText"
          class="inline-flex items-center justify-center rounded-[6px] bg-[#7C6F88] px-3 font-[Inter] text-[12px] font-semibold text-[white]"
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
