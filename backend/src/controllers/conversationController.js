const { query } = require('../config/database');

async function getRecentConversations(page = 1, limit = 50) {
  const offset = (page - 1) * limit;
  
  const conversationsQuery = `
    SELECT 
      c.id as contact_id,
      c.name,
      c.email,
      m.content as last_message,
      m.created_at as last_message_time
    FROM contacts c
    JOIN (
      SELECT DISTINCT ON (contact_id) 
        contact_id,
        content,
        created_at
      FROM messages
      ORDER BY contact_id, created_at DESC
    ) m ON c.id = m.contact_id
    ORDER BY m.created_at DESC
    LIMIT $1 OFFSET $2
  `;
  
  const countQuery = `
    SELECT COUNT(DISTINCT contact_id) as total
    FROM messages
  `;
  
  const [conversations, count] = await Promise.all([
    query(conversationsQuery, [limit, offset]),
    query(countQuery)
  ]);
  
  return {
    conversations: conversations.rows,
    pagination: {
      total: parseInt(count.rows[0].total),
      page,
      limit,
      totalPages: Math.ceil(parseInt(count.rows[0].total) / limit)
    }
  };
}

async function searchConversations(searchTerm, page = 1, limit = 50) {
  const offset = (page - 1) * limit;
  const searchPattern = `%${searchTerm}%`;
  
  const searchQuery = `
    SELECT DISTINCT
      c.id as contact_id,
      c.name,
      c.email,
      m.content as last_message,
      m.created_at as last_message_time
    FROM contacts c
    JOIN messages m ON c.id = m.contact_id
    WHERE 
      c.name ILIKE $1 OR
      c.email ILIKE $1 OR
      m.content ILIKE $1
    ORDER BY m.created_at DESC
    LIMIT $2 OFFSET $3
  `;
  
  const countQuery = `
    SELECT COUNT(DISTINCT c.id) as total
    FROM contacts c
    JOIN messages m ON c.id = m.contact_id
    WHERE 
      c.name ILIKE $1 OR
      c.email ILIKE $1 OR
      m.content ILIKE $1
  `;
  
  const [results, count] = await Promise.all([
    query(searchQuery, [searchPattern, limit, offset]),
    query(countQuery, [searchPattern])
  ]);
  
  return {
    conversations: results.rows,
    pagination: {
      total: parseInt(count.rows[0].total),
      page,
      limit,
      totalPages: Math.ceil(parseInt(count.rows[0].total) / limit)
    }
  };
}

module.exports = {
  getRecentConversations,
  searchConversations
}; 