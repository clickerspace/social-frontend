export type SonarShowCallbackName =
  | "onStart"
  | "onShow"
  | "onRefresh"
  | "onReward"
  | "onClose"
  | "onError";
export type SonarShowCallback = () => void;

export type SonarShowParams = Partial<
  Record<SonarShowCallbackName, SonarShowCallback>
> & {
  adUnit: string;
};

export type SonarReturnStatus = "showing" | "hidden" | "removed" | "error";

export type SonarReturn = {
  status: SonarReturnStatus;
  message?: string;
};

export type SonarRemoveParams = {
  adUnit: string;
};

export interface Sonar {
  show(showParams: SonarShowParams): Promise<SonarReturn>;
  remove(removeParams: SonarRemoveParams): Promise<SonarReturn>;
}
