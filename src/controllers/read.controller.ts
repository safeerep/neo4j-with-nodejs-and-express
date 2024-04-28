import { Record } from "neo4j-driver"
import { getNeo4jSession } from "../config/neo4j.config"
import { Request, Response } from "express"

// to get all nodes;
export const getAllNodes = async (req: Request, res: Response) => {
    const session = getNeo4jSession()
    try {
        const response = await session.run(
            `
                MATCH (n)
                RETURN n
            `
        )
        const nodes = response.records.map((record: Record) => {
            return record.get("n").properties;
        })
    
        return res.json({
            status: true,
            message: "successfully fetched all the nodes properties",
            nodes
        })
    } catch (error) {
        return res.json({
            status: false,
            message: "something went wrong",
            error
        })
    }
}

// to get details about a specific node
export const getNodeWithSpecificValue = async (req: Request, res: Response) => {
    const session = getNeo4jSession();
    try {
        // we will be getting the _id of the node in params;
        const nodeId = req.params.nodeId;
        const response = await session.run(
            `
                MATCH (n:Movies)
                WHERE n._id = ${nodeId}
                RETURN n
            `
        )
        const specificNode = response.records[0].get("n").properties;
        return res.json({
            status: true,
            message: "successfully fetched the details of specific node",
            specificNode
        })
    } catch (error) {
        return res.json({
            status: false,
            message: "something went wrong",
            error
        })
    }
}