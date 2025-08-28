import connectDB from "./db/db.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(
                `Server is running on port ${process.env.PORT || 3000}`
            );
        });
    })
    .catch((error) => {
        console.log("MONGODB CONNECTION FAILED ", error);
    });
