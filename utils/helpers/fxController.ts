import { initHapticFeedback } from "@telegram-apps/sdk";
import type { Haptics } from "~/types";
export class FxController {
  private static instance: FxController | null = null;
  private audioContext: AudioContext;
  private sounds: Record<string, AudioBuffer>;
  private musicGainNode: GainNode;
  private effectsGainNode: GainNode;
  private musicLevel: number;
  private effectsLevel: number;
  private musicOn: boolean;
  private effectsOn: boolean;
  private vibrationOn: boolean;
  private hapticFeedback: any;
  private adsPause: boolean;
  private currentSources: Record<string, AudioBufferSourceNode> = {};

  private constructor(
    musicLevel: number,
    effectsLevel: number,
    musicOn: boolean = true,
    effectsOn: boolean = true,
    vibrationOn: boolean = true,
  ) {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.sounds = {};
    this.musicGainNode = this.audioContext.createGain();
    this.effectsGainNode = this.audioContext.createGain();
    this.musicLevel = musicLevel / 100; // Normalize to 0.0 - 1.0
    this.effectsLevel = effectsLevel / 100; // Normalize to 0.0 - 1.0
    this.musicOn = true;
    this.effectsOn = true;
    this.vibrationOn = true;
    this.musicGainNode.gain.value = this.musicLevel;
    this.effectsGainNode.gain.value = this.effectsLevel;
    this.musicGainNode.connect(this.audioContext.destination);
    this.effectsGainNode.connect(this.audioContext.destination);
    this.adsPause = this.audioContext.state === "suspended";
    this.musicOn = musicOn;
    this.effectsOn = effectsOn;
    this.vibrationOn = vibrationOn;
    this.hapticFeedback = initHapticFeedback();
    if (!this.musicOn) {
      this.musicGainNode.gain.value = 0;
    }
    if (!this.effectsOn) {
      this.effectsGainNode.gain.value = 0;
    }
  }

  public static getInstance(
    musicLevel?: number,
    effectsLevel?: number,
    musicOn?: boolean,
    effectsOn?: boolean,
    vibrationOn?: boolean,
  ): FxController {
    if (!FxController.instance) {
      FxController.instance = new FxController(
        musicLevel ?? 50,
        effectsLevel ?? 50,
        musicOn ?? true,
        effectsOn ?? true,
        vibrationOn ?? true,
      );
    }
    return FxController.instance;
  }

