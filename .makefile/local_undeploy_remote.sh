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

    sshClient exec "docker compose -f /home/boilerplate-frontend-tanstack-router/app/ops/docker-compose.production.yml down"

    sshClient execf "rm -rf /home/boilerplate-frontend-tanstack-router/app"

    sshClient cleanup

}

main "$@"
