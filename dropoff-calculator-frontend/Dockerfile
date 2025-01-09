# Use the official Node.js image as the base image
FROM node:23-alpine

# Set the working directory
WORKDIR /

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .


# Start the server
CMD ["node", "server.js"]
