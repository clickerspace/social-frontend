declare global {
  interface Window {
    webkitAudioContext?: any;
    Telegram?: any;
  }
}
interface TabsProvider {
  tabNumber: Ref<number>;
  updateTabNumber: (newTabNumber: number) => void;
}

export type { TabsProvider };
