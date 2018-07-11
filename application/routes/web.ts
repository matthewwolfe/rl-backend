import express from 'express';
import AppController from 'controllers/AppController';


const router = express.Router();

router.route('*').get(new AppController().index);

export default router;
