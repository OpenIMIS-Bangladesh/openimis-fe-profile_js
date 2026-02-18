import { WORKFORCE_USER_TYPE } from "./constants";
import { useDispatch, useSelector } from "react-redux";

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

export function getUserType() {
  const reduxState = useSelector((state) => state);
  const user_rights = reduxState.core.user.i_user.rights;
  return getUserTypeFromRights(user_rights);
}

export function getUserTypeFromRights(user_rights) {
  let user_type = WORKFORCE_USER_TYPE.APPLICANT;
  if (user_rights.includes(812001)) {
    user_type = WORKFORCE_USER_TYPE.CHECKER;
  } else if (user_rights.includes(819001)) {
    user_type = WORKFORCE_USER_TYPE.CHECKER_TWO;
  } else if (user_rights.includes(817001)) {
    user_type = WORKFORCE_USER_TYPE.SECTION_ADMIN;
  } else if (user_rights.includes(821002)) {
    user_type = WORKFORCE_USER_TYPE.SECTION_ADMIN_TWO;
  } else if (user_rights.includes(821003)) {
    user_type = WORKFORCE_USER_TYPE.SEC1_DEPUTI_ASST_DIRECTOR;
  } else if (user_rights.includes(821004)) {
    user_type = WORKFORCE_USER_TYPE.SEC2_DEPUTI_ASST_DIRECTOR;
  } else if (user_rights.includes(821005)) {
    user_type = WORKFORCE_USER_TYPE.BLWF_SECTION_ADMIN;
  } else if (user_rights.includes(821007)) {
    user_type = WORKFORCE_USER_TYPE.BLWF_DEPUTI_ASST_DIRECTOR;
  } else if (user_rights.includes(818001)) {
    user_type = WORKFORCE_USER_TYPE.DOCTOR;
  } else if (user_rights.includes(813001)) {
    user_type = WORKFORCE_USER_TYPE.APPROVER;
  } else if (user_rights.includes(821006)) {
    user_type = WORKFORCE_USER_TYPE.BLWF_APPROVER;
  } else if (user_rights.includes(814001)) {
    user_type = WORKFORCE_USER_TYPE.FACTORY_ADMIN;
  } else if (user_rights.includes(815001)) {
    user_type = WORKFORCE_USER_TYPE.DIRECTOR;
  } else if (user_rights.includes(812009)) {
    user_type = WORKFORCE_USER_TYPE.BLWF_DIRECTOR;
  } else if (user_rights.includes(816001)) {
    user_type = WORKFORCE_USER_TYPE.BGMEA_ASSOCIATION;
  } else if (user_rights.includes(821001)) {
    user_type = WORKFORCE_USER_TYPE.BKMEA_ASSOCIATION;
  } else if (user_rights.includes(812008)) {
    user_type = WORKFORCE_USER_TYPE.BLWF_CHECKER;
  } else if (user_rights.includes(813000)) {
    user_type = WORKFORCE_USER_TYPE.EIS_COORDINATOR;
  } else if (user_rights.includes(813002)) {
    user_type = WORKFORCE_USER_TYPE.EIS_OFFICER;
  } else if (user_rights.includes(813003)) {
    user_type = WORKFORCE_USER_TYPE.EIS_ADVISOR;
  } else if (user_rights.includes(813004)) {
    user_type = WORKFORCE_USER_TYPE.EIS_COMMITTEE;
  } else if (user_rights.includes(816000)) {
    user_type = WORKFORCE_USER_TYPE.EIS_ASSOCIATION_COMMITTEE;
  } else if (user_rights.includes(813005)) {
    user_type = WORKFORCE_USER_TYPE.BLWF_DOCTOR;
  } else if (user_rights.includes(813006)) {
    user_type = WORKFORCE_USER_TYPE.EIS_FINANCIAL_OFFICER;
  } else if (user_rights.includes(813007)) {
    user_type = WORKFORCE_USER_TYPE.EIS_DOCTOR;
  } else if (user_rights.includes(813008)) {
    user_type = WORKFORCE_USER_TYPE.BLWF_DOL_DIFE;
  } else if (user_rights.includes(813009)) {
    user_type = WORKFORCE_USER_TYPE.BEPZA_ASSOCIATION;
  } else if (user_rights.includes(814000)) {
    user_type = WORKFORCE_USER_TYPE.LFMEAB_ASSOCIATION;
  } else if (user_rights.includes(815000)) {
    user_type = WORKFORCE_USER_TYPE.SECRETARY;
  }else if (user_rights.includes(836001)) {
    user_type = WORKFORCE_USER_TYPE.ASSOCIATION;
  } else if (!isEmptyObject(user_rights)) {
    user_type = WORKFORCE_USER_TYPE.ADMIN;
  }

  return user_type;
}


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