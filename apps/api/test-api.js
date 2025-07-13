// Simple API test script
const fetch = require('node-fetch');

const API_URL = 'http://localhost:4000';

// Test health endpoint
async function testHealth() {
  try {
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();
    console.log('✅ Health check:', data);
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
  }
}

// Test GraphQL endpoint
async function testGraphQL() {
  try {
    const query = `
      query {
        posts(limit: 5) {
          id
          content
          createdAt
        }
      }
    `;
    
    const response = await fetch(`${API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    
    const data = await response.json();
    console.log('✅ GraphQL posts query:', data);
  } catch (error) {
    console.error('❌ GraphQL test failed:', error.message);
  }
}

// Test user registration
async function testRegister() {
  try {
    const mutation = `
      mutation {
        register(input: {
          email: "test@example.com"
          password: "password123"
          username: "testuser"
          displayName: "Test User"
        }) {
          user {
            id
            email
            username
            displayName
          }
          token
        }
      }
    `;
    
    const response = await fetch(`${API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: mutation }),
    });
    
    const data = await response.json();
    console.log('✅ User registration:', data);
  } catch (error) {
    console.error('❌ Registration test failed:', error.message);
  }
}

// Run all tests
async function runTests() {
  console.log('🧪 Running API tests...\n');
  
  await testHealth();
  await testGraphQL();
  await testRegister();
  
  console.log('\n✨ Tests completed!');
}

// Wait for server to start
setTimeout(runTests, 2000);