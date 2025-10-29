// pages/api/search.js
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export default function handler(req, res) {
  const { number } = req.query;

  if (!number) {
    return res.status(400).json({ error: "Number parameter missing" });
  }

  const results = [];
  const filePath = path.join(process.cwd(), 'sample.csv');

  try {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => results.push(row))
      .on('end', () => {
        // Normalize both number fields for matching
        const found = results.find(
          (r) => r.number === number || r.number === String(number)
        );

        if (found) {
          res.status(200).json(found);
        } else {
          res.status(404).json({ error: "Number not found" });
        }
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
