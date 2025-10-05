# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code (including the 'static' folder)
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 8080

# Run index.js when the container launches
CMD [ "npm", "start" ]
