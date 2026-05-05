import dotenv from "dotenv";

let isEnvLoaded = false;

export const loadEnv = () => {
  if (isEnvLoaded) return;

  isEnvLoaded = true;
  dotenv.config();
};
