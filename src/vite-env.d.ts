/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_RELEASE_STAGE: string;
    readonly VITE_APP_VERSION_SEMVER: string;
    readonly VITE_GIT_COMMIT_HASH: string;
    readonly VITE_GIT_COMMIT_HASH_SHORT: string;
    readonly VITE_GIT_DISTANCE: string;
    readonly VITE_GIT_TAG: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
