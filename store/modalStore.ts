import { defineStore } from "pinia";

interface ModalState {
  isModalOpen: boolean;
  activeKey?: string;
  tutorialModal: boolean;
  splashModal: boolean;
  characterSelectModal: boolean;
  paymentModal: boolean;
}
export const modalStore = defineStore("modalStore", {
  state: (): ModalState => {
    return {
      isModalOpen: false,
      activeKey: "menu",
      tutorialModal: false,
      paymentModal: false,
      splashModal: false,
      characterSelectModal: false,
    };
  },
  actions: {
    openMenuModal(activeKey?: string) {
      this.isModalOpen = true;
      this.activeKey = activeKey;
    },
    changeActiveKey(activeKey: string) {
      this.activeKey = activeKey;
    },
    closeMenuModal() {
      this.isModalOpen = false;
      this.activeKey = "menu";
    },
    setTutorialModal(value: boolean) {
      this.tutorialModal = value;
    },
    setPaymentModal(value: boolean) {
      this.paymentModal = value;
    },
    setSplashModal(value: boolean) {
      this.splashModal = value;
    },
    setCharacterSelectModal(value: boolean) {
      this.characterSelectModal = value;
    },
  },
});
