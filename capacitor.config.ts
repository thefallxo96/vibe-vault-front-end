import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "com.vibevault.app",     // unique ID for Apple/Android stores
  appName: "VibeVault",           // your app name
  webDir: "build",                // where CRA saves the final build
  bundledWebRuntime: false
};

export default config;
