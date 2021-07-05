FROM node:14.17.1-alpine3.11
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# note: -S means system group/user
RUN addgroup -S linkbotg && adduser -S -G linkbotg linkbot
RUN chown linkbot:linkbotg /app
USER linkbot

CMD ["npm", "start"]
