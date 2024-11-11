import { defineAsyncComponent } from "vue";
import retry from "@/utils/helpers/Retry";
import Loading from "@/components/Loading.vue";

export function defineAsyncComponentWithRetry(loader: () => Promise<any>) {
  return defineAsyncComponent({
    loader: () => retry(loader),
    loadingComponent: Loading,
  });
}
