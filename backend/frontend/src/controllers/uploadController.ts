import { Request, Response } from 'express';
import { importLaborLaw } from '../services/importService';

export const uploadController = {
  async uploadLaborLaw(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const filePath = req.file.path;
      const result = await importLaborLaw(filePath);

      res.json({
        message: 'Labor law file uploaded and processed successfully',
        imported: result
      });
    } catch (error) {
      console.error('Error uploading labor law:', error);
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Failed to upload and process labor law'
      });
    }
  }
};
