import prisma from "../lib/prisma.js";

//RATING
export const rateMovie = async (req, res) => {
  const { imdbID, rate } = req.body;
  const userId = req.userId;

  if (!imdbID || rate == null) {
    return res.status(400).json({ message: "imdbID and rate are required" });
  }

  try {
    const rating = await prisma.rating.upsert({
      where: {
        userId_movieId: {
          userId: userId,
          movieId: imdbID,
        },
      },
      update: {
        rate: rate,
      },
      create: {
        userId: userId,
        movieId: imdbID,
        rate: rate,
      },
    });
    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: "Error saving rating", error });
  }
};

//FETCHING RATE
export const getRating = async (req, res) => {
  const { imdbID } = req.params;
  const userId = req.userId;

  try {
    const rating = await prisma.rating.findUnique({
      where: {
        userId_movieId: {
          userId: userId,
          movieId: imdbID,
        },
      },
    });
    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rating", error });
  }
};
