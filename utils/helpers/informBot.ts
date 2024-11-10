import { ofetch } from "ofetch";
function normalizeMessageF(message: string) {
  return message.replace(/\r\n|\r|\n/g, "\n").trim();
}
// MARK USE IF WE WANT TO SEND ANY MESSAGES TO TELEGRAM NEEDS INTEGRATION OF ANNOUNCE API IN BOT TO NEW BOT.
function escapeTelegramMessage(message: string) {
  // Escape only the characters that Telegram requires to be escaped, excluding **
  // eslint-disable-next-line no-useless-escape
  return message.replace(/([_\[\]()~`>#+-=|{}.!\\])/g, "\\$1");
}
async function generateHmac(normalizedMessage: string): Promise<string> {
  const { PUBLIC_URL } = useRuntimeConfig().public;
  const { WORKER_API_KEY } = useRuntimeConfig();

  // DOESNT work on locale. test in staging
  const hmacHash = await fetch(`${PUBLIC_URL}/workerapi`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": WORKER_API_KEY as string,
    },
    body: JSON.stringify({ data: normalizedMessage }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data.hmac;
    });
  return hmacHash;
}
const informBot = async (
  mesage: string,
  ids = ["-4594226674"],
  inlineKeyboards?: string
) => {
  try {
    const { API_URL } = useRuntimeConfig().public;
    const formData = new FormData();
    const batchIds = ids;
    const escapedMessage = escapeTelegramMessage(mesage);
    // normalized message used for hmac hash
    const normalizeMessage = normalizeMessageF(escapedMessage);
    const hmacHash = await generateHmac(normalizeMessage).catch((error) => {
      console.error("Error generating hmac hash:", error);
      throw error;
    });

    formData.append("message", escapedMessage);
    formData.append("tgIds", JSON.stringify(batchIds));
    if (inlineKeyboards) {
      formData.append("inlineKeyboards", inlineKeyboards); //stringfy before sending
    }

    await ofetch(`${API_URL}/bot/announce`, {
      method: "POST",
      headers: {
        "x-hmac-hash": hmacHash,
      },
      body: formData,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export default informBot;
