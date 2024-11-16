import { ref, onMounted, onUnmounted } from "vue";
import type { SonarReturnStatus } from "~/types/sonar";

interface ShowPromiseResult {
  done: boolean;
  description: string;
  state: "load" | "render" | "playing" | "destroy";
  error: boolean;
}

const onErrorBasic = (result: any) => {
  const toast = useToast();
  const t = useI18n().t;
  toast.add({
    id: "ads_2",
    title: t("ads_watch_reward_error"),
    description: t("ads_watch_reward_error_description"),
    icon: "i-heroicons-x-circle",
    color: "red",
  });

  console.log(result);
};
const showSonarAd = (onReward: () => void, onError: (result: any) => void) => {
  if (!window.Sonar) {
    console.error("Sonar is not loaded.");
    onError({ error: true, description: "Sonar script not loaded" });
    return;
  }

  window.Sonar.show({
    adUnit: "rewarded_unit",

    onStart: () => {},

    onShow: () => {},

    onError: () => {
      onError({ error: true, description: "Failed to show Sonar ad" });
    },

    onClose: () => {},

    onReward: () => {
      onReward();
    },
  }).then((result: { status: SonarReturnStatus; message?: string }) => {
    if (result.status === "error") {
      console.error("Ad failed to show:", result.message);
      onError({ error: true, description: result.message || "Unknown error" });
    } else {
      console.log("Ad status:", result.status);
    }
  });
};
export function useAdsgram({
  blockId = "5316",
  onReward,
  onError = onErrorBasic,
}: {
  blockId?: string;
  onReward: () => void;
  onError?: (result: any) => void;
}) {
  const AdControllerRef = ref<any>(null);

  onMounted(() => {
    AdControllerRef.value = window.Adsgram?.init({ blockId, debug: true });
  });

  onUnmounted(() => {
    AdControllerRef.value = null;
  });

  const showAd = async () => {
    if (AdControllerRef.value) {
      try {
        const result: ShowPromiseResult = await AdControllerRef.value.show();
        if (result.done) {
          onReward();
        } else {
          console.log(result);
          showSonarAd(onReward, onError);
        }
      } catch (result) {
        console.log(result);
        showSonarAd(onReward, onError);
      }
    } else {
      console.log("Adsgram script not loaded");
      showSonarAd(onReward, onError);
    }
  };

  return {
    showAd,
  };
}
