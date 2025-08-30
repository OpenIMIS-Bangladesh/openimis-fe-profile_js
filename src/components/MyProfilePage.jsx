import React, { useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  useTranslations,
  useModulesManager,
  TextInput,
  FormattedMessage,
  ProgressOrError,
  ControlledField,
} from "@openimis/fe-core";

import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../action.js";

const StyledPage = styled('div')(({ theme }) => ({
  ...theme.page,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.paper.paper,
}));

const StyledTitle = styled('div')(({ theme }) => ({
  ...theme.paper.title,
}));

const StyledContainer = styled(TableContainer)(() => ({
  maxHeight: 700,
}));

const MyProfilePage = (props) => {

  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations(
    "profile.MyProfilePage",
    modulesManager
  );

  const dispatch = useDispatch();
  const fetchingUser = useSelector((store) => store.profile.fetchingUser);
  const errorUser = useSelector((store) => store.profile.errorUser);
  const user = useSelector((store) => store.profile.user);

  let regions = [];
  let districts = [];
  const locations = user?.iUser?.userdistrictSet;

  if (locations) {
    locations.map((location) => {
      if (!!location.location.parent && !districts.includes(location.location)) {
        districts.push(location.location.name);
      }
      if (!!location.location.parent && !regions.includes(location.location.parent.name)) {
        regions.push(location.location.parent.name);
      }
    });
  }

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  return (
    <StyledPage>
      <StyledPaper>
        <StyledTitle>
          <Typography variant="h6">
            {formatMessage("title")}
          </Typography>
        </StyledTitle>
        <Box padding="10px">
          <ProgressOrError progress={fetchingUser} error={errorUser} />
          <Grid container spacing={2}>
            <ControlledField
              module="profile"
              id="userName"
              field={
                <Grid item xs={4}>
                  <TextInput
                    module="profile"
                    label="userName"
                    name="userName"
                    value={user?.username}
                    variant="outlined"
                    readOnly={true}
                  />
                </Grid>
              }
            />

            <ControlledField
              module="profile"
              id="otherNames"
              field={
                <Grid item xs={4}>
                  <TextInput
                    module="profile"
                    label="otherNames"
                    name="otherNames"
                    value={user?.otherNames}
                    variant="outlined"
                    readOnly={true}
                  />
                </Grid>
              }
            />

            <ControlledField
              module="profile"
              id="LastName"
              field={
                <Grid item xs={4}>
                  <TextInput
                    module="profile"
                    label="lastName"
                    name="lastName"
                    value={user?.lastName}
                    variant="outlined"
                    readOnly={true}
                  />
                </Grid>
              }
            />

            <ControlledField
              module="profile"
              id="email"
              field={
                <Grid item xs={4}>
                  <TextInput
                    module="profile"
                    label="email"
                    name="email"
                    value={user?.email}
                    variant="outlined"
                    readOnly={true}
                  />
                </Grid>
              }
            />

            <ControlledField
              module="profile"
              id="phone"
              field={
                <Grid item xs={4}>
                  <TextInput
                    module="profile"
                    label="phone"
                    name="phone"
                    value={user?.phone}
                    variant="outlined"
                    readOnly={true}
                  />
                </Grid>
              }
            />

            <ControlledField
              module="profile"
              id="language"
              field={
                <Grid item xs={4}>
                  <TextInput
                    module="profile"
                    label="language"
                    name="language"
                    value={user?.iUser?.language?.name}
                    variant="outlined"
                    readOnly={true}
                  />
                </Grid>
              }
            />

            <Grid item xs={4}>
              <StyledContainer component={Paper}>
                <Table stickyHeader size="small" arial-label="Assigned Roles">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          "font-weight": "bold",
                          "text-align": "center",
                        }}
                      >
                        <FormattedMessage module="profile" id="roles" />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user &&
                      user?.iUser?.roles.map((role) => (
                        <TableRow key={role.name}>
                          <TableCell component="th" scope="row">
                            {role.name}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                              </StyledContainer>
            </Grid>
            <Grid item xs={4}>
              <StyledContainer component={Paper}>
                <Table stickyHeader size="small" arial-label="Assigned Regions">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          "font-weight": "bold",
                          "text-align": "center",
                        }}
                      >
                        <FormattedMessage module="profile" id="regions" />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user &&
                      regions.map((region) => (
                        <TableRow key={region}>
                          <TableCell component="th" scope="row">
                            {region}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                              </StyledContainer>
            </Grid>
            <Grid item xs={4}>
              <StyledContainer component={Paper}>
                <Table
                  stickyHeader
                  size="small"
                  arial-label="Assigned Districts"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          "font-weight": "bold",
                          "text-align": "center",
                        }}
                      >
                        <FormattedMessage module="profile" id="districts" />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user &&
                      districts.map((district) => (
                        <TableRow key={district}>
                          <TableCell component="th" scope="row">
                            {district}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                              </StyledContainer>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>
    </StyledPage>
  );
};

export default MyProfilePage;
