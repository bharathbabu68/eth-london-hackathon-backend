# Disaster Relief Aid Platform - Backend

Welcome to the backend repository of the Disaster Relief Aid Platform. This backend is responsible for handling API requests and coordinating interactions with external services to facilitate disaster relief efforts using Circle's USDC stablecoin and World ID authentication.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend server.
- **Express**: Web framework for Node.js to simplify API development.
- **MongoDB**: NoSQL database used for storing relief campaign and user data.
- **Circle Developer-Controlled Wallets SDK**: Integration for creating and managing developer-controlled wallets.
- **World ID API**: Authentication service for verifying proof of personhood.

## API Routes

### 1. POST /verifyProof

- **Description:** Verifies proof of personhood using World ID authentication.
- **Controller:** `verifyProof`

### 2. POST /createReliefCampaign

- **Description:** Creates a new relief campaign for disaster relief efforts.
- **Controller:** `createReliefCampaign`

### 3. POST /claimFunds

- **Description:** Allows users to claim funds from a relief campaign for disaster recovery.
- **Controller:** `claimFunds`

### 4. GET /getAllReliefCampaigns

- **Description:** Retrieves all relief campaigns created on the platform.
- **Controller:** `getAllReliefCampaigns`

### 5. GET /getReliefCampaignById/:id

- **Description:** Retrieves a specific relief campaign by its ID.
- **Controller:** `getReliefCampaignById`

### 6. GET /trackTransaction/:txId

- **Description:** Tracks a transaction using its transaction ID.
- **Controller:** `trackTransaction`

## Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables by creating a `.env` file and adding necessary configurations (refer to `.env.example`).
4. Start the server using `npm start`.

## Controllers

### `verifyProof`

- **Description:** Verifies proof of personhood using World ID authentication.
- **Dependencies:** `dotenv`, `fetch`

### `createReliefCampaign`

- **Description:** Creates a new relief campaign for disaster relief efforts.
- **Dependencies:** `dotenv`, `@circle-fin/developer-controlled-wallets`

### `getAllReliefCampaigns`

- **Description:** Retrieves all relief campaigns created on the platform.
- **Dependencies:** `mongoose`

### `getReliefCampaignById`

- **Description:** Retrieves a specific relief campaign by its ID.
- **Dependencies:** `mongoose`

### `claimFunds`

- **Description:** Allows users to claim funds from a relief campaign for disaster recovery.
- **Dependencies:** `dotenv`, `@circle-fin/developer-controlled-wallets`

### `trackTransaction`

- **Description:** Tracks a transaction using its transaction ID.
- **Dependencies:** `dotenv`, `@circle-fin/developer-controlled-wallets`
