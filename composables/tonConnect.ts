import { ref, onMounted } from "vue";
import { TonConnectUI } from "@tonconnect/ui";
import type { TonConnectUiCreateOptions } from "@tonconnect/ui";
import { userStore } from "~/store/user";

const tonconnect = ref<TonConnectUI | null>(null);
const initialized = ref(false);
const { PUBLIC_URL } = useRuntimeConfig().public;
export function useTonConnect() {
  if (!initialized.value) {
    initialized.value = true;
    const options: TonConnectUiCreateOptions = {
      manifestUrl: `${PUBLIC_URL}/tonconnect-manifest.json`,
    };
    tonconnect.value = new TonConnectUI(options);

    tonconnect.value.uiOptions = {
      actionsConfiguration: {
        twaReturnUrl: "https://t.me/batitestbot/testapp",
      },
    };
    tonconnect.value?.onStatusChange(() => {
      if (tonconnect.value?.connected) {
        console.log("tonconnect.value :>> ", tonconnect.value);
        userStore().setConnected(tonconnect.value?.connected);
        if (tonconnect.value.account?.address) {
          userStore().setWalletAddress(tonconnect.value.account.address);
        } else {
          userStore().setWalletAddress("");
        }
      } else {
        userStore().setConnected(false);
        userStore().setWalletAddress("");
      }
    });
  }
  const checkConnection = async () => {
    try {
      if (tonconnect.value && !tonconnect.value.connected) {
        await tonconnect.value.openModal();
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  };

  return { tonconnect, checkConnection };
}
