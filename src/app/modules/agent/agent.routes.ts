import express from 'express';
import { agentController } from './agent.controller';
import { fileUploader } from '../../helper/fileUploder';

const router = express.Router();

// only admin access this route
router.put('/status/:id', agentController.updatedStatus);

router.post(
  '/request',
  fileUploader.upload.single('image'),
  agentController.requestAgent,
);


router.get('/', agentController.getAllAgent);

router.get('/:id', agentController.getSingleAgent);

router.put(
  '/:id',
  fileUploader.upload.single('image'),
  agentController.updatedAgent,
);

router.delete('/:id', agentController.deleteAgent);

export const agentRouter = router;
