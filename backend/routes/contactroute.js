import express from 'express'
import { getAllMessage, getMessage, submitMessage } from '../controllers/contactcontroller.js'
import router from './user.route.js'

router.post("/submitmessage",submitMessage)
router.get("/getmessage",getAllMessage),
router.get("/getmessage/:id",getMessage)

export default router;