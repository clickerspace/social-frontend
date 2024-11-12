import { ref, onUnmounted } from "vue";

const getFormattedTime = (): string => {
  const now = new Date();
  return new Intl.DateTimeFormat("default", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
};

export const useLocalTime = (): Ref<string> => {
  const time = ref<string>(getFormattedTime());

  const updateTime = () => {
    time.value = getFormattedTime();
  };

  const intervalId = setInterval(updateTime, 60000);

  onUnmounted(() => clearInterval(intervalId));

  return time;
};
