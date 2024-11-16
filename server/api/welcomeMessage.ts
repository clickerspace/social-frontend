import informBot from "~/utils/helpers/informBot";

export default defineEventHandler(async (event) => {
  const { BOT_TOKEN } = useRuntimeConfig();

  const { telegramId } = await readBody(event);

  // body should include chat_id and text
  if (!BOT_TOKEN) {
    throw createError({
      statusCode: 500,
      statusMessage: "BOT_TOKEN is missing",
    });
  }
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: telegramId,
        text: `
            Welcome to Social Clicker 🚀
        `,
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Telegram", url: "https://t.me/clickerfarm" },
              { text: "Twitter", url: "https://x.com/clickerfarm" },
            ],
            [
              {
                text: "Discord",
                url: "https://discord.com/invite/clickerfarm",
              },
              {
                text: "Youtube",
                url: "https://www.youtube.com/@clickerfarm",
              },
            ],
            [
              {
                text: "Instagram",
                url: "https://www.instagram.com/clickerfarm",
              },
              {
                text: "Facebook",
                url: "https://www.facebook.com/farmclicker",
              },
            ],
            [
              {
                text: "Tiktok",
                url: "https://www.tiktok.com/@clickerfarm",
              },
              { text: "Kick", url: "https://kick.com/clickerfarm" },
            ],
            [{ text: "Website", url: "https://clicker.farm/" }],
            [
              {
                text: "Play FarmClicker",
                url: "https://t.me/clicker_farm_bot/game",
              },
            ],
            [
              {
                text: "Play SocialClicker",
                url: "https://t.me/clickersocial_bot/game",
              },
            ],
          ],
        },
      }),
    });

    if (!response.ok) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error sending message",
      });
    }

    return { success: true };

    // Return a success response or handle accordingly
  } catch (error) {
    console.error("Error sending message:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error sending message",
    });
    // Handle error, possibly return an error response
  }
});
