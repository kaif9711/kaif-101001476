# Stage 1: The Builder Stage
# This stage installs dependencies and builds the app.
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker's layer caching.
COPY package*.json ./

# Install production dependencies using npm ci for faster, more reliable builds.
RUN npm ci --only=production

# Copy the rest of the application source code
COPY . .

# -----------------------------------------------------------------------------

# Stage 2: The Production Stage
# This stage creates the final, clean image.
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy the installed node_modules from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy the application source code from the builder stage
COPY --from=builder /usr/src/app .

# Expose the port the app runs on
EXPOSE 8080

# The command to run the application
CMD [ "npm", "start" ]
