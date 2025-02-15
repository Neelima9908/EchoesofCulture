const db = require('../config/db');

// Fetch all tribes
exports.getAllTribes = async (req, res) => {
  try {
    // Call the model method to fetch all species
    const sqlQuery = 'SELECT * FROM tribes ORDER BY id ASC'; // Adjust query as needed
    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'An error occurred while fetching tribes.' });
      }

      // Respond with fetched species data
      res.status(200).json({
        message: 'tribes fetched successfully.',
        tribes: result.rows, // Return the rows from the query result
      });
    });
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ error: 'An unexpected error occurred while fetching tribes.' });
  }
};

// Add a new species
exports.addTribe = async (req, res) => {
  try {
    const { name, description, location,customs, language_ids} = req.body;

    console.log(req.body); // Debugging: Check incoming data

  
    // Corrected SQL query for PostgreSQL
    const sqlQuery = `
      INSERT INTO tribes (name, description, location,customs, language_ids) 
      VALUES ($1, $2, $3, $4, $5) RETURNING id
    `;

    const values = [name, description, location,customs, language_ids];

    // Execute the query
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'An error occurred while adding the Tribe.' });
      }

      // Success response
      res.status(200).json({
        message: 'Tribe added successfully.',
        tribes: {
          id: result.rows[0].id, // Use the RETURNING clause to get the ID
          name, description, location,customs, language_ids,
        },
      });
    });
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};
exports.checkSpecies = async (req, res) => {
  const speciesName = req.query.name; // Get species name from query parameters
  console.log(speciesName);
  // Validate that species name is provided
  if (!speciesName) {
    return res.status(400).json({ message: 'Species name is required.' });
  }

  try {
    // SQL query to check if a species exists
    const sqlQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM tribes
        WHERE LOWER(name) = LOWER($1)
      ) AS exists;
    `;

    const values = [speciesName];

    // Execute the query
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ message: 'An error occurred while checking species.' });
      }

      // Retrieve the result of the existence check
      const exists = result.rows[0].exists;

      // Respond with the existence status
      res.status(200).json({ exists });
    });
  } catch (error) {
    console.error('Unexpected Error:', error);
    res.status(500).json({ message: 'An unexpected error occurred while checking species.' });
  }
};