  // import themeIos from "~/assets/sounds/theme.mp3";
  // import themeAndroid from "~/assets/sounds/theme.ogg";
  public async loadSound(name: string, url: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this.sounds[name]) {
        await fetch(url)
          .then((response) => response.arrayBuffer())
          .then((arrayBuffer) => this.audioContext.decodeAudioData(arrayBuffer))
          .then((audioBuffer) => {
            this.sounds[name] = audioBuffer;
            resolve(); // Resolve the promise when the sound is loaded
          })
          .catch((error) => {
            console.error(`Error loading sound ${name} from ${url}:`, error);
            reject(error); // Reject the promise if there's an error
          });
      } else {
        resolve(); // Resolve immediately if the sound is already loaded
      }
    });
  }
  public playMusic(name: string, loop: boolean = false) {
    // may cause problem if there is another music added later
    // musics should be called once so check if it is already playing
    if (!this.currentSources[name]) {
      this._playSound(name, this.musicGainNode, loop);
    }
  }

  public playEffect(name: string, long = false) {
    // if long is true, check if its in the current sources since it should be called once
    if (long && this.currentSources[name]) {
      return;
    }

    try {
      this._playSound(name, this.effectsGainNode);
    } catch (e) {
      //silent erro
      console.log(e, "here", this.effectsOn);
    }
  }
  private ensureAudioContextResumed(): Promise<void> {
    if (this.audioContext.state === "suspended") {
      return this.audioContext.resume();
    }
    return Promise.resolve();
  }
  private _playSound(name: string, gainNode: GainNode, loop: boolean = false) {
    if (this.sounds[name]) {
      if (this.audioContext.state === "suspended") {
        try {
          this.ensureAudioContextResumed()
            .then(() => {
              this._playBuffer(name, gainNode, loop);
            })
            .catch((e) => {
              console.error(e, "ensureAudioContextResumed error");
            });
        } catch (e) {
          console.error(e, "resume error");
        }
      } else {
        this._playBuffer(name, gainNode, loop);
      }
    }
  }

  private _playBuffer(name: string, gainNode: GainNode, loop: boolean) {
    const buffer = this.sounds[name];
    if (!buffer) {
      console.error(`Sound effect ${name} not found`);
      return;
    }
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;
    source.connect(gainNode);
    source.start(0);

    source.onended = () => {
      this.stopSound(name);
    };
    this.currentSources[name] = source;
  }

  public stopSound(name: string) {
    // MARK may need update

    const source = this.currentSources[name];
    if (source) {
      source.onended = null; // Remove the onended event listene
      source.stop();
      delete this.currentSources[name];
    } else {
      //   console.error(`No sound is currently playing for ${name}`);
    }
  }

  public toggleAudioContext(visible: boolean, ad?: boolean) {
    if (ad) {
      this.adsPause = this.audioContext.state === "suspended";
      if (this.adsPause) {
        return;
      }
    }
    if (visible) {
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
    } else {
      if (this.audioContext.state === "running") {
        this.audioContext.suspend();
      }
    }
  }

  public setMusicLevel(level: number) {
    this.musicLevel = level / 100; // Normalize to 0.0 - 1.0
    if (this.musicOn) {
      this.musicGainNode.gain.value = this.musicLevel;
    }
  }

  public setEffectsLevel(level: number) {
    this.effectsLevel = level / 100; // Normalize to 0.0 - 1.0
    if (this.effectsOn) {
      this.effectsGainNode.gain.value = this.effectsLevel;
    }
  }

  //   public toggleMusic(on: boolean) {
  //     this.musicOn = on;
  //     if (on) {
  //       this.musicGainNode.connect(this.audioContext.destination);
  //       this.musicGainNode.gain.value = this.musicLevel;
  //       this.playMusic("theme", true);
  //     } else {
  //       this.musicGainNode.disconnect(this.audioContext.destination);
  //     }
  //   }

  //   public toggleEffects(on: boolean) {
  //     this.effectsOn = on;
  //     if (on) {
  //       this.effectsGainNode.connect(this.audioContext.destination);
  //       this.effectsGainNode.gain.value = this.effectsLevel;
  //     } else {
  //       this.effectsGainNode.disconnect(this.audioContext.destination);
  //     }
  //   }

  // stopped disconnecting the destination so that the music can be played and effects can continue uses slightly more memory but causes less bugs
  public toggleMusic(on: boolean) {
    this.musicOn = on;
    if (on) {
      this.musicGainNode.gain.value = this.musicLevel;
    } else {
      this.musicGainNode.gain.value = 0;
    }
  }

  public toggleEffects(on: boolean) {
    this.effectsOn = on;
    if (on) {
      this.effectsGainNode.gain.value = this.effectsLevel;
    } else {
      this.effectsGainNode.gain.value = 0;
    }
  }
  public toggleVibration(on: boolean) {
    this.vibrationOn = on;
  }

  public vibrate(impact: Haptics) {
    if (this.vibrationOn) {
      switch (impact) {
        case "light":
        case "soft":
        case "heavy":
        case "medium":
        case "rigid":
          this.hapticFeedback.impactOccurred(impact);
          break;
        case "error":
        case "success":
        case "warning":
          this.hapticFeedback.notificationOccurred(impact);
          break;
        case "selection":
          this.hapticFeedback.selectionChanged();
          break;
      }
    }
  }
  public destroy(): void {
    if (this.audioContext.state !== "closed") {
      this.audioContext.close();
    }
    FxController.instance = null;
  }
}
