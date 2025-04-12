import express, { Express } from "express";
import {router} from "./routes";

export default class App {
    public express: Express;

    constructor() {
        this.express = express();
        this.config();
        this.routes();
    }

    private config(): void {
        this.express.use(express.json());
    }

    private routes(): void {
        this.express.use(router);
    }
}
