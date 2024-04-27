import express, { Application, json, Request, Response, urlencoded } from "express";
const server: Application = express()

server.use(json())
server.use(urlencoded({ extended: true}))

// route for health check
server.get('/health', (req: Request, res: Response) => {
    res.send({
        message: "service_healthy"
    })
})

const PORT: number = Number(process.env.PORT)
server.listen( PORT, () => {
    console.log(`server started at the port ${PORT}`);
})

export default server;