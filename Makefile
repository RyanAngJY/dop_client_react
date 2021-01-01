IMAGE_NAME=ryanang/frontend_server:latest

build:
	docker build -t $(IMAGE_NAME) .

push_to_docker_hub:
	make build
	docker push $(IMAGE_NAME)

start:
	make build
	docker run -p 80:80 $(IMAGE_NAME)

# ======== Development ========
shell: # to enter the shell of the image
	docker build -t $(IMAGE_NAME) . -f Dockerfile.local
	docker run -it $(IMAGE_NAME) /bin/sh

dev_start:
	npm start
