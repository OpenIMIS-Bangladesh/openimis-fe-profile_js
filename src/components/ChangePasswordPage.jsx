import React, { useState, useMemo } from "react";
import { Box, Button, Paper, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  useGraphqlMutation,
  useTranslations,
  useModulesManager,
  TextInput,
  useAuthentication,
} from "@openimis/fe-core";

const StyledPage = styled(Box)(({ theme }) => ({
  ...theme.page,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.paper.paper,
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  ...theme.paper.title,
}));

const ChangePasswordPage = (props) => {
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("profile.ChangePasswordPage", modulesManager);
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState("");

  const isValid = useMemo(
    () => formValues.password && formValues.password === formValues.confirmPassword && formValues.oldPassword,
    [formValues]
  );

  const { mutate, isLoading } = useGraphqlMutation(
    `
    mutation changePassword ($input: ChangePasswordMutationInput!) {
      changePassword(input: $input) {
        clientMutationId
        success
        error
      }
    }
  `,
    { wait: false }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isValid) {
      setError(null);
      const result = await mutate({
        oldPassword: formValues.oldPassword,
        newPassword: formValues.password,
      });

      setError(result.changePassword?.error);
    }
  };

  return (
    <StyledPage>
      <StyledPaper>
        <StyledTitle variant="h6">
          {formatMessage("title")}
        </StyledTitle>
        <Box padding="10px">
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid xs={4} item>
                <TextInput
                  module="profile"
                  required
                  readOnly={isLoading}
                  type="password"
                  label={"ChangePasswordPage.oldPasswordLabel"}
                  onChange={(oldPassword) => setFormValues({ ...formValues, oldPassword })}
                />
              </Grid>
              <Grid xs={4} item>
                <TextInput
                  module="profile"
                  required
                  readOnly={isLoading}
                  type="password"
                  label={"ChangePasswordPage.newPasswordLabel"}
                  onChange={(password) => setFormValues({ ...formValues, password })}
                />
              </Grid>
              <Grid xs={4} item>
                <TextInput
                  module="profile"
                  readOnly={isLoading}
                  required
                  type="password"
                  label={"ChangePasswordPage.confirmPasswordLabel"}
                  onChange={(confirmPassword) => setFormValues({ ...formValues, confirmPassword })}
                />
              </Grid>
              {formValues.password !== formValues.confirmPassword && formValues.confirmPassword && formValues.password && (
                <Grid item xs={12}>
                  <Box color="error.main">{formatMessage("notEqualError")}</Box>
                </Grid>
              )}
              {error && (
                <Grid item xs={12}>
                  <Box color="error.main">{error}</Box>
                </Grid>
              )}
              <Grid item>
                <Button type="submit" color="primary" variant="contained" disabled={!isValid || isLoading}>
                  {formatMessage("submitButton")}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </StyledPaper>
    </StyledPage>
  );
};

export default ChangePasswordPage;
