<script setup lang="ts">
import { userStore } from "~/store/user";
import { initUtils } from "@telegram-apps/sdk";
import { cFetch } from "~/utils/helpers/cFetch";

const { completeTask, getTasks } = userStore();
const { walletAddress } = storeToRefs(userStore());
const utils = initUtils();
interface props {
  task: {
    status: "PENDING" | "COMPLETED" | "ACTIVE";
    task: {
      id: string;
      name: string;
      order: number;
      icon: string;
      link?: string | null;
      rewards: {
        type: "SOCIAL_POINT" | "ENERGY" | "TOKEN";
        amount: number;
      }[];
    };
  };
}
const props = defineProps<props>();
const { checkConnection, tonconnect } = useTonConnect();
const callSendCheckin = async () => {
  const connected = await checkConnection();
  if (!connected) return;
  let transaction;
  if (!tonconnect.value) {
    console.error("TonConnectUI is not initialized");
    return;
  }
  try {
    const res = await cFetch("/backend/transactions/check-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ senderAddress: walletAddress.value }),
    });
    const data = await res.json();
    transaction = data.result.contractTx;
    if (!transaction) {
      console.error("Transaction is not initialized");
      return;
    }
    tonconnect.value
      .sendTransaction(transaction)
      .then((result: any) => {
        getTasks();
        // no need for quest call here listener on transaction will handle rest.
        // give reward
      })
      .catch((error: any) => {
        console.error("Error sending transaction:", error);
      });
  } catch (e) {
    console.error("Error sending transaction:", e);
  }
};
const { task } = toRefs(props);
const toast = useToast();
const onReward = async () => {
  try {
    const res = await completeTask(task.value.task.id);

    toast.add({
      id: "ads_1",
      title: "Congratulations",
      description: "You have successfully completed the task",
      icon: "i-heroicons-check-badge",
    });
  } catch (e) {
    console.error(e, "giving_Rewards");
  }
};
const onError = () => {
  toast.add({
    id: "ads_2",
    title: "Error",
    description: "An error occurred while completing the task",
    icon: "i-heroicons-x-circle",
    color: "red",
  });
};
const { showAd } = useAdsgram({ onError, onReward });
const handleClick = async () => {
  console.log(task.value);
  if (task.value.status === "ACTIVE") {
    if (task.value.task.name.toLowerCase().includes("watch")) {
      await showAd();
      await getTasks();
      return;
    } else if (task.value.task.name.toLowerCase().includes("check-in")) {
      await callSendCheckin();
      return;
    }

    if (task.value.task.link) {
      utils.openLink(task.value.task.link, {
        tryInstantView: true,
        tryBrowser: true,
      });
    }

    await completeTask(task.value.task.id);
    await getTasks();
  }
};
</script>
<template>
  <div
    class="radial-bg flex w-full select-none items-center justify-between p-3"
    :class="
      task.status === 'PENDING'
        ? 'radial-bg'
        : task.status !== 'COMPLETED'
          ? '!border !border-black'
          : 'radial-bg-disabled'
    "
    @click="handleClick"
  >
    <div class="flex items-center gap-2">
      <UIcon :name="task.task.icon" size="32" class="text-social-purple-100" />
      <div class="flex flex-col gap-1">
        <span>{{ task.task.name }}</span>
        <div class="flex items-center gap-2">
          <div
            v-for="reward in task.task.rewards"
            class="flex items-center justify-center gap-1"
          >
            <img :src="`/icons/${reward.type}.svg`" class="size-4" />
            <span class="text-xs">{{ reward.amount }}</span>
          </div>
        </div>
      </div>
    </div>
    <UIcon
      :name="
        task.status === 'PENDING'
          ? 'line-md:uploading'
          : task.status !== 'COMPLETED'
            ? 'iconoir:page-right'
            : 'simple-line-icons:check'
      "
      size="36"
      :class="
        task.status === 'PENDING'
          ? 'text-social-purple-100'
          : task.status !== 'COMPLETED'
            ? 'text-black'
            : 'text-social-purple-300'
      "
    />
  </div>
</template>
