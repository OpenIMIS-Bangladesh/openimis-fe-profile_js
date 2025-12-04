import { formatQuery, formatMutation, graphql,formatGQLString,formatPageQueryWithCount } from "@openimis/fe-core";
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
export function formatWorkforceDocumentGQL(workforceDocumentType) {

  return `
    ${workforceDocumentType?.id ? `id: "${workforceDocumentType?.id}"` : ""}
    ${workforceDocumentType?.workforceApplicationId ? `workforceApplicationId: "${workforceDocumentType?.workforceApplicationId}"` : ""}
    ${workforceDocumentType?.applicationSummaryId ? `applicationSummaryId: "${workforceDocumentType?.applicationSummaryId}"` : ""}
    ${workforceDocumentType?.factoryId ? `factoryId: "${workforceDocumentType?.factoryId}"` : ""}
    ${workforceDocumentType?.workforceDependentId ? `workforceDependentId: "${workforceDocumentType?.workforceDependentId}"` : ""}
    ${workforceDocumentType?.workforceDocumentTypeId ? `workforceDocumentTypeId: "${workforceDocumentType?.workforceDocumentTypeId}"` : ""}
    ${workforceDocumentType?.path ? `path: "${workforceDocumentType?.path}"` : ""}
    ${workforceDocumentType?.url ? `url: "${workforceDocumentType?.url}"` : ""}

    ${workforceDocumentType?.documentType ? `documentType: "${formatGQLString(workforceDocumentType?.documentType)}"` : ""}
    ${workforceDocumentType?.holderType ? `holderType: "${workforceDocumentType?.holderType}"` : ""}
    ${workforceDocumentType?.holderId ? `holderId: "${workforceDocumentType?.holderId}"` : ""}
    ${workforceDocumentType?.verifierId ? `verifierId: "${formatGQLString(workforceDocumentType?.verifierId)}"` : ""}
    ${workforceDocumentType?.approverId ? `approverId: "${formatGQLString(workforceDocumentType?.approverId)}"` : ""}
    ${workforceDocumentType?.submissionDate ? `submissionDate: "${formatGQLString(workforceDocumentType?.submissionDate)}"` : ""}
    ${workforceDocumentType?.approvalDate ? `approvalDate: "${formatGQLString(workforceDocumentType?.approvalDate)}"` : ""}
    ${workforceDocumentType?.remarks ? `remarks: "${formatGQLString(workforceDocumentType?.remarks)}"` : ""}
    ${workforceDocumentType?.status ? `status: "${formatGQLString(workforceDocumentType?.status)}"` : ""}
    ${workforceDocumentType?.note ? `note: "${formatGQLString(workforceDocumentType?.note)}"` : ""}
  `;
}
export function createWorkforceDocument(
  workforceDocumentType,
  clientMutationLabel
) {
  const mutation = formatMutation(
    "createWorkforceDocument",
    formatWorkforceDocumentGQL(workforceDocumentType),
    clientMutationLabel
  );
  const requestedDateTime = new Date();
  return graphql(
    mutation.payload,
    [
      "DOCUMENT_MUTATION_REQ",
      "DOCUMENT_CREATE_DOCUMENT_RESP",
      "DOCUMENT_MUTATION_ERR",
    ],
    {
      clientMutationId: mutation.clientMutationId,
      clientMutationLabel,
      requestedDateTime,
    }
  );
}

export function fetchWorkforceDocument(mm, filters) {
  const projections = [
    "id",
    "path",
    "url",
    "status",
    "documentType",
    "holderType",

    "note",
    "workforceApplication{id}",
    "workforceDocumentType{id,nameBn,nameEn,documentType,mandatoryForApplicant,formStepNo,fieldId}",

  ];
  const payload = formatPageQueryWithCount(
    "workforceDocuments",
    filters,
    projections
  );
  return graphql(payload, "WORKFORCE_DOCUMENT");
}


export const setUploadedFiles = (fieldKey, files) => ({
  type: "SET_UPLOADED_FILES",
  payload: { fieldKey, files },
});

export const removeUploadedFile = (fieldKey, fileName) => ({
  type: "REMOVE_UPLOADED_FILE",
  payload: { fieldKey, fileName },
});