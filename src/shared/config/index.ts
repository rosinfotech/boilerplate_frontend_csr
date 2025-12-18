export const API_URL = import.meta.env.VITE_API_URL;
export const APP_NAME = import.meta.env.VITE_APP_NAME;
export const APP_RELEASE_STAGE = import.meta.env.VITE_APP_RELEASE_STAGE;
export const APP_VERSION_SEMVER = import.meta.env.VITE_APP_VERSION_SEMVER;

export const BUILD_DEV_NAME = "development";
export const BUILD_MODE = import.meta.env.MODE;
export const BUILD_PROD_NAME = "production";

export const BUILD_IS_NOT_PRODUCTION = BUILD_MODE !== BUILD_PROD_NAME;

export const GIT_COMMIT_HASH = import.meta.env.VITE_GIT_COMMIT_HASH;
export const GIT_COMMIT_HASH_SHORT = import.meta.env.VITE_GIT_COMMIT_HASH_SHORT;
export const GIT_DISTANCE = import.meta.env.VITE_GIT_DISTANCE;
export const GIT_TAG = import.meta.env.VITE_GIT_TAG;
