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
  cryptoToken: number;
  //fx settings
  musicLevel: number;
  musicOn: boolean;
  soundFxLevel: number;

  soundFxOn: boolean;
  vibration: boolean;
  energy: number;
  socialPoints: number;
  friendshipRequests: any[];
  searchedContact: any;
  contacts: any[];
  helpList: any[];
  location: string;
  story: any;
  currentStory: string;
  products: any[];
  // fx settings end
}

export const userStore = defineStore("userStore", {
  state: (): User => {
    return {
      name: "John Doe",
      token: null,
      expire: null,
      socialPoints: 0,
      energy: 0,

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
      cryptoToken: 0,
      friendshipRequests: [],
      searchedContact: {},
      contacts: [],
      helpList: [],
      location: "",
      currentStory: "",
      story: {},
      products: [],
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
        this.assignUserData(data);
        console.log("Login response:", data);
        return true;
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    },
    async getStory(key: string = "dorm_rooms") {
      try {
        const response = await cFetch(`/backend/get-story`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            key,
          }),
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        this.story = result;
        this.currentStory = result.storyId;
        this.location = result.key;
        this.assignUserData(user);
        return result;
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
            storyId: this.currentStory,
            userChoice,
          }),
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return { brief: "You should rest or help your friends." };
        }

        const { result, user } = await response.json();
        this.assignUserData(user);
        console.log("Continue Story response:", result);
        return result.response;
      } catch (error) {
        console.error("Continue Story failed:", error);
        return { brief: "You should rest or help your friends." };
      }
    },
    assignUserData(user: any) {
      const gameUser = user;

      this.userId = gameUser?.id;
      this.name = gameUser?.name;
      this.telegramId = gameUser?.id;
      this.energy = gameUser?.energy;
      this.socialPoints = gameUser?.socialPoint;
      this.cryptoToken = gameUser?.tokens;
      // THOSE INDEX MAY CHANGE IF ERROR CHECK
      this.withdrawableTokens = gameUser?.withdrawable_tokens?.toFixed(2) || 0;
      this.updateTime = gameUser?.updatedAt;
      this.gameId = gameUser.id;

      //   this.errorState = "false";
    },
    async searchForFriend(tgId: string) {
      try {
        const response = await cFetch(`/backend/friend/search?userId=${tgId}`, {
          method: "GET",
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        if (result.username) {
          this.searchedContact = [
            {
              id: result.id,
              name: result.username,
              avatar: "/avatar/avatar2.png",
              buttonText: "ADD",
            },
          ];
        }
        this.assignUserData(user);
        return result;
      } catch (error) {
        console.error("Search for friend failed:", error);
        return false;
      }
    },
    async addFriend(tgId: string) {
      try {
        const response = await cFetch(`/backend/friend/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: tgId,
          }),
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        this.assignUserData(user);
        this.searchedContact = [];

        return result;
      } catch (error) {
        console.error("Add friend failed:", error);
        return false;
      }
    },
    async removeFriend(tgId: string) {
      try {
        const response = await cFetch(`/backend/friend/remove`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: tgId,
          }),
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        this.assignUserData(user);
        await this.getFriends();
        return result;
      } catch (error) {
        console.error("Remove friend failed:", error);
        return false;
      }
    },
    async acceptFriendRequest(tgId: string) {
      try {
        const response = await cFetch(`/backend/friend/accept`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: tgId,
          }),
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        this.assignUserData(user);
        await this.friendRequests();
        return result;
      } catch (error) {
        console.error("Accept friend request failed:", error);
        return false;
      }
    },
    async rejectFriendRequest(tgId: string) {
      try {
        const response = await cFetch(`/backend/friend/reject `, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: tgId,
          }),
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        this.assignUserData(user);
        await this.friendRequests();
        return result;
      } catch (error) {
        console.error("Cancel friend request failed:", error);
        return false;
      }
    },
    async askForHelp(tgId: string) {
      try {
        const response = await cFetch(`/backend/help/requests/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: tgId,
          }),
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        this.assignUserData(user);
        await this.getFriends();
        return result;
      } catch (error) {
        console.error("Help friend failed:", error);
        return false;
      }
    },
    async sendHelp(tgId: string) {
      try {
        const response = await cFetch(`/backend/help/requests/respond`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: tgId,
          }),
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        this.assignUserData(user);
        await this.getHelpRequests();
        return result;
      } catch (error) {
        console.error("Send help failed:", error);
        return false;
      }
    },
    async friendRequests() {
      try {
        const response = await cFetch(`/backend/friend/requests`, {
          method: "GET",
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        this.assignUserData(user);
        this.friendshipRequests = result.map(
          (item: { initiator: { username: string; id: string } }) => ({
            name: item.initiator.username,
            avatar: "/avatar/avatar2.png",
            buttonText: "ADD",
            id: item.initiator.id,
          }),
        );
        return result;
      } catch (error) {
        console.error("Friend requests failed:", error);
        return false;
      }
    },
    async getFriends() {
      try {
        const response = await cFetch(`/backend/friend/list`, {
          method: "GET",
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        this.assignUserData(user);
        this.contacts = result.map(
          (item: {
            username: string;
            id: string;
            hasEnergyRequest: boolean;
          }) => ({
            name: item.username,
            avatar: "/avatar/avatar2.png",
            buttonText: !item.hasEnergyRequest ? "ASK HELP" : "",
            id: item.id,
          }),
        );

        return result;
      } catch (error) {
        console.error("Get friends failed:", error);
        return false;
      }
    },
    async getHelpRequests() {
      try {
        const response = await cFetch(`/backend/help/requests/get`, {
          method: "GET",
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        this.assignUserData(user);
        this.helpList = result.map(
          (item: { helped: { username: string; id: string } }) => ({
            name: item.helped.username,
            avatar: "/avatar/avatar2.png",
            buttonText: "SEND HELP",
            id: item.helped.id,
          }),
        );
        return result;
      } catch (error) {
        console.error("Get help requests failed:", error);
        return false;
      }
    },
    async getProducts() {
      try {
        const response = await cFetch(`/backend/transactions/get-products`, {
          method: "GET",
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        this.assignUserData(user);
        this.products = result;
        return result;
      } catch (error) {
        console.error("Get products failed:", error);
        return false;
      }
    },
    setDayEnd(time: number) {
      this.dayEnd = time;
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
});
