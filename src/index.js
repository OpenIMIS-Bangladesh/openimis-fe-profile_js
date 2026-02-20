import React from 'react';
import { Fingerprint, InsertEmoticon, Edit } from "@material-ui/icons";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { FormattedMessage } from '@openimis/fe-core';
import ProfileToolbarContribution from "./components/ProfileToolbarContribution";
import ProfileMainMenu from "./components/ProfileMainMenu";
import ChangePasswordPage from "./components/ChangePasswordPage";
import messages_en from "./translations/en.json";
import messages_bn from "./translations/bn.json";
import MyProfilePage from "./components/MyProfilePage";
import { reducer } from "./reducer";
import MyProfileViewPage from './components/MyProfileViewPage';

const ExternalRedirect = () => {
  React.useEffect(() => {
    window.open("https://demo-liveverification.skydigitalbd.com/register", "_blank", "noopener,noreferrer");
    window.history.back(); // Take the user back so they don't see a blank page
  }, []);
  return null;
};

const DEFAULT_CONFIG = {
  translations: [{ key: "fr", messages: messages_bn }, { key: "en", messages: messages_en }],
  "core.Router": [
    { path: "profile/changePassword", component: ChangePasswordPage },
    { path: "profile/myProfile", component: MyProfileViewPage },
    { path: "profile/editProfile", component: MyProfilePage },
    { path: "profile/external-verification", component: ExternalRedirect },
  ],
  "core.MainMenu": [{ name: 'ProfileMainMenu', component: ProfileMainMenu }],
  reducers: [{ key: "profile", reducer }],
  "core.AppBar": [ProfileToolbarContribution],
  "profile.MainMenu": [
    {
      text: <FormattedMessage module="profile" id="menu.myProfile" />,
      icon: <InsertEmoticon />,
      route: "/profile/myProfile",
      id: "profile.myProfile",
    },
    {
      text: <FormattedMessage module="profile" id="menu.editProfile" />,
      icon: <Edit />,
      route: "/profile/editProfile",
      id: "profile.editProfile",
    },
    {
      text: <FormattedMessage module="profile" id="menu.changePassword" />,
      icon: <Fingerprint />,
      route: "/profile/changePassword",
      id: "profile.changePassword",
    },
    {
      text: <FormattedMessage module="profile" id="menu.beneficiary.verification" />,
      icon: <VerifiedUserIcon />,
      route: "/profile/external-verification",
      id: "profile.beneficiary.verification",
    }
  ],
};

export const ProfileModule = (cfg) => {
  let config = { ...DEFAULT_CONFIG, ...cfg };
  cfg?.AppBarMenuContribution === true ? config['core.MainMenu'] = [] : config['core.AppBar'] = []
  return { ...config, ...cfg };
};
