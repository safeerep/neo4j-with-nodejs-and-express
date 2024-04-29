import { Router } from "express";
import { 
    createNewNode, 
    createNewNodeWithRP
} from "../controllers/create.controller";

const router = Router()

router.post('/node', createNewNode)
router.post('/node-with-rp', createNewNodeWithRP)

export default router;