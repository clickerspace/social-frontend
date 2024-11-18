import { onMounted, onBeforeUnmount } from "vue";
import { userStore } from "../store/user";
import { storeToRefs } from "pinia";
import { FxController } from "../utils/helpers/fxController";
import themeSong from "~/assets/sounds/theme.mp3";

let fxController: FxController | null = null;
let isInitialized = false;
let isEventListenerAdded = false;
let isMusicPlayed = false;
let fxHandlerInstance: FxHandlerReturn | null = null;

interface FxHandlerReturn {
  fxController: FxController | null;
  isInitialized: boolean;
}

export function fxHandler(): FxHandlerReturn {
  if (fxHandlerInstance) {
    return fxHandlerInstance;
  }
  const { soundFxLevel, musicLevel, soundFxOn, musicOn, vibration } =
    storeToRefs(userStore());

  const toggleAudioContext = () => {
    if (document.visibilityState === "visible") {
      fxController?.toggleAudioContext(true);
    } else {
      fxController?.toggleAudioContext(false);
    }
  };

  const playMusic = (event: Event) => {
    if (!isMusicPlayed) {
      fxController?.playMusic("theme", true);
      isMusicPlayed = true;
    }
  };

  if (!isInitialized) {
    fxController = FxController.getInstance(
      musicLevel.value,
      soundFxLevel.value,
      musicOn.value,
      soundFxOn.value,
      vibration.value,
    );

    fxController
      .loadSound("theme", themeSong)
      .then(() => {
        document.addEventListener("visibilitychange", toggleAudioContext);

        document.addEventListener("click", playMusic, { once: true });
        isEventListenerAdded = true;
      })
      .catch((error: any) => {
        console.error("Failed to load sound:", error);
      });

    isInitialized = true;
  }

  onBeforeUnmount(() => {
    if (isEventListenerAdded) {
      document.removeEventListener("visibilitychange", toggleAudioContext);
      isEventListenerAdded = false;
    }
  });

  fxHandlerInstance = { fxController, isInitialized };

  return fxHandlerInstance;
}
