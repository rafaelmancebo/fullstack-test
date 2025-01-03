## Prerequisites

-   Node.js (v16 o superior)
-   Docker (para facilitar la configuración de la base de datos)
-   Docker Compose (si usas Docker)
-   PostgreSQL (si no usas Docker)
-   Git (si deseas clonar el repositorio)

## Running Both Apps

To run both the frontend and backend applications, follow these steps:

1. Open a terminal and navigate to the backend directory:

    ```sh
    cd /path/to/backend
    ```

2. Install the backend dependencies:

    ```sh
    npm install
    ```

3. Create the database

    ```sh
    docker compose -f db.yml up
    ```

4. Run the prima migrations

    ```sh
     npx prisma migrate dev --name init
    ```

5. Start the backend server:

    ```sh
    node server.js
    ```

6. Open a new terminal and navigate to the frontend directory:

    ```sh
    cd /path/to/frontend
    ```

7. Install the frontend dependencies:

    ```sh
    npm install
    ```

8. Start the frontend application:
    ```sh
    npm run dev
    ```

## note

Add the .env file to the root of the frontend folder, and this will be the content

    ```sh
    NEXT_PUBLIC_BACKEND_URL="http://localhost:3001"
    ```

Both applications should now be running. The backend server will typically be available at `http://localhost:3001` and the frontend application at `http://localhost:3000/`.

```

```
