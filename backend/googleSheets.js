import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "google-credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function appendToSheet(sheetName, row) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "175Ovcljdd9mwPG88IxJu8dutBAXttUIp7OT9ojYLclM"; // paste from URL

  // Check sheet exists
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
  const exists = spreadsheet.data.sheets.some(
    s => s.properties.title === sheetName
  );

  // Create sheet if not exists
  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: sheetName } } }],
      },
    });

    // Add headers
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1:J1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            "Name","Roll","Gender","Accommodation",
            "Email","Phone","Branch","Year","Resume","Applied At"
          ],
        ],
      },
    });
  }

  // Append the row
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:J`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}
