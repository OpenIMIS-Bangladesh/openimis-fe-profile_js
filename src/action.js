import { formatQuery, graphql } from "@openimis/fe-core";
const ROLE_FULL_PROJECTION = () => [
  "username",
  "otherNames",
  "lastName",
  "email",
  "phone",
  "iUser{language{name},roles{id, name, altLanguage},userdistrictSet{location{name,parent{name}}}}",
];

export function fetchRoles(params) {
  const payload = formatQuery("user", params, ROLE_FULL_PROJECTION());
  return graphql(payload, "PROFILE_ROLES");
}


export function updateUserProfile(params) {
  const payload = formatQuery("user", params, ROLE_FULL_PROJECTION());
  return graphql(payload, "PROFILE_ROLES");
}
