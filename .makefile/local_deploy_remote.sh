#!/bin/bash

set -e

source ./.makefile/setup.sh
source ./.makefile/ssh_client.sh
source ./.makefile/ssh_file_upload.sh
source ./.makefile/ssh_directory_upload.sh
source ./.makefile/get_home_secret.sh

main() {

    local host=$(getHomeSecret '.tech.rosinfo.demo.boilerplate_frontend_tanstack_router.ssh.host')
    local port=$(getHomeSecret '.tech.rosinfo.demo.boilerplate_frontend_tanstack_router.ssh.port')
    local username=$(getHomeSecret '.tech.rosinfo.demo.boilerplate_frontend_tanstack_router.ssh.username')
    local password=$(getHomeSecret '.tech.rosinfo.demo.boilerplate_frontend_tanstack_router.ssh.password')

    if [ -z "$host" ] || [ -z "$port" ] || [ -z "$username" ] || [ -z "$password" ]; then
        echo "Error: Failed to load SSH secrets from $SECRETS_FILE"
        exit 1
    fi

    sshClient init "$host" "$port" "$username" "$password"

    npm run format:fix

    npm run lint:fix

    npm run stylelint:fix

    sshClient execf "docker compose -f /home/boilerplate-frontend-tanstack-router/app/ops/docker-compose.production.yml down"

    sshClient execf "rm -rf /home/boilerplate-frontend-tanstack-router/app"

    sshClient execf "mkdir -p /home/boilerplate-frontend-tanstack-router/app"

    sshFileUpload "./package.json" "/home/boilerplate-frontend-tanstack-router/app/package.json"

    sshFileUpload "./package-lock.json" "/home/boilerplate-frontend-tanstack-router/app/package-lock.json"

    sshFileUpload "./vite.config.ts" "/home/boilerplate-frontend-tanstack-router/app/vite.config.ts"

    sshFileUpload "./vitest.config.ts" "/home/boilerplate-frontend-tanstack-router/app/vitest.config.ts"

    sshFileUpload "./tsconfig.json" "/home/boilerplate-frontend-tanstack-router/app/tsconfig.json"

    sshFileUpload "./capacitor.config.ts" "/home/boilerplate-frontend-tanstack-router/app/capacitor.config.ts"

    sshDirectoryUpload "./envs" "/home/boilerplate-frontend-tanstack-router/app/envs" "/.DS_Store"

    sshDirectoryUpload "./ops" "/home/boilerplate-frontend-tanstack-router/app/ops" "/.DS_Store"

    sshDirectoryUpload "./public" "/home/boilerplate-frontend-tanstack-router/app/public" "/.DS_Store"

    sshDirectoryUpload "./src" "/home/boilerplate-frontend-tanstack-router/app/src" "/.DS_Store"

    sshDirectoryUpload "./.mock" "/home/boilerplate-frontend-tanstack-router/app/.mock" "/.DS_Store"

    sshDirectoryUpload "./.scripts" "/home/boilerplate-frontend-tanstack-router/app/.scripts" "/.DS_Store"

    sshClient execf "chmod -R 0775 /home/boilerplate-frontend-tanstack-router/app"

    sshClient execf "chown -R boilerplate-frontend-tanstack-router:www /home/boilerplate-frontend-tanstack-router/app"

    sshClient exec "docker compose -f /home/boilerplate-frontend-tanstack-router/app/ops/docker-compose.production.yml up -d"

    sshClient cleanup

}

main "$@"
