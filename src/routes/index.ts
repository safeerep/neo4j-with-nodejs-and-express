import { Router } from "express";
const router = Router()

import createToutes from "./create.routes";

// to make new nodes or relationships;
router.use('/create', createToutes)
// to query according to the various requirements;
router.use('/read')
// to update the existing nodes or r/ps;
router.use('/update')
// to remove the nodes or r/ps;
router.use('/delete')

export default router;