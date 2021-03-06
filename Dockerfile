# Production Docker Image
# stage1 - build react app first 
FROM docker.io/library/node:12.16.1-alpine3.9 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Ryan TODO: update to proper exposed kubernetes endpoint
ENV REACT_APP_BACKEND_BASE_URL=http://192.168.64.2:30002/api
ENV REACT_APP_SOCKET_BASE_URL=http://192.168.64.2:30002/

RUN npm run build

# # stage 2 - build the final image and copy the react build files
FROM nginx:1.17.8-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]