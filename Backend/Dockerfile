#  Dockerfile for Node Express Backend

FROM node:20.8.0-alpine

# Working directory be app
WORKDIR /app

# Install Dependencies
COPY package.json .

###  Installing dependencies
RUN npm install

# Copy app source code
COPY . .

# Exports
EXPOSE 3000

CMD ["npm","start"]
