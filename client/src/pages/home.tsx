const HomePage = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-2/3 gap-8 p-6 lg:p-8">
        <div className="flex flex-1 flex-col gap-6 py-12 lg:gap-12">
          <h1 className="text-4xl font-bold lg:text-6xl">
            The Perfect Place for Every
            <span className="text-cyan-500"> Movie Lover</span>
          </h1>
          <p className="font-thin">
            Track, rate, and rediscover your favorites. Search or join
          </p>
          <a href="/register">
            <button className="mt-6 flex w-3/4 cursor-pointer items-center justify-center gap-2 self-center rounded-lg bg-cyan-500 p-5 px-4 text-xl transition-all duration-200 hover:scale-105 hover:bg-cyan-800 hover:text-slate-200">
              Join now
            </button>
          </a>
        </div>
        <div className="flex flex-1">
          <img
            src="hero.jpg"
            alt=""
            className="hover:shadow-[10px_10px_0px_rgba(6 182 212)] h-3/4 rounded-lg border border-cyan-500 object-cover transition-all duration-300"
          />
        </div>
      </div>
      <div className="grid h-1/3 grid-cols-3 justify-between gap-4 p-6 lg:gap-12">
        <div className="hero-card">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-12 text-yellow-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold">
            <span className="conte border-b border-b-cyan-500">Rate</span>
          </h3>
          <p className="p-2 font-thin">
            You can rate every movie and create your own clasification
          </p>
        </div>
        <div className="hero-card">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-12 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold">
            <span className="conte border-b border-b-cyan-500">Comment</span>
          </h3>
          <p className="p-2 font-thin">Add notes with your thoughts</p>
        </div>
        <div className="hero-card">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-12 text-lime-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold">
            <span className="conte border-b border-b-cyan-500">
              Add to lists
            </span>
          </h3>
          <p className="p-2 font-thin">
            Create your personal list with favourites or want-watch movies
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
