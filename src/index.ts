import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from "./router/index";
import bodyParser from 'body-parser'
dotenv.config()

const PORT = process.env.PORT || 3333;

const app = express()

app.use(cors())
app.use(bodyParser.json());

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server Running PORT: ${PORT}`);
});  
export { app };

