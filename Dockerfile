FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Run next.js development server
RUN npm run dev

# Expose port 3000
EXPOSE 3000

# Run next.js development server
CMD [ "npm", "run", "dev" ]
