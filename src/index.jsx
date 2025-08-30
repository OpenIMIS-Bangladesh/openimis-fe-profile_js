import React from 'react';
import { Fingerprint, InsertEmoticon } from "@mui/icons-material";
import { FormattedMessage } from '@openimis/fe-core';
import ProfileToolbarContribution from "./components/ProfileToolbarContribution";
import ProfileMainMenu from "./components/ProfileMainMenu";
import ChangePasswordPage from "./components/ChangePasswordPage";
import messages_en from "./translations/en.json";
import MyProfilePage from "./components/MyProfilePage";
import { reducer } from "./reducer";

const DEFAULT_CONFIG = {
  translations: [{ key: "en", messages: messages_en }],
  "core.Router": [
    { path: "profile/changePassword", component: ChangePasswordPage },
    { path: "profile/myProfile", component: MyProfilePage },
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
      text: <FormattedMessage module="profile" id="menu.changePassword" />,
      icon: <Fingerprint />,
      route: "/profile/changePassword",
      id: "profile.changePassword",
    }
  ],
};

export const ProfileModule = (cfg) => {
  let config = { ...DEFAULT_CONFIG, ...cfg };
  cfg?.AppBarMenuContribution === true ? config['core.MainMenu'] = [] : config['core.AppBar'] = []
  return { ...config, ...cfg };
};
