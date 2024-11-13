<script setup lang="ts">
import { userStore } from "~/store/user";
import { storeToRefs } from "pinia";
import { removePrefix, shortenAddress } from "~/utils/helpers";
import { useClipboard } from "@vueuse/core";
import { Address } from "@ton/core";

const toast = useToast();
const { connected, walletAddress } = storeToRefs(userStore());
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
  source: convertToHumanReadable(walletAddress.value),
});
const { tonconnect } = useTonConnect();

const copyAdress = async () => {
  await copy();
  toast.add({
    id: "address_copied",
    title: "Copied",
    description: "Address Copied to clipboard",
    icon: "i-heroicons-check-badge",
    color: "voodoo",
  });
};
const disconnect = async () => {
  await tonconnect.value?.disconnect();
  toast.add({
    id: "disconnected",
    title: "Disconnected",
    description: "Wallet Disconnected Successfully",
    icon: "i-heroicons-check-badge",
    color: "voodoo",
  });
};
</script>
<template>
  <div class="radial-bg flex w-full flex-col" :class="connected ? 'p-3' : ''">
    <div
      class="flex w-full flex-col gap-3 text-white dark:text-white"
      v-if="connected"
    >
      <div class="flex w-full items-center justify-between">
        <span class="w-28 whitespace-nowrap"> Wallet Address</span>
        <UIcon
          v-if="connected"
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
        class="flex w-full items-center rounded-md border border-white bg-[#BDBDBD] px-2 py-1 dark:border-white"
      >
        <span class="line-clamp-1">
          {{
            connected
              ? removePrefix(convertToHumanReadable(walletAddress))
              : "Not Connected"
          }}
        </span>
      </span>
    </div>
    <button
      v-if="connected"
      @click="
        () => {
          disconnect();
        }
      "
      class="radial-bg mt-3 flex h-12 items-center justify-center gap-2"
    >
      Disconnect
    </button>
    <WalletConnectButton v-else />
  </div>
</template>
