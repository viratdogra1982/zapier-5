import { Router } from "express";
import { prismaClient } from "../db";
const router=Router();
router.get("/available",async (req,res)=>{
const availableTrigger= await prismaClient.availableTriggers.findMany({});
res.json({
    availableTrigger
})
})
export const triggerRouter=router;