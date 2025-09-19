import { Router } from 'express';
import { instructionController } from '../controllers/instructionController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public routes (no authentication required)
router.get('/category/:category', instructionController.getInstructionsForCategory);
router.get('/category/:category/metadata', instructionController.getCategoryMetadata);

// Protected routes (require authentication)
router.use(authMiddleware);
router.get('/', instructionController.getAllInstructions);
router.get('/:id', instructionController.getInstructionById);
router.post('/', instructionController.createInstruction);
router.put('/:id', instructionController.updateInstruction);
router.delete('/:id', instructionController.deleteInstruction);

export default router;
