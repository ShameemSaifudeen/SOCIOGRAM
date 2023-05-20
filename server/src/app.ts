import express,{Application, NextFunction} from 'express';
import connectDB from './frameworks/database/Mongodb/Connection/connection';
import http from 'http'
import serverConfig from './frameworks/webserver/server';
import expressConfig from './frameworks/webserver/express';
import routes from './frameworks/webserver/routes';
import Colors = require ('colors.ts')
import errorHandlingMidlleware from './frameworks/webserver/middlewares/errorHandlingMiddleware';
import AppError from './utils/appError';
import path from 'path'

Colors.enable

const app:Application = express();
const server = http.createServer(app);

//connecting mongoDb
connectDB();


expressConfig(app)

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// routes for each endpoint
routes(app)


app.use(errorHandlingMidlleware)

//  catch 404 and forward to error handler
 app.all('*', (req,res,next:NextFunction) => {
    next(new AppError('Not found', 404));
});

serverConfig(server).startServer()
