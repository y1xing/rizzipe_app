#!/bin/bash
# Step 1: Install Python dependencies using pip
pip install -r requirements.txt

# Step 2: Start the backend services using honcho (assuming you have honcho installed)
honcho start
