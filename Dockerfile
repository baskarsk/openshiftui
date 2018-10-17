FROM node:8.12.0-alpine
RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm install -g -s --no-progress yarn && \
    yarn && \
    yarn run build && \
    yarn cache clean
CMD [ "npm", "start" ]
EXPOSE 3005
