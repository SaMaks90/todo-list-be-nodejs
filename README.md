# Routes

General Routes:
- GET /database/init - init database

Auth Routes:
- POST /auth/login - login user
  - body: { email, password }
  - response: { token }
- POST /auth/register - register
- POST /auth/refresh - refresh token