import { Router } from "express";
const router = Router()

import createRouter from "./create.routes";
import readRoutes from "./read.routes";

// to make new nodes or relationships;
router.use('/create', createRouter)
// to query according to the various requirements;
router.use('/read', readRoutes)
// to update the existing nodes or r/ps;
router.use('/update')
// to remove the nodes or r/ps;
router.use('/delete')

export default router;