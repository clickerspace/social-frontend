import type { SonarReturnStatus } from "./sonar";

declare global {
  interface Window {
    telegramAnalytics: any;
    Adsgram: any;
    webkitAudioContext?: any;
    Telegram?: any;
    Sonar: {
      show: (options: {
        adUnit: string;
        onStart: () => void;
        onShow: () => void;
        onError: () => void;
        onClose: () => void;
        onReward: () => void;
      }) => Promise<{ status: SonarReturnStatus; message?: string }>;
    };
  }
}
interface TabsProvider {
  tabNumber: Ref<number>;
  updateTabNumber: (newTabNumber: number) => void;
}
export type Haptics =
  | "light"
  | "medium"
  | "heavy"
  | "soft"
  | "rigid"
  | "error"
  | "success"
  | "warning"
  | "selection";
export type { TabsProvider };
