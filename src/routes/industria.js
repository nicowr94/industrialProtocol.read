import { Router } from "express";
import * as industriaCtrl from "../controllers/industria.controller";

const router = Router();

router.get("/", industriaCtrl.getFunctionRead);

export default router;
