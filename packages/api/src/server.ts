import express, { Express, json } from 'express';
import cors from 'cors';
import { MongoClient, Db } from 'mongodb';
import morgan from 'morgan';
import setupRoutes from './routes';

class Server {
  port: string;

  app: Express;

  mongoClient: MongoClient;

  dbName: string;

  db?: Db;

  constructor(
    port: string = process.env['PORT'] ?? '8080',
    mongoConnectionURL = process.env['MONGO_URI'] ??
      'mongodb://admin:mongo@localhost:27017',
    dbName = process.env['MONGO_DB'] ?? 'peddl'
  ) {
    this.app = express();
    this.mongoClient = new MongoClient(mongoConnectionURL);
    this.dbName = dbName;
    this.port = port;
  }

  setupRoutes(db: Db) {
    setupRoutes(this.app, db);
  }

  async start() {
    await this.mongoClient.connect();
    this.db = this.mongoClient.db(this.dbName);

    if (this.db) {
      this.app.use(cors());
      this.app.use(json());
      this.app.use(morgan('combined'));

      this.app.use(express.static('static/'));

      this.setupRoutes(this.db);

      this.app.listen(this.port, () => {
        console.log(`App listening on port ${this.port}`);
      });
    } else {
      throw new Error('DB is undefined');
    }
  }
}

new Server().start().catch(console.error);
