import { retrieveLaunchParams } from "@telegram-apps/sdk";
export async function cFetch(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  const { initDataRaw } = retrieveLaunchParams();
  const headers = new Headers(init?.headers || {});
  if (initDataRaw) headers.append("telegram-data", initDataRaw);

  const modifiedInit: RequestInit = {
    ...init,
    headers,
  };

  return fetch(input, modifiedInit);
}
