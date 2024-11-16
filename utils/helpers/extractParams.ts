interface ExtractedParams {
  referrerId?: string;
  lang?: string;
  referrerLang?: string;
  code?: string;
  discord?: string;
}

function extractParameters(
  paramValue: string | undefined | null,
): ExtractedParams {
  if (!paramValue) {
    return {
      referrerId: undefined,
      lang: undefined,
      referrerLang: "en",
      code: undefined,
      discord: undefined,
    };
  }

  // Regular expression to match parameters with prefixes r_, lang_, rl_, code_, and discord_
  // and allow both _ and - as separators
  const regex =
    /(?:r[_-](\d+))|(?:lang[_-]([a-zA-Z]+))|(?:rl[_-]([a-zA-Z]+))|(?:code[_-]([a-zA-Z0-9]+))|(?:discord[_-]([a-zA-Z0-9]+))/g;
  const matches = paramValue.matchAll(regex);
  const result: ExtractedParams = {};

  for (const match of matches) {
    if (match[1]) {
      result.referrerId = match[1];
    } else if (match[2]) {
      result.lang = match[2];
    } else if (match[3]) {
      result.referrerLang = match[3];
    } else if (match[4]) {
      result.code = match[4];
    } else if (match[5]) {
      result.discord = match[5];
    }
  }

  if (!result.lang) {
    result.lang = "en";
  }
  if (!result.referrerLang) {
    result.referrerLang = "en";
  }

  return Object.keys(result).length > 0
    ? result
    : {
        referrerId: undefined,
        lang: undefined,
        referrerLang: "en",
        code: undefined,
        discord: undefined,
      };
}

export default extractParameters;
