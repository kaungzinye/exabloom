const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');

// Get recent conversations with pagination
router.get('/recent', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    
    const result = await conversationController.getRecentConversations(page, limit);
    res.json(result);
  } catch (error) {
    console.error('Error fetching recent conversations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search conversations
router.get('/search', async (req, res) => {
  try {
    const { q: searchTerm, page, limit } = req.query;
    
    if (!searchTerm) {
      return res.status(400).json({ error: 'Search term is required' });
    }
    
    const result = await conversationController.searchConversations(
      searchTerm,
      parseInt(page) || 1,
      parseInt(limit) || 50
    );
    
    res.json(result);
  } catch (error) {
    console.error('Error searching conversations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 