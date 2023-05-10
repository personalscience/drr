# Use the official Node.js image as the base image
FROM node:18 

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the required packages
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Expose the port the frontend runs on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
