const db = require('../config/db');
// Fetch all comments
/*exports.getAllComments = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM comments');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// Add a comment
exports.addComment = async (req, res) => {
  const { text } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO comments (text) VALUES ($1) RETURNING *',
      [text]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};*/
exports.getAllComments = async (req, res) => {
  try {
    // Call the model method to fetch all species
    const sqlQuery = 'SELECT * FROM comments'; // Adjust query as needed
    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'Failed to fetch comments' });
      }

      // Respond with fetched species data
      res.status(200).json({
        message: 'comments fetched successfully.',
        species: result.rows, // Return the rows from the query result
      });
    });
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ error: 'An unexpected error occurred while fetching languages.' });
  }
};

// Add a new species
exports.addComment = async (req, res) => {
  try {
    const { text} = req.body;

    console.log(req.body); // Debugging: Check incoming data

  
    // Corrected SQL query for PostgreSQL
    const sqlQuery = `
      INSERT INTO comments (text) 
      VALUES ($1) RETURNING id
    `;

    const values = [text];

    // Execute the query
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'An error occurred while adding the comment.' });
      }

      // Success response
      res.status(200).json({
        message: 'comment added successfully.',
        species: {
          id: result.rows[0].id, // Use the RETURNING clause to get the ID
          text,
        },
      });
    });
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};