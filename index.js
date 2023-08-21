import Express from "express";
import fs  from "fs/promises";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Express();
const routes = {};
const routesFolder = "./routes";
dotenv.config();

app.use(Express.json({limit: '50mb'}));

const mongoStore = MongoDBStore(session);
const store = new mongoStore({
    databaseName: "websiteProduction",
    collection: "sessions",
    uri: process.env.mongoUrl,
    expires: 1000,
});

app.use("/adminTelegram", Express.static(__dirname + "/temporaryAdminTelegramPage"));

let routesArray = ["/", "/adminTelegram"];

app.use(routesArray, session({
    name: "session.users",
    secret: 'clothesAreSecret',
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'none', // Update this line
        secure: true,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30 * 1000
    }
}));

let whitelist = ["http://143.178.79.13:40100", "http://185.43.213.134:40100", 'http://127.0.0.1:5500', "http://91.218.245.66", "http://localhost", "http://localhost:8082", 'http://127.0.0.1:7861', "http://91.218.245.66:8082", "null"];

app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        console.log(origin)
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}));

const main = async () => {
    //routes setup
    let routesFiles = await fs.opendir(routesFolder);

    for await (const file of routesFiles) {
        //Initializing all routes
        const singleRoute = await import(`${routesFolder}/${file.name}`);
        const formattedName = file.name.replaceAll("0", "/").replaceAll("1", ":").slice(0, -3);
        routes[formattedName] = app[singleRoute.default.type](formattedName, singleRoute.default.middlewares ,singleRoute.default.start);
    }

    app.listen(40100, () => {
        console.log("api ready");
    });
    
}

main();