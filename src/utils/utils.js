export const safeApplicationId = (applicationId, parsedApplicationData) => {
  console.log("applicationId", applicationId);
  console.log("parsedApplicationData", parsedApplicationData);
  if (applicationId && applicationId.length > 0 && applicationId[0]?.id) {
    return decodeId(applicationId[0].id);
  } else if (parsedApplicationData && parsedApplicationData?.id) {
    return parsedApplicationData?.id;
  } else {
    return null;
  }
};


export function extractId(item) {
  if (!item && item !== 0) return null;
  if (typeof item === "object" && item.id !== undefined) return item.id;
  return item;
}

function isNumericString(s) {
  return typeof s === "string" && /^[0-9]+$/.test(s);
}

function looksLikeBase64(s) {
  if (typeof s !== "string") return false;
  if (!/^[A-Za-z0-9+/=]+$/.test(s)) return false;
  if (s.length % 4 !== 0) return false;
  try {
    return btoa(atob(s)) === s;
  } catch (e) {
    return false;
  }
}

export function safeDecodeId(maybeEncoded) {
  if (maybeEncoded === null || maybeEncoded === undefined) return maybeEncoded;

  if (typeof maybeEncoded === "number") return maybeEncoded;

  if (typeof maybeEncoded === "object") {
    const extracted = extractId(maybeEncoded);
    if (extracted !== maybeEncoded) return safeDecodeId(extracted);
  }
  const s = String(maybeEncoded);
  if (isNumericString(s)) return s;

  if (looksLikeBase64(s)) {
    try {
      return decodeId(s);
    } catch (err) {
      return s;
    }
  }
  try {
    return decodeId(s);
  } catch (err) {
    return s;
  }
}