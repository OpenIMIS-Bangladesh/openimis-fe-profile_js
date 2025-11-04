import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Select,MenuItem,
  FormControl, InputLabel
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  useTranslations,
  useModulesManager,
  TextInput,
  FormattedMessage,
  ProgressOrError,
  ControlledField,
  SelectInput
} from "@openimis/fe-core";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, updateUserProfile } from "../action.js"; // 👈 add updateUserProfile action

const useStyles = makeStyles((theme) => ({
  page: theme.page,
  paper: theme.paper.paper,
  title: theme.paper.title,
  container: {
    maxHeight: 700,
  },
}));

const MyProfilePage = () => {
  const classes = useStyles();
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("profile.MyProfilePage", modulesManager);

  const dispatch = useDispatch();
  const fetchingUser = useSelector((store) => store.profile.fetchingUser);
  const errorUser = useSelector((store) => store.profile.errorUser);
  const user = useSelector((store) => store.profile.user);

  const [formData, setFormData] = useState({
    userName: "",
    otherNames: "",
    lastName: "",
    email: "",
    phone: "",
    language: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user?.username || "",
        otherNames: user?.otherNames || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        language: user?.iUser?.language?.name==="বাংলা"?"fr":"en" || "",
      });
      console.log("User data loaded:", user);
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    dispatch(updateUserProfile(formData));
  };

  return (
    <Box className={classes.page}>
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h6">
          {formatMessage("editTitle")}
        </Typography>
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
                    value={formData.userName}
                    onChange={(v) => handleChange("userName", v)}
                    variant="outlined"
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
                    value={formData.otherNames}
                    onChange={(v) => handleChange("otherNames", v)}
                    variant="outlined"
                  />
                </Grid>
              }
            />

            <ControlledField
              module="profile"
              id="lastName"
              field={
                <Grid item xs={4}>
                  <TextInput
                    module="profile"
                    label="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(v) => handleChange("lastName", v)}
                    variant="outlined"
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
                    value={formData.email}
                    onChange={(v) => handleChange("email", v)}
                    variant="outlined"
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
                    value={formData.phone}
                    onChange={(v) => handleChange("phone", v)}
                    variant="outlined"
                  />
                </Grid>
              }
            />

            <Grid item xs={4}>
              <FormControl fullWidth>
                  <InputLabel id="language">{formatMessage("profile.language")}</InputLabel>
                  <Select
                    module="profile"
                    labelId="language"
                    value={formData.language}
                    label="language"
                    name="language"
                    variant="outlined"
                    onChange={(e) => handleChange("language", e.target.value)}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="fr">বাংলা</MenuItem>
                  </Select>
              </FormControl>
            </Grid>
          {/* 
            <ControlledField
              module="profile"
              id="language"
              field={
                <Grid item xs={4}>
                  <TextInput
                    module="profile"
                    label="language"
                    name="language"
                    value={formData.language}
                    onChange={(v) => handleChange("language", v)}
                    variant="outlined"
                  />
                </Grid>
              }
            /> */}

            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={saveProfile}
              >
                <FormattedMessage module="profile" id="saveProfile" />
              </Button>
            </Grid>


            {/* <Grid item xs={4}>
              <TableContainer component={Paper} className={classes.container}>
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
              </TableContainer>
            </Grid> */}
            {/* <Grid item xs={4}>
              <TableContainer component={Paper} className={classes.container}>
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
              </TableContainer>
            </Grid> */}
            {/* <Grid item xs={4}>
              <TableContainer component={Paper} className={classes.container}>
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
              </TableContainer>
            </Grid> */}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default MyProfilePage;
