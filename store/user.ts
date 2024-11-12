import { defineStore } from "pinia";

import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { cFetch } from "~/utils/helpers/cFetch";

export interface User {
  name: string;
  token: string | null;
  expire: string | null;
  telegramId: string;
  userId: string;
  gameId: string;
  updateTime: number;
  withdrawableTokens: number;
  dayEnd: number;
  language: string;
  loading: boolean;
  version: string;
  connected: boolean;
  walletAddress: string;
  //fx settings
  musicLevel: number;
  musicOn: boolean;
  soundFxLevel: number;

  soundFxOn: boolean;
  vibration: boolean;
  // fx settings end
}

export const userStore = defineStore("userStore", {
  state: (): User => {
    return {
      name: "John Doe",
      token: null,
      expire: null,

      telegramId: "",

      userId: "",
      gameId: "",
      updateTime: 0,

      withdrawableTokens: 0,
      dayEnd: 0,

      language: "check",

      loading: true,

      version: "0.0.0",

      connected: false,

      walletAddress: "",
      //fx settings
      musicLevel: 50,
      musicOn: true,
      soundFxLevel: 50,
      soundFxOn: true,
      vibration: true,

      // fx settings end
    };
  },
  actions: {
    async login() {
      try {
        const response = await cFetch(`/backend/telegram-login`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const data = await response.json();
        console.log("Login response:", data);
        return true;
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    },
    async getStory() {
      try {
        const response = await cFetch(`/backend/get-story`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const data = await response.json();
        console.log("Story response:", data);
        return data;
      } catch (error) {
        console.error("Story failed:", error);
        return false;
      }
    },
    async continueStory(
      initialBrief: string,
      initialNext: string,
      userChoice: string,
    ) {
      try {
        const response = await cFetch(`/backend/continue-story`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            initialBrief,
            initialNext: initialNext,
            userChoice,
          }),
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const data = await response.json();
        console.log("Continue Story response:", data);
        return data.response;
      } catch (error) {
        console.error("Continue Story failed:", error);
        return false;
      }
    },

    setDayEnd(time: number) {
      this.dayEnd = time;
    },

    assignUserData(res: any) {
      const gameUser = res?.gameUser || res?.updatedUser;

      this.userId = gameUser?.user_id;
      this.name = gameUser?.name;
      this.telegramId = gameUser?.email?.split("@")[0];
      // THOSE INDEX MAY CHANGE IF ERROR CHECK
      this.withdrawableTokens = gameUser?.withdrawable_tokens?.toFixed(2) || 0;
      this.updateTime = Date.now();
      this.gameId = gameUser._id;

      //   this.errorState = "false";
    },

    setConnected(bool: boolean) {
      this.connected = bool;
    },

    setWalletAddress(str: string) {
      this.walletAddress = str;
    },

    setVersion(value: string | null | undefined) {
      if (value) this.version = value;
    },
    checkExpire(): "expired" | "valid" {
      if (!this.expire) {
        return "expired";
      }
      if (new Date() > new Date(this.expire)) {
        this.token = "";
        this.expire = "";
        return "expired";
      }
      return "valid";
    },
    setToken(token: string) {
      this.token = token;
    },
    setLoading(value: boolean) {
      this.loading = value;
    },
    setLanguage(lang: string) {
      this.language = lang;
    },

    clearUser(error: "error" | "restarting" | "false" = "false") {
      this.token = null;
      this.expire = null;
      this.userId = "";
      this.gameId = "";
      this.updateTime = 0;
      this.loading = true;
    },

    setMusicLevel(value: number) {
      this.musicLevel = value;
    },
    setMusicOn(value: boolean) {
      this.musicOn = value;
    },
    setSoundFxLevel(value: number) {
      this.soundFxLevel = value;
    },
    setSoundFxOn(value: boolean) {
      this.soundFxOn = value;
    },
    setVibration(value: boolean) {
      this.vibration = value;
    },
  },

  persist: {
    storage: localStorage,
  },
});
