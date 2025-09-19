import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { uploadController } from '../controllers/uploadController';
import { authMiddleware } from '../middleware/auth';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../data/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, 'labour_law.pdf');
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

const router = Router();

// Protected routes
router.use(authMiddleware);

// Upload endpoints
router.post('/law', upload.single('pdf'), uploadController.uploadLaborLaw);

export default router;
