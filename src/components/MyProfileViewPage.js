import React, { useEffect, useState } from "react";
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Chip,
  Hidden,
} from "@material-ui/core";
import {
  Person,
  Email,
  Phone,
  Language,
  Security,
  LocationOn,
  AccountBox,
  Dashboard,
  Settings,
  ExitToApp,
  Edit
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
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
import ChangePasswordPage from "./ChangePasswordPage.js";
import MyProfilePage from "./MyProfilePage.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: theme.palette.grey[100],
  },
  sidebar: {
    width: 280,
    background: theme.palette.primary.main,
    color: "#fff",
    padding: theme.spacing(3, 0),
    boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
    zIndex: 1,
  },
  sidebarCollapsed: {
    width: 70,
    padding: theme.spacing(2, 0),
    alignItems: "center",
  },
  sidebarHeader: {
    padding: theme.spacing(2, 3),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: theme.palette.secondary.main,
  },
  userInfo: {
    "& h6": { fontWeight: 600 },
    "& p": { opacity: 0.9, fontSize: "0.9rem" },
  },
  listItem: {
    borderRadius: "0 30px 30px 0",
    margin: "4px 12px",
    "&.Mui-selected": {
      backgroundColor: "rgba(255,255,255,0.2)",
      "&:hover": {
        backgroundColor: "rgba(255,255,255,0.3)",
      },
    },
  },
  listItemText: {
    "& span": { fontWeight: 500 },
  },
  listItemIcon: {
    color: "#fff",
    minWidth: 40,
  },
  mainContent: {
    flexGrow: 1,
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  profileCard: {
    padding: theme.spacing(4),
    borderRadius: 16,
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
    background: "#fff",
  },
  sectionTitle: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.primary.main,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  infoGrid: {
    marginBottom: theme.spacing(3),
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[50],
    borderRadius: 12,
    border: `1px solid ${theme.palette.divider}`,
  },
  infoLabel: {
    fontWeight: 500,
    color: theme.palette.text.secondary,
    minWidth: 120,
  },
  tableContainer: {
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
    marginTop: theme.spacing(2),
  },
  tableHeader: {
    backgroundColor: theme.palette.primary.main,
    "& th": {
      color: "#fff",
      fontWeight: 600,
      textAlign: "center",
    },
  },
  chip: {
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.secondary.light,
    color: "#004b6eff",
  },
}));

// Sidebar Menu Items
const SidebarMenu = [
  { id: "dashboard", text: "menu.dashboard", icon: <Dashboard /> , redirect_url: '' },
  { id: "profile", text: "menu.myProfile", icon: <AccountBox />, redirect_url: '' },
  { id: "change_password", text: "menu.changePassword", icon: <Security />, redirect_url: '' },
  { id: "editProfile", text: "menu.editProfile", icon: <Edit />, redirect_url: '' },
  // { id: "logout", text: "core.tooltip.logout", icon: <ExitToApp />, redirect_url: '' },
];


