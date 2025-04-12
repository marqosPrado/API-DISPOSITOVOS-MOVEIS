import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import path from 'path';

const envPath = path.resolve(__dirname, '../../../.env');
dotenv.config({ path: envPath });

export class DatabaseConnection {
    private static instance: DataSource;
    private static isInitialized = false;

    private constructor() {}

    public static async initialize(): Promise<DataSource> {
        if (DatabaseConnection.isInitialized) {
            return DatabaseConnection.instance;
        }

        try {
            DatabaseConnection.validateDatabaseEnv(process.env);

            DatabaseConnection.instance = new DataSource({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT || '5432', 10),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                entities: [path.join(__dirname, '../entities/**/*.{ts,js}')],
                migrations: [path.join(__dirname, '../migrations/**/*.{ts,js}')],
                synchronize: process.env.NODE_ENV !== 'production',
                logging: process.env.NODE_ENV === 'development',
                poolSize: 10,
            });

            await DatabaseConnection.instance.initialize();
            DatabaseConnection.isInitialized = true;

            return DatabaseConnection.instance;
        } catch (error) {
            throw new Error(`Database initialization failed: ${error}`);
        }
    }

    public static getDataSource(): DataSource {
        if (!DatabaseConnection.isInitialized) {
            throw new Error('Database not initialized. Call initialize() first.');
        }
        return DatabaseConnection.instance;
    }

    public static async close(): Promise<void> {
        if (DatabaseConnection.isInitialized && DatabaseConnection.instance.isInitialized) {
            await DatabaseConnection.instance.destroy();
            DatabaseConnection.isInitialized = false;
            console.log('Database connection closed');
        }
    }

    private static validateDatabaseEnv(env: NodeJS.ProcessEnv) {
        const requiredVars = [
            'DATABASE_HOST',
            'POSTGRES_USER',
            'POSTGRES_PASSWORD',
            'POSTGRES_DB'
        ];

        const missingVars = requiredVars.filter(v => !env[v]);
        if (missingVars.length > 0) {
            throw new Error(`Missing database environment variables: ${missingVars.join(', ')}`);
        }
    }
}