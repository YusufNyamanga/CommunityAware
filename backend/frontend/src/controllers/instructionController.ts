import { Request, Response } from 'express';
import { instructionService } from '../services/instructionService';

export const instructionController = {
  getAllInstructions(req: Request, res: Response) {
    try {
      const instructions = instructionService.getAllInstructions();
      res.json(instructions);
    } catch (error) {
      console.error('Error getting instructions:', error);
      res.status(500).json({ error: 'Failed to get instructions' });
    }
  },

  getInstructionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const instruction = instructionService.getInstruction(id);
      
      if (!instruction) {
        return res.status(404).json({ error: 'Instruction not found' });
      }
      
      res.json(instruction);
    } catch (error) {
      console.error('Error getting instruction:', error);
      res.status(500).json({ error: 'Failed to get instruction' });
    }
  },

  getInstructionsForCategory(req: Request, res: Response) {
    try {
      const { category } = req.params;
      const instructions = instructionService.getInstructionsForCategory(category);
      res.json({ instructions });
    } catch (error) {
      console.error('Error getting category instructions:', error);
      res.status(500).json({ error: 'Failed to get category instructions' });
    }
  },

  getCategoryMetadata(req: Request, res: Response) {
    try {
      const { category } = req.params;
      const metadata = instructionService.getCategoryMetadata(category);
      
      if (!metadata) {
        return res.status(404).json({ error: 'Category metadata not found' });
      }
      
      res.json(metadata);
    } catch (error) {
      console.error('Error getting category metadata:', error);
      res.status(500).json({ error: 'Failed to get category metadata' });
    }
  },

  createInstruction(req: Request, res: Response) {
    try {
      const instruction = instructionService.addInstruction(req.body);
      res.status(201).json(instruction);
    } catch (error) {
      console.error('Error creating instruction:', error);
      res.status(500).json({ error: 'Failed to create instruction' });
    }
  },

  updateInstruction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = instructionService.updateInstruction(id, req.body);
      
      if (!success) {
        return res.status(404).json({ error: 'Instruction not found' });
      }
      
      const updatedInstruction = instructionService.getInstruction(id);
      res.json(updatedInstruction);
    } catch (error) {
      console.error('Error updating instruction:', error);
      res.status(500).json({ error: 'Failed to update instruction' });
    }
  },

  deleteInstruction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = instructionService.deleteInstruction(id);
      
      if (!success) {
        return res.status(404).json({ error: 'Instruction not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting instruction:', error);
      res.status(500).json({ error: 'Failed to delete instruction' });
    }
  }
};
