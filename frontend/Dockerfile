FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Change ownership of the app directory to the node user
RUN chown -R node:node /app

# Switch to the non-root node user
USER node

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
