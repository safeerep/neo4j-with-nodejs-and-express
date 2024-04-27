import neo4j, { Driver, Record, auth } from "neo4j-driver"

let driver: Driver;
export const connectNeo4j = async () => {
    const USER: string = process.env.NEO4J_USER || '';
    const PASSWORD: string = process.env.NEO4J_PASSWORD || '';
    const NEO4J_URI: string = process.env.NEO4J_URI || '';

    try {
        // connecting with neo4j
        driver = neo4j.driver( NEO4J_URI, auth.basic(
            USER,
            PASSWORD
        ))
        // to know that we have connected, we can put logs
        console.log(`neo4j connected successfully \n`, await driver.getServerInfo());
    } catch (error) {
        console.log(`something went wrong ${error}`);
        await driver?.close()
        process.exit(2)
    }

    process.on("exit", async () => {
        await driver?.close()
    })
}

// creating driver for each and every use of db is something which is not suggested 
// so we can have seperate sessions for each and every operation, with the same driver;
export const getNeo4jSession = () => {
    return driver?.session()
}