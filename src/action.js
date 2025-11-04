import { formatQuery, formatMutation, graphql } from "@openimis/fe-core";
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


export function updateUserProfile(user) {
  const clientMutationLabel = "UpdateWorkforceInteractiveUser";

    const mutation = `mutation {
        updateWorkforceInteractiveUser(
          ${user?.id ? `id: "${user?.id}"` : ""}
          ${user?.email ? `emailId: "${user.email}"` : ""}
          ${user?.otherNames ? `otherNames: "${user.otherNames}"` : ""}
          ${user?.lastName ? `lastName: "${user.lastName}"` : ""}
          ${user?.phone ? `phone: "${user.phone}"` : ""}
        ) {
          success
        }
      }`;

        const requestedDateTime = new Date();
        return graphql(
          mutation,
          [
            "PROFILE_UPDATE_REQ",
            "PROFILE_UPDATE_RESP",
            "PROFILE_UPDATE_ERR",
          ],
          {
            clientMutationId: mutation.clientMutationId,
            clientMutationLabel,
            requestedDateTime,
          }
        );
}
// export function updateUserProfile(user) {
//   const clientMutationLabel = "UpdateWorkforceInteractiveUser";
//   const mutation = formatMutation(
//     "updateWorkforceInteractiveUser",
//     `
//       ${user?.id ? `id: "${user?.id}"` : ""}
//       ${user?.email ? `emailId: "${user.email}"` : ""}
//       ${user?.otherNames ? `otherNames: "${user.otherNames}"` : ""}
//       ${user?.lastName ? `lastName: "${user.lastName}"` : ""}
//       ${user?.phone ? `phone: "${user.phone}"` : ""}
//     `,
//     clientMutationLabel
//   );
//   const requestedDateTime = new Date();
//   return graphql(
//     mutation.payload,
//     [
//       "PROFILE_UPDATE_REQ",
//       "PROFILE_UPDATE_RESP",
//       "PROFILE_UPDATE_ERR",
//     ],
//     {
//       clientMutationId: mutation.clientMutationId,
//       clientMutationLabel,
//       requestedDateTime,
//     }
//   );
// }
