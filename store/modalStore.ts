import { defineStore } from "pinia";

interface ModalState {
  isModalOpen: boolean;
  activeKey?: string;
}
export const modalStore = defineStore("modalStore", {
  state: (): ModalState => {
    return {
      isModalOpen: false,
      activeKey: "menu",
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
  },
});
