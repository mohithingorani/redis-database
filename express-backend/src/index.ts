import express from "express"
import { createClient } from "redis";
const app = express();
app.use(express.json());


const client = createClient({});

app.post("/submit", async(req, res) => {
    const { name, email, message } = req.body;
    await client.lPush("submissions", JSON.stringify({ email, message }));
    res.status(200).json({
        message: "Submission recieved"
    })
})

async function startServer() {
    try {
        client.connect();
        console.log("Connected to redis")
        app.listen(3000);

    }
    catch (err) {
        console.log("Error connecting to the server", err);
    }
}
startServer();