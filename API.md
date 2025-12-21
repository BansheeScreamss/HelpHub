# HelpHub — Backend API Contract (Frontend Reference)

This document specifies the HTTP API contract required to make the frontend functional. It is written from the frontend consumer's perspective. Keep role-based authorization in mind (roles: admin, requester, technician). Use JSON for request/response bodies and Bearer JWT for auth.

## Conventions
- Base URL: /api
- All endpoints return JSON unless noted.
- Use standard HTTP status codes:
  - 200 OK, 201 Created, 204 No Content
  - 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 500 Server Error
- Common headers:
  - Authorization: Bearer <access_token>
  - Content-Type: application/json
- Pagination query params: page (1-based), perPage (default 20)
- Filtering/sorting: use query params (e.g., ?status=open&sort=-createdAt)
- Timestamps: ISO 8601 strings

## Authentication
All protected endpoints require a valid access token. Support refresh tokens.

POST /api/auth/login
- Purpose: Authenticate user
- Body:
  {
    "email": "user@example.com",
    "password": "password123"
  }
- Success (200):
  {
    "accessToken": "<jwt>",
    "refreshToken": "<refresh-token>",
    "user": { "id": "u1", "name": "Alice", "email": "alice@example.com", "role": "requester" }
  }

POST /api/auth/register
- Purpose: Create account (optional fields depend on roles)
- Body:
  {
    "name": "Alice",
    "email": "alice@example.com",
    "password": "password123",
    "role": "requester" // optional, default requester
  }
- Success (201): same shape as login response

POST /api/auth/refresh
- Purpose: Exchange refresh token for new access token
- Body:
  { "refreshToken": "<refresh-token>" }
- Success (200):
  { "accessToken": "<jwt>", "refreshToken": "<new-refresh-token>" }

POST /api/auth/logout
- Purpose: Revoke refresh token
- Body:
  { "refreshToken": "<refresh-token>" }
- Success: 204 No Content

GET /api/users/me
- Purpose: Retrieve current user profile
- Headers: Authorization
- Success (200):
  {
    "id":"u1","name":"Alice","email":"alice@example.com","role":"requester","departmentId":"d1"
  }

PATCH /api/users/me
- Purpose: Update current user (profile)
- Body: partial user fields (name, phone, avatarUrl, departmentId)
- Success (200): updated user object

## Departments
GET /api/departments
- Query: page, perPage, q (search)
- Success (200):
  {
    "data":[ { "id":"d1","name":"IT","description":"..." } ],
    "meta": { "page":1,"perPage":20,"total":5 }
  }

POST /api/departments
- Role: admin only
- Body:
  { "name":"HR", "description":"Human resources" }
- Success (201): created department

GET /api/departments/:id
- Success (200): { "id":"d1","name":"IT","description":"...", "staff":[{id,name,role}] }

PUT /api/departments/:id
- Role: admin
- Body: full department object
- Success (200): updated department

DELETE /api/departments/:id
- Role: admin
- Success: 204 No Content

## Tickets
Ticket entity fields (recommended)
{
  "id": "t1",
  "title": "Printer not working",
  "description": "Details...",
  "status": "open", // open, in_progress, resolved, closed
  "priority": "medium", // low, medium, high, urgent
  "requesterId": "u1",
  "assigneeId": "u3", // optional
  "departmentId": "d1",
  "attachments": [{ "id","url","fileName" }],
  "createdAt": "...", "updatedAt": "..."
}

POST /api/tickets
- Purpose: Create ticket
- Headers: Authorization
- Body (multipart/form-data if attachments else JSON):
  {
    "title":"...","description":"...","priority":"high","departmentId":"d1"
  }
- If attachments: POST with form-data field "attachments" files.
- Success (201): created ticket object

GET /api/tickets
- Purpose: List tickets (for current user or all if admin)
- Query:
  - page, perPage
  - status, priority, departmentId, assigneeId
  - q (text search)
  - sort (e.g., -createdAt)
- Success (200):
  {
    "data":[ ticket ],
    "meta": { "page", "perPage", "total" }
  }

GET /api/tickets/:id
- Success (200): ticket with comments and activity
  {
    ...ticket,
    "comments":[ {id, authorId, authorName, body, createdAt} ],
    "history":[ {action, byUserId, at, details} ]
  }

PATCH /api/tickets/:id
- Purpose: Partial updates (status, assigneeId, priority, title, description)
- Role: requester can update own ticket (limited), admin/technician broader
- Body: { "status": "in_progress", "assigneeId": "u3" }
- Success (200): updated ticket

DELETE /api/tickets/:id
- Role: admin or requester (maybe only own tickets)
- Success: 204

## Ticket comments
POST /api/tickets/:id/comments
- Body:
  { "body":"We are working on this." }
- Success (201): created comment

GET /api/tickets/:id/comments
- Success (200): list of comments

## Attachments (file uploads)
POST /api/attachments
- Headers: Authorization, Content-Type: multipart/form-data
- Body: file field "file", optional metadata: ticketId
- Success (201):
  { "id":"a1","url":"/uploads/a1.pdf","fileName":"error-log.pdf","size":12345 }

DELETE /api/attachments/:id
- Role: authorized users only
- Success: 204

## Dashboard / Analytics
GET /api/dashboard/overview
- Purpose: provide data for charts/cards in Admin Home
- Role: admin
- Success (200):
  {
    "openTickets": 12,
    "inProgress": 5,
    "resolved": 40,
    "byPriority": { "urgent":2, "high":5, "medium":20, "low":30 },
    "byDepartment":[ {departmentId, name, count} ],
    "recentTickets":[ ...top 5 tickets... ]
  }

## Notifications (optional)
- WebSocket endpoint: /ws/notifications
- Events: ticket_created, ticket_updated, comment_added
- Alternatively: polling endpoint GET /api/notifications

## Errors — common shape
400/401/403/404/422/500 responses:
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Validation failed",
    "details": { "title":"Title is required" } // optional
  }
}

## Role-based access (notes for backend)
- Roles: admin, requester, technician (flexible)
- Enforce RBAC on endpoints: departments (admin), dashboard (admin), ticket assignment (admin/technician), ticket creation (requester & others), ticket updates (requester limited to own tickets).
- Include user role in /users/me response and embed minimal role claims in JWT.

## Client considerations
- Token lifecycle: store accessToken in memory + refreshToken in httpOnly cookie or secure storage; call /auth/refresh on 401.
- Implement optimistic UI for ticket creation and comment posting; handle 409 conflicts.
- Support file upload progress for attachments.
- Use pagination and search for lists to avoid large payloads.
- Validate client-side input shapes against this contract.

## Example fetch usage (frontend)
Fetch current user:
```js
fetch('/api/users/me', { headers: { Authorization: 'Bearer ' + token } })
  .then(r => r.json())
  .then(user => console.log(user));
```

Create ticket (JSON):
```js
fetch('/api/tickets', {
  method: 'POST',
  headers: { 'Content-Type':'application/json', Authorization: 'Bearer ' + token },
  body: JSON.stringify({ title:'...', description:'...', priority:'high', departmentId:'d1' })
});
```

Upload attachment (form-data):
```js
const fd = new FormData();
fd.append('file', fileInput.files[0]);
fetch('/api/attachments', { method:'POST', headers:{ Authorization:'Bearer ' + token }, body:fd });
```

---

Add, adapt, or remove endpoints as the frontend evolves. Keep this contract synchronized with the backend implementation and update when role-based authorization rules change.