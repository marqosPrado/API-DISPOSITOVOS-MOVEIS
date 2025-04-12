import App from "./app";
import {AppDataSource} from "./config/database/data-source";

const app = new App();
const port: number = 3000;

AppDataSource.initialize()
    .then((): void => {
        console.log("Database connection established");
        app.express.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Error during Data Source initialization", error);
    })