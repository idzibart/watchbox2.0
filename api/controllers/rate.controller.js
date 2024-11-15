import prisma from "../lib/prisma.js";

//RATING
export const rateMovie = async (req, res) => {
  const { imdbID, rate, title, year, poster, runtime, genre, country } = req.body;
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
        title: title,
        year: year,
        poster: poster,
        runtime: runtime,
        genre: genre,
        country: country,
      },
      create: {
        userId: userId,
        movieId: imdbID,
        rate: rate,
        title: title,
        year: year,
        poster: poster,
        runtime: runtime,
        genre: genre,
        country: country,
      },
    });
    res.status(200).json(rating);
  } catch (error) {
    console.error("Error saving rating:", error);
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

//FETCHING RATE PER USER
export const getRatedMovies = async (req, res) => {
  const userId = req.userId;

  try {
    const ratedMovies = await prisma.rating.findMany({
      where: { userId: userId },
      include: {
        user: true,  // optional, include if you want user data in the response
      },
    });
    res.status(200).json(ratedMovies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rated movies", error });
  }
};
