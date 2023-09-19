import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from "./router/index";
dotenv.config()

const PORT = process.env.PORT || 3333;

const app = express()

app.use(cors())
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server Running PORT: ${PORT}`);
});  
export { app };

