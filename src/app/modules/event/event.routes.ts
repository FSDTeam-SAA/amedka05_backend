import express from 'express';
import { eventController } from './event.controller';
import { fileUploader } from '../../helper/fileUploder';
const router = express.Router();

router.post(
  '/create',
  fileUploader.upload.single('video'),
  eventController.createEvent,
);

router.get('/', eventController.getAllevents);
router.get('/:id', eventController.getSingleEvent);
router.put(
  '/:id',
  fileUploader.upload.single('video'),
  eventController.updateEvent,
);
router.delete('/:id', eventController.deleteEvent);

export const eventRouter = router;
