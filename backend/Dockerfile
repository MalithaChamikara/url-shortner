#use official node.js image
FROM node:18-alpine3.17

# Set the working directory in the container to /app
WORKDIR /app

# copy package files  and install dependencies
COPY package*.json ./
RUN npm install 

# Copy source code into the container
COPY . .

# Expose the backend server port
EXPOSE 5000 

# Start the server
CMD ["npm", "start"]