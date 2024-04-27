export const checkEnvironmentConfig = () => {
    if (!process.env.PORT) {
        console.log(`PORT is REQUIRED`);
        process.exit(1)
    }
    if (!process.env.NEO4J_USER) {
        console.log(`NEO4J_USER is REQUIRED`);
        process.exit(1)
    }
    if (!process.env.NEO4J_PASSWORD) {
        console.log(`NEO4J_PASSWORD is REQUIRED`);
        process.exit(1)
    }
    if (!process.env.NEO4J_URI) {
        console.log(`NEO4J_URI is REQUIRED`);
        process.exit(1)
    }
}