const MyProfile =() =>{
    const classes = useStyles();
    const modulesManager = useModulesManager();
    const { formatMessage } = useTranslations("profile.MyProfilePage", modulesManager);

    const fetchingUser = useSelector((store) => store.profile.fetchingUser);
    const errorUser = useSelector((store) => store.profile.errorUser);
    const user = useSelector((store) => store.profile.user);
    return (
      <Box className={classes.mainContent}>
        <Paper className={classes.profileCard}>
          <Typography variant="h4" className={classes.sectionTitle}>
            <Person fontSize="large" />
            {formatMessage("title")}
          </Typography>

          <ProgressOrError progress={fetchingUser} error={errorUser} />

          {/* User Info Grid */}
          <Grid container spacing={3} className={classes.infoGrid}>
            <Grid item xs={12} md={6}>
              <div className={classes.infoItem}>
                <Person color="primary" />
                <Box>
                  <Typography className={classes.infoLabel}> {formatMessage("profile.userName")}</Typography>
                  <Typography variant="h6">{user?.username || "-"}</Typography>
                </Box>
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div className={classes.infoItem}>
                <Email color="primary" />
                <Box>
                  <Typography className={classes.infoLabel}> {formatMessage("profile.email")}</Typography>
                  <Typography variant="h6">{user?.email || "-"}</Typography>
                </Box>
              </div>
            </Grid>

            <Grid item xs={12} md={3}>
              <div className={classes.infoItem}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccountBox color="primary" />
                </Box>
                <Box>
                  <Typography className={classes.infoLabel}>{formatMessage("profile.otherNames")}</Typography>
                  <Typography variant="h6">
                    {user?.otherNames}
                  </Typography>
                </Box>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={classes.infoItem}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccountBox color="primary" />
                </Box>
                <Box>
                  <Typography className={classes.infoLabel}>{formatMessage("profile.lastName")}</Typography>
                  <Typography variant="h6">
                    {user?.lastName}
                  </Typography>
                </Box>
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div className={classes.infoItem}>
                <Phone color="primary" />
                <Box>
                  <Typography className={classes.infoLabel}>{formatMessage("profile.phone")}</Typography>
                  <Typography variant="h6">{user?.phone || "-"}</Typography>
                </Box>
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div className={classes.infoItem}>
                <Language color="primary" />
                <Box>
                  <Typography className={classes.infoLabel}>{formatMessage("profile.language")}</Typography>
                  <Typography variant="h6">
                    {user?.iUser?.language?.name || "Not set"}
                  </Typography>
                </Box>
              </div>
            </Grid>
          </Grid>

          {/* Roles, Regions, Districts */}
          <Grid container spacing={4}>
            {/* Roles */}
            <Grid item xs={12} md={12}>
              <Typography variant="h6" className={classes.sectionTitle}>
                <Security /> {formatMessage("profile.roles")}
              </Typography>
              <TableContainer className={classes.tableContainer}>
                <Table size="small">
                  <TableHead>
                    <TableRow className={classes.tableHeader}>
                      <TableCell>{formatMessage("profile.role")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user?.iUser?.roles?.length ? (
                      user?.iUser?.roles.map((role) => (
                        <TableRow key={role.name}>
                          <TableCell>
                            <Chip label={role.name} className={classes.chip} size="small" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell align="center" colSpan={1}>
                          <em>No roles assigned</em>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
}

const MyProfileViewPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedMenu, setSelectedMenu] = useState("myProfile");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const user = useSelector((store) => store.profile.user);

  // Extract regions & districts
  let regions = [];
  let districts = [];
  const locations = user?.iUser?.userdistrictSet || [];

  locations.forEach((location) => {
    const district = location.location;
    const region = district?.parent;

    if (district && !districts.includes(district.name)) {
      districts.push(district.name);
    }
    if (region && !regions.includes(region.name)) {
      regions.push(region.name);
    }
  });

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);


  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
        window.location.href = '/';
        return;
      case "editProfile":
        return <MyProfilePage />;
      case "change_password":
        return <ChangePasswordPage />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <Box className={classes.root}>
      {/* Sidebar */}
      <Hidden smDown={sidebarOpen}>
        <Paper
          className={`${classes.sidebar} ${!sidebarOpen && classes.sidebarCollapsed}`}
          elevation={3}
        >
          <Box className={classes.sidebarHeader}>
            {/* <Avatar className={classes.avatar}>
              {user?.username?.[0]?.toUpperCase() || "U"}
            </Avatar>
            {sidebarOpen && (
              <Box className={classes.userInfo}>
                <Typography variant="h6">{user?.username || "..."}</Typography>
                <Typography variant="body2">{user?.iUser?.roles?.[0]?.name || "User"}</Typography>
              </Box>
            )} */}
          </Box>

          <Divider style={{ backgroundColor: "rgba(255,255,255,0.2)", margin: "16px 0" }} />

          <List>
            {SidebarMenu.map((item) => (
              <ListItem
                button
                key={item.id}
                selected={selectedMenu === item.id}
                onClick={() => setSelectedMenu(item.id)}
                className={classes.listItem}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  {item.icon}
                </ListItemIcon>
                {sidebarOpen && (
                  <ListItemText
                    primary={<FormattedMessage module="profile" id={item.text} />}
                    className={classes.listItemText}
                  />
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      </Hidden>

      {/* Main Content */}
      {renderContent()}
      
    </Box>
  );
};

export default MyProfileViewPage;