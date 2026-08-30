.PHONY: init
.SILENT: init

init:
	chmod +x .makefile/*.sh

clear: init
	.makefile/clear.sh

update_version: init
	.makefile/update_version.sh

git_commit_push: init
	.makefile/git_commit_push.sh "$(filter-out $@,$(MAKECMDGOALS))"

local_docker_compose_start: init
	docker compose -f ops/docker-compose.local.yml --env-file envs/.env.local up -d

local_docker_compose_stop: init
	docker compose -f ops/docker-compose.local.yml --env-file envs/.env.local down

local_deploy_remote: init
	.makefile/local_deploy_remote.sh

local_undeploy_remote: init
	.makefile/local_undeploy_remote.sh

%:
	@:
