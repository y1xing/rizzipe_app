# Use the official Python image as the base image
FROM python:3.10

# Set the working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY . .

# Expose the port on which the Flask app will run
EXPOSE 5001 5002 5003 5004

# Start the Flask app using Honcho
CMD ["honcho", "start"]
