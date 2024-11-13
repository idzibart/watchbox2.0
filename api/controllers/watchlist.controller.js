import prisma from "../lib/prisma.js";

// ADD TO WATCHLIST
export const addToWatchlist = async (req, res) => {
  const { imdbID } = req.body;
  const userId = req.userId;

  if (!imdbID) {
    return res.status(400).json({ message: "imdbID is required" });
  }

  try {
    const watchlistItem = await prisma.watchlist.upsert({
      where: {
        userId_movieId: {
          userId: userId,
          movieId: imdbID,
        },
      },
      update: {},
      create: {
        userId: userId,
        movieId: imdbID,
      },
    });
    res.status(200).json(watchlistItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding to watchlist", error });
  }
};

// CHECK IF A MOVIE IS ON WATCHLIST
export const isOnWatchlist = async (req, res) => {
  const { imdbID } = req.params;
  const userId = req.userId;

  try {
    const watchlistItem = await prisma.watchlist.findUnique({
      where: {
        userId_movieId: {
          userId: userId,
          movieId: imdbID,
        },
      },
    });
    res.status(200).json({ isOnWatchlist: !!watchlistItem });
  } catch (error) {
    res.status(500).json({ message: "Error checking watchlist", error });
  }
};

// DELETE FROM WATCHLIST
export const removeFromWatchlist = async (req, res) => {
  const { imdbID } = req.params;
  const userId = req.userId;

  try {
    await prisma.watchlist.delete({
      where: {
        userId_movieId: {
          userId: userId,
          movieId: imdbID,
        },
      },
    });
    res.status(200).json({ message: "Removed from watchlist" });
  } catch (error) {
    res.status(500).json({ message: "Error removing from watchlist", error });
  }
};
