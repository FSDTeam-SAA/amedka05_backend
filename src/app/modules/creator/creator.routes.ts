import express from 'express';
import { creatorController } from './creator.controller';
import { fileUploader } from '../../helper/fileUploder';
const router = express.Router();

router.post(
  '/request',
  fileUploader.upload.array('image'),
  creatorController.requestCreator,
);

export const creatorRouter = router;
