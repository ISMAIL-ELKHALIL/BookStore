import express, { urlencoded } from "express";
import config from "./config.js";
import { connect } from "mongoose";
import cors from "cors"
import bookRoutes from "./routes/bookRoutes.js";

const app = express();

const port = config.PORT || 4000;

//? Middleware to parse Body
app.use(express.json())

app.use(urlencoded({ extended: true }))

//! Middleware for handling Cors Policy Errors
//? Option-1: Allow All Origins with defaults of cors(*)
app.use(cors());
//? Option-1: Allow All Custom Origins

/* app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-type'],
}))
 */

app.use('/books', bookRoutes);

connect(config.MONGODB_URL).then(() => {
    console.log("DataBase Connected Successfully");
    app.listen(port, async () => {
        console.log(`Server running on http://localhost:${port}}`);
    })
}).catch((e) => {
    console.log(e);
}); 