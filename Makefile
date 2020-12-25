make build:
	docker build -t ryanang/frontend_server:latest .

start:
	make build
	docker run -p 80:80 ryanang/frontend_server:latest

push:
	make build
	docker push ryanang/frontend_server:latest
