import { Router } from 'express';
import { knowledgeBaseController } from '../controllers/knowledgeBaseController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public routes (no authentication required)
router.get('/glossary', knowledgeBaseController.getAllGlossaryTerms);
router.get('/glossary/search', knowledgeBaseController.searchGlossary);
router.get('/faqs', knowledgeBaseController.getAllFAQs);
router.get('/faqs/search', knowledgeBaseController.searchFAQs);
router.get('/laws', knowledgeBaseController.getAllLawArticles);
router.get('/laws/search', knowledgeBaseController.searchLaws);
router.get('/updates', knowledgeBaseController.getRecentUpdates);

// Protected routes (require authentication)
router.use(authMiddleware);

// Glossary management
router.post('/glossary', knowledgeBaseController.addGlossaryTerm);
router.put('/glossary/:id', knowledgeBaseController.updateGlossaryTerm);

// FAQ management
router.post('/faqs', knowledgeBaseController.addFAQ);
router.put('/faqs/:id', knowledgeBaseController.updateFAQ);

// Law article management
router.post('/laws', knowledgeBaseController.addLawArticle);
router.put('/laws/:id', knowledgeBaseController.updateLawArticle);

// Bulk imports
router.post('/faqs/import', knowledgeBaseController.importFAQs);
router.post('/laws/import', knowledgeBaseController.importLawArticles);

export default router;
