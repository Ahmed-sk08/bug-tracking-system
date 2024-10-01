const Bug = require('./models/bug');
const fs = require('fs');
const path = require('path');

const generateReport = async (req, res) => {
  try {
    const bugs = await Bug.find();

    const reportData = bugs.map((bug) => ({
      title: bug.title,
      description: bug.description,
      status: bug.status,
      created_at: bug.created_at,
      updated_at: bug.updated_at,
    }));

    const filePath = path.join(__dirname, '../reports/report.json');
    fs.writeFileSync(filePath, JSON.stringify(reportData, null, 2));

    res.download(filePath, 'report.json');
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { generateReport };
