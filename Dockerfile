# Use the Node.js 20 image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the package.json file to the container
COPY package*.json .

# Install the dependencies
RUN apt-get update && apt-get install -y ffmpeg
RUN npm install

# Copy all the source code to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
