import { Environment } from "./environment.model";
import packageInfo from "../../package.json";
const server = "https://mqttcontrol.hunonicpro.com";

export const environment: Environment = {
  appVersion: packageInfo.version,
  production: false,
  appName: "shopshoes",
  api: server+"/api",
};

export const ACCESS_TOKEN_KEY: string = "__ocmI69Hl3avA#4d";
export const ACCESS_TOKEN_EXP: string = "__kfdsj85fm482se*7#";


export const getDeviveImgUrl = (id: string) => server+"/static/uploads/icon_device_"+id+".png";
