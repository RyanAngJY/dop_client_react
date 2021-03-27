IMAGE_NAME=ryanang/dop_client_react:latest
.DEFAULT_GOAL := dev_start # set default target to run

# ======== Development ========
# For development server
dev_start:
	docker-compose down
	docker-compose up

# For development server (on Docker)
start: build
	docker run -p 80:80 $(IMAGE_NAME)

build_local:
	docker build -t $(IMAGE_NAME) . -f Dockerfile.local

shell: build_local # to enter the shell of the image
	docker run -it $(IMAGE_NAME) /bin/sh

# ========= Building Docker Image ===========
build:
	docker build -t $(IMAGE_NAME) .

# push to docker hub
push: build
	docker push $(IMAGE_NAME)
