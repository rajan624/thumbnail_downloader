export default async function handler(req, res) {
  const imageUrl = req.query.url;

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", "image/jpeg");
    res.status(200).send(buffer);
  } catch (error) {
    console.error("Error downloading image:", error.message);
    res.status(500).json({ error: error.message });
  }
}
