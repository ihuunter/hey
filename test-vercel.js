#!/usr/bin/env node

// Test script for Vercel deployment
const https = require('https');
const http = require('http');

// Configure your deployed URLs here
const API_URL = process.env.API_URL || 'https://your-api-project.vercel.app';
const WEB_URL = process.env.WEB_URL || 'https://your-web-project.vercel.app';

console.log('🧪 Testing Vercel Deployment...\n');

// Helper function to make HTTP requests
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

// Test 1: API Health Check
async function testAPIHealth() {
  try {
    console.log('🔍 Testing API Health...');
    const response = await makeRequest(`${API_URL}/health`);
    
    if (response.statusCode === 200) {
      console.log('✅ API Health: PASS');
      console.log('   Response:', JSON.parse(response.body));
    } else {
      console.log('❌ API Health: FAIL');
      console.log('   Status:', response.statusCode);
    }
  } catch (error) {
    console.log('❌ API Health: ERROR');
    console.log('   Error:', error.message);
  }
}

// Test 2: GraphQL Endpoint
async function testGraphQL() {
  try {
    console.log('\n🔍 Testing GraphQL Endpoint...');
    const query = JSON.stringify({
      query: '{ posts(limit: 1) { id content createdAt } }'
    });
    
    const response = await makeRequest(`${API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: query
    });
    
    if (response.statusCode === 200) {
      console.log('✅ GraphQL: PASS');
      const data = JSON.parse(response.body);
      console.log('   Response:', data);
    } else {
      console.log('❌ GraphQL: FAIL');
      console.log('   Status:', response.statusCode);
      console.log('   Response:', response.body);
    }
  } catch (error) {
    console.log('❌ GraphQL: ERROR');
    console.log('   Error:', error.message);
  }
}

// Test 3: Frontend Deployment
async function testFrontend() {
  try {
    console.log('\n🔍 Testing Frontend Deployment...');
    const response = await makeRequest(WEB_URL);
    
    if (response.statusCode === 200) {
      console.log('✅ Frontend: PASS');
      console.log('   Status:', response.statusCode);
      console.log('   Content-Type:', response.headers['content-type']);
    } else {
      console.log('❌ Frontend: FAIL');
      console.log('   Status:', response.statusCode);
    }
  } catch (error) {
    console.log('❌ Frontend: ERROR');
    console.log('   Error:', error.message);
  }
}

// Test 4: CORS Configuration
async function testCORS() {
  try {
    console.log('\n🔍 Testing CORS Configuration...');
    const response = await makeRequest(`${API_URL}/graphql`, {
      method: 'OPTIONS',
      headers: {
        'Origin': WEB_URL,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    
    const corsHeaders = response.headers['access-control-allow-origin'];
    if (corsHeaders) {
      console.log('✅ CORS: PASS');
      console.log('   Allowed Origin:', corsHeaders);
    } else {
      console.log('⚠️  CORS: WARNING - No CORS headers found');
    }
  } catch (error) {
    console.log('❌ CORS: ERROR');
    console.log('   Error:', error.message);
  }
}

// Run all tests
async function runTests() {
  console.log(`🎯 Testing deployment:`);
  console.log(`   API: ${API_URL}`);
  console.log(`   Web: ${WEB_URL}\n`);
  
  await testAPIHealth();
  await testGraphQL();
  await testFrontend();
  await testCORS();
  
  console.log('\n🎉 Test Summary:');
  console.log('✅ = Test passed');
  console.log('❌ = Test failed');
  console.log('⚠️  = Test warning');
  
  console.log('\n📝 Next Steps:');
  console.log('1. Visit your web app:', WEB_URL);
  console.log('2. Check GraphQL playground:', `${API_URL}/graphql`);
  console.log('3. Monitor logs in Vercel dashboard');
}

// Handle command line arguments
if (process.argv.length > 2) {
  const apiUrl = process.argv[2];
  const webUrl = process.argv[3];
  
  if (apiUrl) {
    process.env.API_URL = apiUrl;
  }
  if (webUrl) {
    process.env.WEB_URL = webUrl;
  }
}

// Run the tests
runTests().catch(console.error);

// Usage instructions
if (process.argv.length === 2) {
  console.log('\n💡 Usage:');
  console.log('node test-vercel.js <api-url> <web-url>');
  console.log('Example: node test-vercel.js https://my-api.vercel.app https://my-app.vercel.app');
}