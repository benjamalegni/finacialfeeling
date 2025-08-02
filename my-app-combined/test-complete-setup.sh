#!/bin/bash

echo "🧪 Testing Complete Setup - Railway n8n + GitHub Pages"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to test n8n webhook
test_n8n_webhook() {
    local url=$1
    echo -e "${YELLOW}Testing n8n webhook at: $url${NC}"
    
    response=$(curl -s -X POST "$url" \
        -H "Content-Type: application/json" \
        -d '{"stocks": ["AAPL", "TSLA", "MSFT"]}' \
        --max-time 10)
    
    if [ $? -eq 0 ] && [ ! -z "$response" ]; then
        echo -e "${GREEN}✅ n8n webhook working!${NC}"
        echo "Response: $response"
        return 0
    else
        echo -e "${RED}❌ n8n webhook failed${NC}"
        return 1
    fi
}

# Function to test Supabase connection
test_supabase() {
    echo -e "${YELLOW}Testing Supabase connection...${NC}"
    
    # This would require actual Supabase credentials
    # For now, just check if variables are set
    if [ ! -z "$NEXT_PUBLIC_SUPABASE_URL" ] && [ ! -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
        echo -e "${GREEN}✅ Supabase variables configured${NC}"
        return 0
    else
        echo -e "${RED}❌ Supabase variables not configured${NC}"
        return 1
    fi
}

# Function to test build
test_build() {
    echo -e "${YELLOW}Testing Next.js build...${NC}"
    
    if npm run build > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Build successful${NC}"
        return 0
    else
        echo -e "${RED}❌ Build failed${NC}"
        return 1
    fi
}

# Main test sequence
echo "1. Testing n8n webhook..."
if [ ! -z "$NEXT_PUBLIC_N8N_WEBHOOK_URL" ]; then
    test_n8n_webhook "$NEXT_PUBLIC_N8N_WEBHOOK_URL"
    n8n_result=$?
else
    echo -e "${YELLOW}⚠️  NEXT_PUBLIC_N8N_WEBHOOK_URL not set${NC}"
    echo "Please set it to: https://your-railway-app.railway.app/webhook-test/analyze-stocks"
    n8n_result=1
fi

echo ""
echo "2. Testing Supabase configuration..."
test_supabase
supabase_result=$?

echo ""
echo "3. Testing build..."
test_build
build_result=$?

echo ""
echo "📊 Test Results:"
echo "=================="

if [ $n8n_result -eq 0 ]; then
    echo -e "${GREEN}✅ n8n: Working${NC}"
else
    echo -e "${RED}❌ n8n: Failed${NC}"
fi

if [ $supabase_result -eq 0 ]; then
    echo -e "${GREEN}✅ Supabase: Configured${NC}"
else
    echo -e "${RED}❌ Supabase: Not configured${NC}"
fi

if [ $build_result -eq 0 ]; then
    echo -e "${GREEN}✅ Build: Successful${NC}"
else
    echo -e "${RED}❌ Build: Failed${NC}"
fi

echo ""
if [ $n8n_result -eq 0 ] && [ $supabase_result -eq 0 ] && [ $build_result -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! Ready for GitHub Pages deployment.${NC}"
else
    echo -e "${RED}⚠️  Some tests failed. Please fix the issues above.${NC}"
fi 