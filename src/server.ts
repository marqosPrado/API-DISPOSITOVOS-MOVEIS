import App from "./app";
import {DatabaseConnection} from "./config/database/database-connection";

const app = new App();

const port: number = 3000;

app.express.listen(port, (): void => {
    DatabaseConnection.initialize()
        .then(_ => {
            console.log("Database connection initialized");
        })
        .then((): void => {
            console.log(`Server running on port http://localhost:${port}/`);
        })
        .catch((error: Error): void => {
            console.error(`Failed to initialize database connection: ${error}`);
        })
});