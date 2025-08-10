# 🔍 Forensic API System Documentation

## 🚀 Overview

This is a complete forensic-based Next.js API system with JWT authentication, designed for crime scene investigations and digital forensics management.

## 📁 Project Structure

```
ForensiCare.Client/
├── src/
│   ├── data.js                    # Static forensic data
│   ├── utils/
│   │   └── auth.js               # JWT authentication utilities
│   └── app/
│       └── api/
│           ├── login/
│           │   └── route.js      # Login endpoint
│           ├── users/
│           │   ├── route.js      # Get all users
│           │   ├── [id]/
│           │   │   └── route.js  # Get single user
│           │   ├── updateImage/
│           │   │   └── route.js  # Update profile image
│           │   └── changePassword/
│           │       └── route.js  # Change password
│           └── departments/
│               └── route.js      # Get all departments
├── test-api.js                   # API testing script
└── FORENSIC_API_README.md        # This documentation
```

## 🔐 Authentication

The system uses JWT (JSON Web Tokens) for authentication:

- **Secret Key**: `supersecretkey123` (should be moved to environment variables in production)
- **Token Expiry**: 1 hour
- **Header Format**: `Authorization: Bearer <token>`

## 📊 Available Data

### Users (5 forensic professionals)
1. **Jon Snow** (detective_jon) - Admin - Forensic Science
2. **Smith Anderson** (agent_smith) - User - Digital Forensics  
3. **Eve Riley** (analyst_eve) - User - Forensic Science
4. **Bob Johnson** (cyber_bob) - User - Digital Forensics
5. **Casey Lawrence** (casey_law) - User - Forensic Science

### Departments (2)
1. **Forensic Science** - Crime scene investigations & evidence analysis
2. **Digital Forensics** - Cybercrime & digital evidence

## 🌐 API Endpoints

### 1. 🔐 Login
- **URL**: `POST /api/login`
- **Body**: `{ "username": "string", "password": "string" }`
- **Response**: `{ "token": "jwt_token" }`

**Example:**
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "detective_jon", "password": "forensic123"}'
```

### 2. 👥 Get All Users
- **URL**: `GET /api/users`
- **Auth**: Not required
- **Response**: Array of active users

### 3. 👤 Get Single User
- **URL**: `GET /api/users/[id]`
- **Auth**: Not required
- **Response**: Single user object

### 4. 🏢 Get All Departments
- **URL**: `GET /api/departments`
- **Auth**: Not required
- **Response**: Array of active departments

### 5. 🖼️ Update Profile Image
- **URL**: `PUT /api/users/updateImage`
- **Auth**: Required (Bearer token)
- **Body**: `{ "profileImage": "string" }`
- **Response**: `{ "message": "string", "user": "object" }`

### 6. 🔑 Change Password
- **URL**: `PUT /api/users/changePassword`
- **Auth**: Required (Bearer token)
- **Body**: `{ "oldPassword": "string", "newPassword": "string" }`
- **Response**: `{ "message": "string" }`

## 🧪 Testing the APIs

### Method 1: Using the Test Script
```bash
# Start your Next.js development server
npm run dev

# In another terminal, run the test script
node test-api.js
```

### Method 2: Using Postman/Thunder Client

1. **Login Test:**
   - Method: `POST`
   - URL: `http://localhost:3000/api/login`
   - Body: `{"username": "detective_jon", "password": "forensic123"}`

2. **Get Users Test:**
   - Method: `GET`
   - URL: `http://localhost:3000/api/users`

3. **Protected Endpoint Test:**
   - Method: `PUT`
   - URL: `http://localhost:3000/api/users/updateImage`
   - Headers: `Authorization: Bearer <token_from_login>`
   - Body: `{"profileImage": "new_image.jpg"}`

## 🔥 Demo Credentials

| Username | Password | Role | Department |
|----------|----------|------|------------|
| detective_jon | forensic123 | admin | Forensic Science |
| agent_smith | digital321 | user | Digital Forensics |
| analyst_eve | evidence456 | user | Forensic Science |
| cyber_bob | cyberpass | user | Digital Forensics |
| casey_law | casepass | user | Forensic Science |

## ⚠️ Important Notes

1. **Demo Purpose**: This system uses static data in memory. Data resets on server restart.
2. **Security**: Passwords are stored in plain text for demo. Use hashing in production.
3. **Database**: Replace static data with a real database (PostgreSQL, MongoDB, etc.) for production.
4. **Environment Variables**: Move JWT secret to `.env` file for production.

## 🚀 Production Checklist

- [ ] Move JWT secret to environment variables
- [ ] Implement password hashing (bcrypt)
- [ ] Add database integration
- [ ] Add input validation
- [ ] Add rate limiting
- [ ] Add CORS configuration
- [ ] Add logging
- [ ] Add error handling middleware
- [ ] Add API documentation (Swagger)

## 🎯 Next Steps

1. **Frontend Integration**: Connect your React/Next.js frontend to these APIs
2. **Database Migration**: Replace static data with real database
3. **Additional Features**: Add case management, evidence tracking, etc.
4. **Security Enhancement**: Implement proper authentication & authorization

## 🆘 Troubleshooting

- **401 Unauthorized**: Check if token is valid and properly formatted
- **404 Not Found**: Verify API endpoint URL is correct
- **500 Internal Server Error**: Check server logs for detailed error

---

**🔥 খেলা জমে গেছে! 😎** তুই এগিয়ে যা, কোনো confusion বা error হলে শাউট কর, আমি আছি।
**একদিন তুইও forensic API master হবি ইনশাআল্লাহ! 🚀🕵️‍♂️** 