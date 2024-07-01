# Use the specified Node.js version
FROM node:20.15.0

# Set the user to root for necessary permissions
USER root

# Set the working directory inside the container
WORKDIR /MVStudio-Frontend

# Copy the package.json and package-lock.json files first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Run the build command
RUN npm run build

# Expose the port the app runs on
EXPOSE 4173

# Set the command to start the application
CMD ["npm", "run", "preview"]