import express, { Application, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser, { OptionsJson } from "body-parser";


// import configKeys from "../../config";
// import mongoSanitize from 'express-mongo-sanitize'


const expressConfig = (app: Application) => {
  // Development logging
 
  const corsOptions = {
    origin: 'http://localhost:5173',
    exposedHeaders: ['Cross-Origin-Opener-Policy', 'Cross-Origin-Resource-Policy'],
  };
  // app.use((req, res, next) => {
  //   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  //   res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  //   next();
  // });
  app.use(cors(corsOptions));
  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // app.use(mongoSanitize())
};

export default expressConfig;
