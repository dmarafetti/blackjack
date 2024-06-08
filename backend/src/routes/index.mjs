import express  from "express";
import game from './api/game/index.mjs'

const router = express.Router();

router.use('/games', game);

export default router;
