import axios from "axios";

export const searchMovie = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const apiKey = process.env.OMDB_API_KEY;
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${title}`
    );

    if (response.data.Response === "False") {
      return res.status(404).json({ message: response.data.Error });
    }

    res.status(200).json(response.data.Search);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data from OMDB", error });
  }
};
