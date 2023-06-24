FROM node:18.12.1 as build
WORKDIR '/app'
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
ENV NODE_OPTIONS=--max-old-space-size=8192
ENV GENERATE_SOURCEMAP=false
RUN npm install --legacy-peer-deps
COPY . /app
RUN npm run build
# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]