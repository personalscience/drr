# Use the official Python image as the base image
FROM python:3.10

# Set the working directory
WORKDIR /app

# Copy the requirements.txt to the working directory
COPY requirements.txt ./

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend source code
COPY . .

# Start the Flask app
CMD ["python", "app.py"]
