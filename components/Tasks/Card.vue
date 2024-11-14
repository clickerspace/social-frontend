<!-- <script setup lang="ts">
import type { Quest, UserQuest } from "~/types";
import { cFetch } from "~/utils/helpers";
import { initUtils } from "@telegram-apps/sdk";

import { userStore } from "~/store/user";
import { storeToRefs } from "pinia";
const { userQuests, walletAddress } = storeToRefs(userStore());
const { setSeedAndYield, setFertilize, checkUserQuestStatus, setSpin } =
  userStore();
const { tonconnect, checkConnection } = useTonConnect();
export interface Props {
  quest: Quest;
}
const QuestAmountType = {
  0: "seed",
  1: "yield",
  2: "fertilize-color",
  3: "farm-token",
};

const { quest } = defineProps<Props>();

const {
  name: quest_name,
  amount: reward,
  amount_type: reward_type,
  updated_at,
  icon,
  order,
  link,
  status,
  required,
} = toRefs(quest);
// MARK ADD Group links here if we are not able to add bot to group
const excludedSubstrings = ["startapp", "nbOAsG_2dLI4ODYy"];
const tgLink = computed(() => {
  return link?.value?.includes("t.me") &&
    excludedSubstrings.every((substring) => !link?.value?.includes(substring))
    ? link?.value
    : null;
});
const utils = initUtils();
const checkQuest = async (fromCheck = false) => {
  if (tgLink.value && !fromCheck) {
    isOpen.value = true;
    return;
  }
  try {
    const res = await cFetch({
      endpoint: `quest`,
      method: "POST",
      body: JSON.stringify({
        quest: quest,
      }),
    });
    if (res) {
      userQuests.value = res.quests;
      const resources = res.resources;
      let findQuest = res.quests.find(
        (q: UserQuest) => q.name === quest_name.value,
      );
      quest_name.value = findQuest.name;
      status.value = findQuest.status;
      setSeedAndYield(resources[0]?.amount, resources[1]?.amount);
      setFertilize(resources[2]?.amount);
      if (res?.spin) {
        setSpin(res.spin);
      }
      if (link?.value && !tgLink.value) {
        // when panel is updated with new quests, we need to update this part
        // MARK this is what to do incase of a telegram group that wont add our bot so quest opens link first instead of showing check modal
        if (link?.value.includes("nbOAsG_2dLI4ODYy")) {
          utils.openTelegramLink(link?.value);
        } else {
          utils.openLink(link?.value, {
            tryBrowser: true,
            tryInstantView: true,
          });
        }
      }
      if (fromCheck) {
        isOpen.value = false;
      }
    }
  } catch (e) {
    console.error(e);
  }
  checkUserQuestStatus();
};

const callSendCheckin = async () => {
  const connected = await checkConnection();
  if (!connected) return;
  let transaction;
  if (!tonconnect.value) {
    console.error("TonConnectUI is not initialized");
    return;
  }
  try {
    const res = await cFetch({
      url: `/backend/transactions/contract-call`,
      method: "POST",
      body: JSON.stringify({
        senderAdress: walletAddress.value,
      }),
    });
    transaction = res.contractTx;
    if (!transaction) {
      console.error("Transaction is not initialized");
      return;
    }
    tonconnect.value
      .sendTransaction(transaction)
      .then((result: any) => {
        userStore()
          .me()
          .then(() => {
            checkUserQuestStatus();
          });
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

onMounted(() => {
  if (userQuests.value?.length === 0) return;
  let findQuest = userQuests.value.find(
    (q: UserQuest) => q.name === quest_name?.value,
  );
  if (!findQuest) {
    status.value = 0;
  } else {
    status.value = findQuest.status;
  }
});

watch(
  () => userQuests.value,
  (newVal) => {
    if (newVal?.length === 0) return;
    let findQuest = newVal.find((q: UserQuest) => q.name === quest_name?.value);
    if (!findQuest) {
      status.value = 0;
    } else {
      status.value = findQuest.status;
    }
  },
);
const isOpen = ref(false);
</script>
<template>
  <div
    class="relative flex w-full items-center justify-between overflow-hidden rounded-2xl border px-2 py-4 font-spartan duration-300"
    :class="
      status === 2
        ? 'border-slate-600 bg-cbrown-400'
        : status === 1
          ? 'cursor-pointer border-cbrown-200 bg-cbrown-800'
          : 'cursor-pointer border-cbrown-800 bg-cbrown-200'
    "
    @click="
      status === 0 || status === 1
        ? order === 1
          ? callSendCheckin()
          : checkQuest()
        : null
    "
  >
    <div class="flex items-center justify-center space-x-2">
      <div
        class="flex items-center justify-center rounded-full p-2"
        :class="status === 2 ? 'bg-dbrown-800' : 'bg-cbrown-400'"
      >
        <UIcon
          :name="icon || 'ant-design:login-outlined'"
          size="24"
          class="text-cbrown-200"
        />
      </div>
      <div class="flex flex-col">
        <UTooltip :text="$t(`quests.` + quest_name)">
          <span
            class="font-semibold ltr:pr-2"
            :class="
              status === 2
                ? 'text-cbrown-900'
                : status === 1
                  ? 'cursor-pointer text-cbrown-200'
                  : 'text-cbrown-900'
            "
            >{{ $t(`quests.` + quest_name) }}</span
          >
        </UTooltip>
        <div class="flex items-center space-x-1">
          <img
            :src="`/icons/${QuestAmountType[reward_type as keyof typeof QuestAmountType] || 'seed'}.svg`"
            class="h-5 w-5"
            alt="yield"
          />
          <span class="translate-y-1 text-dbrown-600">+{{ reward }} </span>
          <div
            v-if="quest.name === 'd1' || quest.name === 'd2'"
            class="flex translate-y-[2px] items-center justify-center gap-1"
          >
            <Icon
              name="maki:watermill-11"
              size="16"
              class="ml-1 text-cbrown-400"
            />
            <span class="translate-y-[2px] text-dbrown-600"
              >{{ quest.name === "d1" ? "+2" : "+4" }} Spin</span
            >
          </div>
        </div>
      </div>
    </div>
    <UIcon
      :name="
        status === 2
          ? 'weui:done2-outlined'
          : status === 1
            ? 'line-md:uploading-loop'
            : 'icons8:chevron-right-round'
      "
      size="40"
      class="text-cbrown-700"
    />
  
  </div>
</template> -->
<script setup lang="ts"></script>
<template>
  <div>page</div>
</template>
