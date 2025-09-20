import express from 'express';
import { creatorController } from './creator.controller';
import { fileUploader } from '../../helper/fileUploder';


const router = express.Router();


router.post(
  '/request',
  fileUploader.upload.array('image'),
  creatorController.requestCreator,
);

// only admin access this route
router.put('/status/:id', creatorController.updatedStatus);

router.get('/', creatorController.getAllCreators);
router.get('/:id', creatorController.singleCreator);
router.put(
  '/:id',
  fileUploader.upload.array('image'),
  creatorController.updatedCreator,
);
router.delete('/:id', creatorController.deleteCreator);


export const creatorRouter = router;
