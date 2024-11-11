import { userStore } from "~/store/user";

import retry from "@/utils/helpers/Retry.js";
import { set } from "@vueuse/core";

const handleLogin = async (user: any) => {
  user.clearUser();
  try {
    const user = userStore();

    const { setLoading } = user;

    // const result = await retry(() => user.login(), 3, 1000);
    const result = true;

    if (result) {
      //   const me = await retry(() => user.me(), 3, 1000); // add me function to fit this app
      const me = true;
      if (me) {
        setLoading(false);
      } else {
        throw createError({
          statusCode: 500,
          message: "An error occurred while trying to login",
        });
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      throw createError(e);
    } else {
      throw createError({
        statusCode: 500,
        message: "An error occurred while trying to login",
      });
    }
  }
};
export default defineNuxtRouteMiddleware(async (to) => {
  // skip middleware on server
  if (import.meta.server) return;

  const user = userStore();

  const { setLoading } = user;
  setLoading(true);

  // remove this will be updated in login
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 500);

  // on every page load, set the seasonType to main since we are one page app
  // enable later
  nextTick(async () => {
    await handleLogin(user);
  });
});
