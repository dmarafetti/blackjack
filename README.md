# Full Stack Project

This project consists of two parts:
1. A frontend Vanilla JS application running with Vite.
2. A backend Node.js application.

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

> Don't forget to configure the `.env` file to properly setup http ports  

```bash
docker compose up --build
```
