import { getNeo4jSession } from "../config/neo4j.config"
import { Request, Response } from "express"

export const createNewNode = async (req: Request, res: Response) => {
    try {
        // we can use merge or create methods for creating new node;
        const { title } = req.body;
        const nodeData = req.body;
        const session = getNeo4jSession()
        const response = await session.run(
            `
                MERGE (n:Movie { title: $title})
                n += $nodeData
                RETURN n;
            `, {
                title: title,
                nodeData: nodeData
            }
        )

        const newNode = response.records[0].get("n").properties;

        return res.status(201).json({
            status: true,
            message: "successfully created new node",
            newNode
        })
    } catch (error) {
        console.log(`something went wrong during creating new node`);
        return res.json({
            status: false,
            message: "something went wrong",
            error
        })
    }
}

export const createNewNodeWithRP = async (req: Request, res: Response) => {
    try {
        const session = getNeo4jSession()
        // first we have to create new nodes if its not exist
        // then we can create relationships
        const {
            MovieData,
            PersonData
        } = req.body

        // creating movie node
        await session.run(
            `
                MERGE (n:Movie { title: $title})
                n += $nodeData
                RETURN n;
            `, {
                title: MovieData.title,
                nodeData: MovieData
            }
        )

        // creating person node
        await session.run(
            `
                MERGE (n:Person { name: $name})
                n += $nodeData
                RETURN n;
            `, {
                name: PersonData.name,
                nodeData: PersonData
            }
        )

        // creating r/p between movie and person
        await session.run(
            `
                MERGE(p:Person { name: $personName})-[:ACTED_IN]->(m:Movie { title: $movieTitle})
                RETURN p, m
            `, {
                personName: PersonData.name,
                movieTitle: MovieData.title
            }
        )
        return res.json({
            status: true,
            message: "successfully created a movie node with relation of actor"
        })
    } catch (error) {
        console.log(`something went wrong during creating a node with r/p`);
        return res.json({
            status: false,
            message: "something went wrong",
            error
        })
    }
}