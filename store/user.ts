import { defineStore } from "pinia";

import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { cFetch } from "~/utils/helpers/cFetch";
import { useLocalTime } from "~/utils/helpers/useLocalTime";

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
  localTime: ReturnType<typeof useLocalTime>;
  soundFxOn: boolean;
  vibration: boolean;
  energy: number;
  socialPoints: number;
  friendshipRequests: any[];
  searchedContact: any;
  contacts: any[];
  showTutorial: boolean;
  helpList: any[];
  location: string;
  story: any;
  currentStory: string;
  products: any[];
  gameLoading: boolean;
  selectedCharacter: string;
  otherCharacters: string[];
  storyLocation: string;
  firstLogin: boolean;
  tasks: any[];
  lastStoryResponse: any;
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
      showTutorial: false,
      telegramId: "",

      userId: "",
      gameId: "",
      updateTime: 0,

      withdrawableTokens: 0,
      dayEnd: 0,

      language: "check",

      loading: true,

      version: "0.0.0",
      localTime: useLocalTime(),
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
      gameLoading: true,
      selectedCharacter: "",
      otherCharacters: [],
      storyLocation: "",
      firstLogin: false,
      tasks: [],
      lastStoryResponse: {},
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
        this.firstLogin = data.firstLogin;
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
        this.location = result.location;
        this.otherCharacters = result.characters;
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
          const { error } = await response.json();

          if (error.includes("Missing required") || error.includes("OpenAI")) {
            // return old
            return null;
          }
          return { brief: "You should rest or help your friends." };
        }

        const { result, user } = await response.json();
        this.assignUserData(user);
        this.otherCharacters = result.response.usedCharacters;
        this.location = result.response.usedLocation;
        console.log("Continue Story response:", result);
        this.lastStoryResponse = result.response;
        return result.response;
      } catch (error) {
        if (
          error instanceof Error &&
          (error.message.includes("Missing required") ||
            error.message.includes("OpenAI"))
        ) {
          // return old
          return null;
        }
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
      this.showTutorial = gameUser?.showTutorial;
      // THOSE INDEX MAY CHANGE IF ERROR CHECK
      this.withdrawableTokens = gameUser?.withdrawable_tokens?.toFixed(2) || 0;
      this.updateTime = gameUser?.updatedAt;
      this.gameId = gameUser.id;
      this.selectedCharacter = gameUser?.selectedCharacter || "david";

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
              avatar: `/avatar/${result.selectedCharacter}.png`,
              buttonText: "ADD",
            },
          ];
        } else if (result.friendUser) {
          this.searchedContact = [
            {
              id: result.friendUser.id,
              name: result.friendUser.username,
              avatar: `/avatar/${result.friendUser.selectedCharacter}.png`,
              buttonText: "",
            },
          ];
        } else {
          this.searchedContact = [];
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
        this.contacts = this.contacts.filter((contact) => contact.id !== tgId);
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
        this.contacts = this.contacts.map((contact) => {
          if (contact.id === tgId) {
            contact.buttonText = "";
          }
          return contact;
        });
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
        this.helpList = this.helpList.filter((contact) => contact.id !== tgId);
        return result;
      } catch (error) {
        console.error("Send help failed:", error);
        return false;
      }
    },
    async friendRequests(skip: number = 0, limit: number = 10) {
      try {
        const response = await cFetch(`/backend/friend/requests`, {
          method: "GET",
          headers: {
            skip: skip.toString(),
            limit: limit.toString(),
          },
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        console.log("object :>> ", result);

        this.assignUserData(user);
        const mappedResults = result.map(
          (item: {
            initiator: {
              username: string;
              id: string;
              selectedCharacter: string;
            };
          }) => ({
            name: item.initiator.username,
            avatar: `/avatar/${item.initiator.selectedCharacter}.png`,
            buttonText: "ADD",
            id: item.initiator.id,
          }),
        );

        if (mappedResults.length !== 0) {
          this.friendshipRequests = [
            ...this.friendshipRequests,
            ...mappedResults,
          ];
        }
        return mappedResults;
      } catch (error) {
        console.error("Friend requests failed:", error);
        return false;
      }
    },
    async getFriends(skip: number = 0, limit: number = 10) {
      try {
        const response = await cFetch(`/backend/friend/list`, {
          method: "GET",
          headers: {
            skip: skip.toString(),
            limit: limit.toString(),
          },
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        this.assignUserData(user);
        const mappedResults = result.map(
          (item: {
            username: string;
            id: string;
            hasEnergyRequest: boolean;
            selectedCharacter: string;
          }) => ({
            name: item.username,
            avatar: `/avatar/${item.selectedCharacter}.png`,
            buttonText: !item.hasEnergyRequest ? "ASK HELP" : "",
            id: item.id,
          }),
        );
        if (mappedResults.length !== 0) {
          this.contacts = [...this.contacts, ...mappedResults];
        }

        return mappedResults;
      } catch (error) {
        console.error("Get friends failed:", error);
        return false;
      }
    },
    async getHelpRequests(skip: number = 0, limit: number = 10) {
      try {
        const response = await cFetch(`/backend/help/requests/get`, {
          method: "GET",
          headers: {
            skip: skip.toString(),
            limit: limit.toString(),
          },
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        this.assignUserData(user);
        const mappedResults = result.map(
          (item: {
            helped: { username: string; id: string; selectedCharacter: string };
          }) => ({
            name: item.helped.username,
            avatar: `/avatar/${item.helped.selectedCharacter}.png`,

            buttonText: "SEND HELP",
            id: item.helped.id,
          }),
        );
        if (mappedResults.length !== 0) {
          this.helpList = [...this.helpList, ...mappedResults];
        }

        return mappedResults;
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
    async createTransaction(productId: string) {
      try {
        const response = await cFetch(`/backend/transactions/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: productId,
          }),
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        this.assignUserData(user);
        console.log("Create transaction response:", result);
        return result;
      } catch (error) {
        console.error("Create transaction failed:", error);
        return false;
      }
    },
    async setSelectedCharacter(character: string) {
      try {
        const response = await cFetch(`/backend/set-character`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            character,
          }),
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        this.assignUserData(user);
        console.log("Set character response:", result);
        return result;
      } catch (error) {
        console.error("Set character failed:", error);
        return false;
      }
    },
    async getTasks() {
      try {
        const response = await cFetch(`/backend/task/list`, {
          method: "GET",
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        this.assignUserData(user);
        this.tasks = result;
        return result;
      } catch (error) {
        console.error("Get tasks failed:", error);
        return false;
      }
    },
    async completeTask(taskId: string) {
      try {
        const response = await cFetch(`/backend/task/complete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            taskId,
          }),
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return false;
        }

        const { result, user } = await response.json();
        this.assignUserData(user);
        console.log("Complete task response:", result);
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
        return result;
      } catch (error) {
        console.error("Complete task failed:", error);
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
