# ♣ Blackjack Javascript v1.0.0



This project consists of two parts:

1. The [Frontend](https://github.com/dmarafetti/blackjack/tree/main/frontend). A vanilla js application running with Vite.
2. The [Backend](https://github.com/dmarafetti/blackjack/tree/main/backend) A Node.js application.

Both the frontend and backend have Dockerfiles and are orchestrated using Docker Compose.

## Prerequisites

Make sure you have the following installed on your machine:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure
    .
    ├── backend             # Backend code base
    ├── frontend            # Fronend code base
    ├── .env                # Environment variables
    ├── compose.yml         # Docker compose yaml
    └── README.md

## Setup and Run

### Step 1: Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/dmarafetti/blackjack.git
cd blackjack
```

### Step 2: Run Docker compose 

Clone this repository to your local machine.

> Don't forget to configure the `.env` file to properly setup http ports with `VITE_DEV_SERVER_HOST` and `VITE_DEV_SERVER_PORT`.  

```bash
docker compose up --build
```

### Step 3: Access the Application
Once the stack is up and running, open your browser and navigate to:

```
http://localhost:8001
```
