# ExpenseTracker Architecture

```mermaid
flowchart LR
  %% Clients
  U[User / Browser]

  %% Frontend
  subgraph FE[Frontend (React + Vite)]
    RR[React Router\nPublic: /login, /register\nPrivate: /, /transactions, /add-income, /add-expense, /profile]
    AC[AuthContext\nuser + token\nisAuthenticated]
    TC[TransactionContext\ntransactions state\nget/add/delete]
    AS[API Services (Axios)\nauthApi.js / transactionApi.js]
  end

  %% Backend
  subgraph BE[Backend (Node + Express)]
    S[server.js\nCORS + JSON\nMounts routes]
    AR[/authRoutes\nPOST /register\nPOST /login\nPUT /profile/]
    TR[/transactionRoutes\nGET /\nPOST /\nPUT /:id\nDELETE /:id/]
    AM[authMiddleware.protect\nVerifies JWT\nreq.user]
    UM[(User Model\nMongoose + bcrypt)]
    TM[(Transaction Model\nMongoose)]
  end

  DB[(MongoDB Atlas / MongoDB)]

  %% Flow
  U --> RR
  RR --> AC
  RR --> TC

  AS <--> RR
  AS -->|HTTP JSON| S

  %% Auth endpoints
  S --> AR
  AR --> UM
  UM --> DB
  AR -->|Returns user + JWT| AS
  AS -->|login(userData)| AC

  %% Protected endpoints
  S --> TR
  TR --> AM
  AM -->|Loads user by id| UM
  UM --> DB

  TR --> TM
  TM --> DB

  %% Token usage
  AC -->|token| AS
  AS -->|Authorization: Bearer <token>| AM

  %% Data updates
  TR -->|Transactions JSON| AS
  AS --> TC

  %% Profile update
  AR -->|Updated user + refreshed JWT| AS
  AS -->|login(updatedUser)| AC
```
