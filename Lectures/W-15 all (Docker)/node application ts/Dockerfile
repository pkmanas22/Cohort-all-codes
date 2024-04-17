# Use the Node.js 20 image as the base
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package*(package.json and package-lock.json) and ./prisma to the container
COPY package* .
COPY ./prisma .

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Expose port 3000 for incoming connections
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]