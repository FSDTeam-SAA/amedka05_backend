import express from 'express';
import { contactController } from './contact.controller';
const router = express.Router();

router.post('/create', contactController.createContact);
router.get('/', contactController.getAllContact);
router.get('/:id', contactController.getSingleContact);
router.put('/:id', contactController.updatedContact);
router.delete('/:id', contactController.deleteContact);

export const contactRouter = router;
