import informBot from "~/utils/helpers/informBot";

export default defineEventHandler(async (event) => {
  const { BOT_TOKEN } = useRuntimeConfig();

  const { referrerId, username } = await readBody(event);
  // body should include chat_id and text
  if (!BOT_TOKEN) {
    throw createError({
      statusCode: 500,
      statusMessage: "BOT_TOKEN is missing",
    });
  }
  // send message api telegram
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const refMessage = ` User ${username} has joined the game! With your help, they can reach the top!`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: referrerId,
        text: refMessage,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Play",
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

    // if no error, return success
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
