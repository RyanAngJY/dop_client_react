IMAGE_NAME=ryanang/frontend_server:latest

build:
	docker build -t $(IMAGE_NAME) .

push_to_docker_hub:
	make build
	docker push $(IMAGE_NAME)

start:
	make build
	docker run -p 80:80 $(IMAGE_NAME)

dev_start:
	npm start
