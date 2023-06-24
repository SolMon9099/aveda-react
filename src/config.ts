// @mui
import { enUS, frFR, zhCN, viVN, arSD, ptBR } from '@mui/material/locale';
import axios from 'axios';
// import firebase from 'firebase/compat/app';
// import 'firebase/firestore';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";

import 'moment/locale/pt-br';
// components
import { SettingsValueProps } from './components/settings/type';

// LAYOUT
// ----------------------------------------------------------------------

export const FIREBASE_API = {
  apiKey: "AIzaSyCuFkM1MNgwgjlIAXE_RSywaloNoG0pRM8",
  authDomain: "fir-adeva.firebaseapp.com",
  projectId: "fir-adeva",
  storageBucket: "fir-adeva.appspot.com",
  messagingSenderId: "191722235201",
  appId: "1:191722235201:web:67ac5c852acab3f543adc0",
  measurementId: "G-DF14EGSZKR"
};

export const app = firebase.initializeApp(FIREBASE_API);
export const storage = getStorage(app);
export const db = firebase.firestore()


export const BASE_URL = 'https://hom-comunidade.adeva.app/'
export const HOST_API = 'https://hom-comunidade-back.adeva.app/'
// export const BASE_URL = 'http://localhost:3000'
// export const HOST_API = 'http://localhost:2020'

export const api = axios.create({
  baseURL: HOST_API,
});

export const HEADER = {
  MOBILE_HEIGHT: 60,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 60,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 60 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

// SETTINGS
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const defaultSettings: SettingsValueProps = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeContrast: 'default',
  themeLayout: 'horizontal',
  themeColorPresets: 'blue',
  themeStretch: false,
};

// MULTI LANGUAGES
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'Português',
    value: 'pt',
    systemValue: ptBR,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: frFR,
    icon: '/assets/icons/flags/ic_flag_fr.svg',
  },
  {
    label: 'Vietnamese',
    value: 'vn',
    systemValue: viVN,
    icon: '/assets/icons/flags/ic_flag_vn.svg',
  },
  {
    label: 'Chinese',
    value: 'cn',
    systemValue: zhCN,
    icon: '/assets/icons/flags/ic_flag_cn.svg',
  },
  {
    label: 'Arabic (Sudan)',
    value: 'ar',
    systemValue: arSD,
    icon: '/assets/icons/flags/ic_flag_sa.svg',
  },
];

export const defaultLang = allLangs[0]; // English
