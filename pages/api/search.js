import Papa from "papaparse";

export default async function handler(req, res) {
  const { number } = req.query;

  if (!number) {
    return res.status(400).json({ error: "Missing number parameter" });
  }

  try {
    // Your Google Drive direct download link
    const CSV_URL =
      "https://drive.usercontent.google.com/download?id=1DxTbheGqCMIQro3xopAkB2DJpVJoA1zS&export=download&authuser=0";

    // Fetch the CSV file
    const response = await fetch(CSV_URL);
    const csvText = await response.text();

    // Parse CSV
    const { data } = Papa.parse(csvText, { header: false });

    // Search for the number
    const found = data.find(
      (row) => row[0] && row[0].toString().trim() === number.toString().trim()
    );

    if (!found) {
      return res.status(404).json({ message: "Number not found" });
    }

    // Construct readable response
    const result = {
      mobile: found[0] || "",
      name: found[1] || "",
      father_name: found[2] || "",
      address: found[3] || "",
      alt_number: found[4] || "",
      circle: found[5] || "",
      aadhar: found[6] || "",
      email: found[7] || "",
    };

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
