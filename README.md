# Routes

General Routes:
- GET /database/init - init database

Auth Routes:
- POST /api/auth/login - login user
  - body: { email, password }
  - response: { token }
- POST /api/auth/register - register
  - body: { email, password, username }
  - response: { message }
- GET /api/auth/refresh - refresh token
  - response: { token }
- GET /api/auth/profile - get the user profile without a hash password
  - response: { id, email, username, created_at, updated_at }
- POST /api/auth/profile - update profile data
  - body: { ?email, ?username }}
  - response: { id, email, username, created_at, updated_at }