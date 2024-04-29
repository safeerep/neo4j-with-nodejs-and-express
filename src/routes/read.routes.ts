import { Router } from "express";
const router = Router();

import { 
    getAllNodes, 
    getNodeWithSpecificValue
} from "../controllers/read.controller";

// to get all nodes;
router.get('/get-all-nodes', getAllNodes)
// to get specific node only;
router.get('/get-node/:nodeId', getNodeWithSpecificValue)

export default router;