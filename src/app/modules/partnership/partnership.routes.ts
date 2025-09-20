import express from 'express';
import { partnershipController } from './partnership.controller';
import { fileUploader } from '../../helper/fileUploder';
const router = express.Router();

router.post(
  '/create',
  fileUploader.upload.single('image'),
  partnershipController.createPartnership,
);
router.get('/', partnershipController.getAllParnerships);
router.get('/:id', partnershipController.getSinglePartnership);
router.put(
  '/:id',
  fileUploader.upload.single('image'),
  partnershipController.updatePartnership,
);
router.delete('/:id', partnershipController.deletePartnership);

export const partnershipRouter = router;
