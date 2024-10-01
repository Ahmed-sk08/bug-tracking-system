const Bug = require('./models/bug'); // Corrected the path to match the file name

const getBugCount = async (req, res) => {
  try {
    const totalBugs = await Bug.countDocuments();
    res.json({ totalBugs });
  } catch (error) {
    console.error('Error fetching total bug count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getBugsByStatus = async (req, res) => {
  try {
    const openBugs = await Bug.countDocuments({ status: 'Open' });
    const closedBugs = await Bug.countDocuments({ status: 'Closed' });
    res.json({ openBugs, closedBugs });
  } catch (error) {
    console.error('Error fetching bugs by status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getBugCount, getBugsByStatus };
