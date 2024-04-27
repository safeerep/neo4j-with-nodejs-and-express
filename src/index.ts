import { config } from "dotenv";
config()

import { checkEnvironmentConfig } from "./utils/checkers/env.checker";
import server from "./main";
import { connectNeo4j } from "./config/neo4j.config";

(
    async () => {
        try {
            checkEnvironmentConfig()
            server;
            connectNeo4j()
        } catch (error) {
            console.log(`something went wrong ${error}`);
            process.exit(1)
        }
    }
)()