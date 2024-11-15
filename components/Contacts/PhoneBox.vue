<script setup lang="ts">
import { userStore } from "~/store/user";
import { storeToRefs } from "pinia";
import { removePrefix, shortenAddress } from "~/utils/helpers";
import { useClipboard } from "@vueuse/core";
import { Address } from "@ton/core";

const toast = useToast();
const { telegramId } = storeToRefs(userStore());
const convertToHumanReadable = (hexAddress: string) => {
  try {
    const address = Address.parse(hexAddress);
    return address.toString({
      urlSafe: true,
      bounceable: true,
      testOnly: true,
    });
  } catch (error) {
    return hexAddress;
  }
};
const { copy } = useClipboard({
  source: convertToHumanReadable(telegramId.value),
});
const { tonconnect } = useTonConnect();

const copyAdress = async () => {
  await copy();
  toast.add({
    id: "address_copied",
    title: "Copied",
    description: "Phone Number Copied to clipboard",
    icon: "i-heroicons-check-badge",
    color: "voodoo",
  });
};
</script>
<template>
  <div class="radial-bg flex w-full flex-col p-3">
    <div class="flex w-full flex-col gap-3 text-white dark:text-white">
      <div class="flex w-full items-center justify-between">
        <span class="w-28 whitespace-nowrap"> Your Phone Number</span>
        <UIcon
          name="mingcute:copy-fill"
          size="24"
          class="cursor-pointer text-social-purple-100"
          @click="
            () => {
              copyAdress();
            }
          "
        />
      </div>
      <span
        class="border-bg-#BDBDBD flex w-full items-center justify-center rounded-md border border-solid bg-[radial-gradient(169.72%_89.02%_at_80.91%_-10.53%,_rgba(255,_255,_255,_0.50)_0%,_rgba(175,_175,_175,_0.50)_100%)] px-2 py-1"
      >
        <span class="line-clamp-1">
          {{ telegramId }}
        </span>
      </span>
    </div>
  </div>
</template>
