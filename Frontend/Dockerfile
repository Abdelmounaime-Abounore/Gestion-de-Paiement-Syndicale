# Dockerfile for React client

FROM node:20.8.0-alpine

# Working directory be app
WORKDIR /app

# Install Dependencies
COPY package.json .

###  Installing dependencies
RUN npm install

# copy local files to app folder
COPY . .

# Exports
EXPOSE 5173

CMD ["npm","run","dev"]