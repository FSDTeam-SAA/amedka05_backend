import express from 'express';
import { agentController } from './agent.controller';
import { fileUploader } from '../../helper/fileUploder';
const router = express.Router();

router.post(
  '/request',
  fileUploader.upload.single('image'),
  agentController.requestAgent,
);

export const agentRouter = router;
