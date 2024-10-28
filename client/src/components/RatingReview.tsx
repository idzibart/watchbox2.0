type RatingReviewProps = {
  rating: number;
  setRating: (star: number) => void;
};

const RatingReview = ({ rating, setRating }: RatingReviewProps) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <span
            className="start"
            style={{
              cursor: "pointer",
              color: rating >= star ? "gold" : "gray",
              fontSize: `40px`,
            }}
            onClick={() => {
              setRating(star);
            }}
          >
            {" "}
            ★{" "}
          </span>
        );
      })}
    </div>
  );
};

export default RatingReview;
