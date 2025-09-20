import express from 'express';
import { fileUploader } from '../../helper/fileUploder';
import { tripController } from './trips.controller';
const router = express.Router();

router.post(
  '/create',
  fileUploader.upload.single('image'),
  tripController.createTrip,
);

router.get('/', tripController.getAllTrips);
router.get('/:id', tripController.getSingleTrip);
router.put(
  '/:id',
  fileUploader.upload.single('image'),
  tripController.updateTrip,
);
router.delete('/:id', tripController.deleteTrip);

export const tripsRouter = router;
                                                                                                                                                                                                                                                                                                                                                           