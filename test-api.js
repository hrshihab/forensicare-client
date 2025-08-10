// Test API endpoints for Forensic System
// Run this with Node.js to test the APIs

const BASE_URL = 'http://localhost:3000/api';

// Test Login
async function testLogin() {
  console.log('🔐 Testing Login...');
  
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'detective_jon',
      password: 'forensic123'
    })
  });
  
  const data = await response.json();
  console.log('Login Response:', data);
  
  if (data.token) {
    console.log('✅ Login successful! Token:', data.token);
    return data.token;
  } else {
    console.log('❌ Login failed:', data.message);
    return null;
  }
}

// Test Get All Users
async function testGetUsers() {
  console.log('\n👥 Testing Get All Users...');
  
  const response = await fetch(`${BASE_URL}/users`);
  const data = await response.json();
  
  console.log('Users Response:', data);
  console.log(`✅ Found ${data.length} users`);
}

// Test Get Single User
async function testGetUser(id) {
  console.log(`\n👤 Testing Get User ${id}...`);
  
  const response = await fetch(`${BASE_URL}/users/${id}`);
  const data = await response.json();
  
  console.log('User Response:', data);
}

// Test Get Departments
async function testGetDepartments() {
  console.log('\n🏢 Testing Get Departments...');
  
  const response = await fetch(`${BASE_URL}/departments`);
  const data = await response.json();
  
  console.log('Departments Response:', data);
  console.log(`✅ Found ${data.length} departments`);
}

// Test Update Profile Image (requires token)
async function testUpdateProfileImage(token) {
  console.log('\n🖼️ Testing Update Profile Image...');
  
  const response = await fetch(`${BASE_URL}/users/updateImage`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      profileImage: 'new_profile.jpg'
    })
  });
  
  const data = await response.json();
  console.log('Update Profile Response:', data);
}

// Test Change Password (requires token)
async function testChangePassword(token) {
  console.log('\n🔑 Testing Change Password...');
  
  const response = await fetch(`${BASE_URL}/users/changePassword`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      oldPassword: 'forensic123',
      newPassword: 'newpassword123'
    })
  });
  
  const data = await response.json();
  console.log('Change Password Response:', data);
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting Forensic API Tests...\n');
  
  // Test public endpoints
  await testGetUsers();
  await testGetUser(1);
  await testGetDepartments();
  
  // Test login to get token
  const token = await testLogin();
  
  if (token) {
    // Test protected endpoints
    await testUpdateProfileImage(token);
    await testChangePassword(token);
  }
  
  console.log('\n✅ All tests completed!');
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  runTests().catch(console.error);
} 