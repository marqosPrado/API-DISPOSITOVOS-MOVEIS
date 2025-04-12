import App from "./app";

const app = new App();

const port: number = 3000;

app.express.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}/`);
});