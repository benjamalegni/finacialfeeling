#!/bin/bash

echo "🧪 Testing n8n Docker Setup"

# Test if n8n command exists
echo "1. Testing n8n command..."
if command -v n8n &> /dev/null; then
    echo "✅ n8n command found"
else
    echo "❌ n8n command not found"
    echo "Installing n8n..."
    npm install -g n8n
fi

# Test Docker build
echo "2. Testing Docker build..."
docker build -t n8n-test .

# Test Docker run
echo "3. Testing Docker run..."
docker run -d --name n8n-test -p 5678:5678 \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=test123 \
  -e N8N_HOST=0.0.0.0 \
  -e N8N_PORT=5678 \
  n8n-test

# Wait for n8n to start
echo "4. Waiting for n8n to start..."
sleep 10

# Test webhook
echo "5. Testing webhook..."
curl -X POST http://localhost:5678/webhook-test/analyze-stocks \
  -H "Content-Type: application/json" \
  -d '{"stocks": ["AAPL", "TSLA"]}' \
  --max-time 10

# Cleanup
echo "6. Cleaning up..."
docker stop n8n-test
docker rm n8n-test

echo "✅ Test completed!" 