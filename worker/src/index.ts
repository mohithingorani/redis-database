import { resolve } from "path";
import { createClient } from "redis";

const client = createClient();

async function startServer() {
    await client.connect();
}
startServer();


async function main() {
    while (1) {
        const response = await client.brPop("submissions",0);
        console.log(response)
        await new Promise((resolve)=>{
            setTimeout(resolve,1000);
        })
        console.log("processed uers submission")
    }
}

main()