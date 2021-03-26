IMAGE_NAME=ryanang/dop_client_react:latest
.DEFAULT_GOAL := dev_start # set default target to run

build:
	docker build -t $(IMAGE_NAME) .

push_to_docker_hub:
	make build
	docker push $(IMAGE_NAME)

# ======== Development ========
build_local:
	docker build -t $(IMAGE_NAME) . -f Dockerfile.local

start:
	make build
	docker run -p 80:80 $(IMAGE_NAME)

dev_start:
	docker-compose up

shell: # to enter the shell of the image
	make build_local
	docker run -it $(IMAGE_NAME) /bin/sh
