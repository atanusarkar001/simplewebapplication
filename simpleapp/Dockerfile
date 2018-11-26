#Step 1 is for building the app
FROM node:latest as node
COPY . /simpleapp 
WORKDIR /simpleapp
RUN npm install -g @angular/cli
RUN npm run build


#Step 2 is for running the application
FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node simpleapp/dist/* usr/share/nginx/html/
EXPOSE 80