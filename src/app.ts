import express from 'express';
import config from 'config';
import log from './logger'
import routes from './routes';
import connect from './db/connect';
import { deserializeUser } from './middleware';

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(port, ()=> {
    log.info(`The server is running @ Port ${port} - Host ${host} `);
    connect();
    routes(app);
})
 