  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { FiSearch, FiBell, FiUser, FiChevronLeft, FiChevronRight, FiClock, FiMenu } from 'react-icons/fi';

  // --- DUMMY DATA ---
  const ARTISTS_PER_PAGE = 4;
  const INITIAL_POPULAR_LIMIT = 3;
  const INITIAL_FAVORITES_LIMIT = 3;
  const DUMMY_MOVIE_DESCRIPTION = "Explore this movie's captivating plot, thrilling action sequences, and stellar cast. Click 'Watch' to start streaming!";

  // Extended movie list for Movies page only
  const allMoviesData = [
    { id: 1, name: 'John Wick', genre: 'Action, Horror', rating: 7.4, src: "/John Wick.jpg", heroSrc: "/John Wick.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 2, name: 'Mad Max', genre: 'Action, Adventure', rating: 8.1, src: "/Mad Max.jpg", heroSrc: "/Mad Max.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 3, name: 'Ip Man 2', genre: 'Action, Biography', rating: 7.2, src: "/Ip Man 2.jpg", heroSrc: "/Ip Man 2.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 4, name: 'Extraction 2', genre: 'Action, Thriller', rating: 7.0, src: "/Extraction 2.jpg", heroSrc: "/Extraction 2.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 5, name: 'Mission Impossible', genre: 'Spy, Action', rating: 8.0, src: "/Mission Impossible.jpg", heroSrc: "/Mission Impossible.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 6, name: 'The Dark Knight', genre: 'Action, Crime', rating: 9.0, src: "/The Dark Knight.jpg", heroSrc: "/The Dark Knight.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 7, name: 'Mr_and_Mrs_Bachelor', genre: 'Action, Sci-Fi', rating: 8.4, src: "/Mr_and_Mrs_Bachelor.jpg", heroSrc: "/Mr_and_Mrs_Bachelor.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 8, name: 'tillu', genre: 'Sci-Fi, Thriller', rating: 8.0, src: "/tillu.jpg", heroSrc: "/tillu.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 9, name: 'Buddy', genre: 'Sci-Fi, Drama', rating: 8.6, src: "/buddy.jpg", heroSrc: "/buddy.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 10, name: 'Lucky Bhaskar', genre: 'Sci-Fi, Action', rating: 3.7, src: "/Luck Bhaskar.jpg", heroSrc: "/Luck Bhaskar.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 11, name: 'Family Star', genre: 'Action, Drama', rating: 8.5, src: "/Family Star.jpg", heroSrc: "/Family Star.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 12, name: 'Kingston', genre: 'Crime, Drama', rating: 1.2, src: "/Kingston.jpg", heroSrc: "/Kingston.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 13, name: 'Family Star', genre: 'Crime, Drama', rating: 5.9, src: "/Family Star.jpg", heroSrc: "/Family Star.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 14, name: 'Miss You', genre: 'Drama, Romance', rating: 4.8, src: "/miss You.jpg", heroSrc: "/miss You.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 15, name: 'Raayan', genre: 'Drama', rating: 9.3, src: "/Raayan.jpg", heroSrc: "/Raayan.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 16, name: 'Mr.Bachchan', genre: 'Drama, Thriller', rating: 8.8, src: "/Mr.Bachchan.jpg", heroSrc: "/Mr.Bachchan.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 17, name: 'Do Patti', genre: 'Fantasy, Adventure', rating: 8.9, src: "/Do Patti.jpg", heroSrc: "/Do Patti.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 18, name: 'Rebel', genre: 'Sci-Fi, Adventure', rating: 2.6, src: "/Rebel.jpg", heroSrc: "/Rebel.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 19, name: 'Kingston', genre: 'Adventure, Sci-Fi', rating: 1.1, src: "/Kingston.jpg", heroSrc: "/Kingston.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 20, name: 'Crew', genre: 'Action, Adventure', rating: 7.3, src: "/Crew.jpg", heroSrc: "/Crew.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 22, name: 'Bagheera', genre: 'Action, Sci-Fi', rating: 7.9, src: "/Bagheera.jpg", heroSrc: "/Bagheera.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 23, name: 'Shaitaan', genre: 'Action, Comedy', rating: 7.9, src: "/Shaitaan.jpg", heroSrc: "/Shaitaan.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 24, name: 'Bhool Bhulaiyaa', genre: 'Action, Adventure', rating: 1.3, src: "/Bhool Bhulaiyaa.jpg", heroSrc: "/Bhool Bhulaiyaa.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 25, name: 'Premalu', genre: 'Action, Comedy', rating: 8.0, src: "/Premalu.jpg", heroSrc: "/Premalu.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 26, name: 'Kalvan', genre: 'Action, Fantasy', rating: 7.5, src: "/Kalvan.jpg", heroSrc: "/Kalvan.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 27, name: 'Kadal', genre: 'Action, Adventure', rating: 6.7, src: "/Kadal.jpg", heroSrc: "/Kadal.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 28, name: 'Kho-Kho', genre: 'Action, Comedy', rating: 7.3, src: "/Kho-Kho.jpg", heroSrc: "/Kho-Kho.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 29, name: 'Crew', genre: 'Action, Sci-Fi', rating: 8.0, src: "/Crew.jpg", heroSrc: "/Crew.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 30, name: 'Bagheera', genre: 'Action, Fantasy', rating: 7.4, src: "/Bagheera.jpg", heroSrc: "/Bagheera.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  ];

  const allArtists = [
    { name: 'Charlize Theron', movies: '+12 Movies', src: '/charlize theron.jpg' },
    { name: 'Laurence Fishburne', movies: '+27 Movies', src: '/Laurence Fishburne.jpg' },
    { name: 'Martin Freeman', movies: '+10 Movies', src: '/Martin Freeman.jpg' },
    { name: 'Keanu Reeves', movies: '+27 Movies', src: '/Keanu Reeves.jpg' },
    { name: 'Tom Hanks', movies: '+15 Movies', src: '/tom hanks.jpg' },
    { name: 'Scarlett Johansson', movies: '+20 Movies', src: '/scarlett johansson.jpg' },
    { name: 'Denzel Washington', movies: '+30 Movies', src: '/denzel washington.jpg' },
    { name: 'Zendaya', movies: '+8 Movies', src: '/zendaya.jpg' },
  ];

  const allContinueWatching = [
    { id: 4, name: 'Matrix Revolution', progress: 75, src: "/Matrix Revolution.jpg", type: 'movie' },
    { id: 1, name: 'Deadpool', progress: 50, src: "/Deadpool.jpg", type: 'movie' },
    { id: 101, name: 'The Lord of the Rings', progress: 30, src: "/The Lord of the Rings.jpg", type: 'tv-series' },
    { id: 6, name: 'Interstellar', progress: 90, src: "/Interstellar.jpg", type: 'movie' },
    { id: 201, name: 'Demon Slayer', progress: 20, src: "/Demon Slayer.jpg", type: 'anime' },
  ];

  // TV Series data
  const allTVSeriesData = [
    { id: 101, name: 'The Lord of the Rings', genre: 'Fantasy, Adventure', rating: 9.2, src: "/The Lord of the Rings.jpg", heroSrc: "/The Lord of the Rings.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 102, name: 'The Royals', genre: 'Drama, Romance', rating: 7.8, src: "/The Royals.jpg", heroSrc: "/The Royals.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 103, name: 'Welcome to Derry', genre: 'Horror, Thriller', rating: 8.5, src: "/Welcome to Derry.jpg", heroSrc: "/Welcome to Derry.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 104, name: 'Mismatched', genre: 'Romance, Comedy', rating: 7.6, src: "/Mismatched.jpg", heroSrc: "/Mismatched.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 105, name: 'The Boys', genre: 'Action, Superhero', rating: 8.9, src: "/The Boys.jpg", heroSrc: "/The Boys.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 106, name: 'Chief of War', genre: 'Drama, Historical', rating: 8.3, src: "/Chief of War.jpg", heroSrc: "/Chief of War.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 107, name: 'Call Me Bae', genre: 'Comedy, Drama', rating: 7.4, src: "/Call Me Bae.jpg", heroSrc: "/Call Me Bae.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  ];

  // Anime data
  const allAnimeData = [
    { id: 201, name: 'One Punch Man', genre: 'Action, Comedy', rating: 8.7, src: "/One Punch Man.jpg", heroSrc: "/One Punch Man.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 202, name: 'My Hero Academia', genre: 'Action, Superhero', rating: 8.4, src: "/My Hero Academia.jpg", heroSrc: "/My Hero Academia.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 203, name: 'Devil May Cry', genre: 'Action, Fantasy', rating: 7.9, src: "/Devil May Cry.jpg", heroSrc: "/Devil May Cry.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 204, name: 'Vinland Saga', genre: 'Adventure, Drama', rating: 9.1, src: "/Vinland Saga.jpg", heroSrc: "/Vinland Saga.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 205, name: 'Castlevania', genre: 'Horror, Fantasy', rating: 8.3, src: "/Castlevania.jpg", heroSrc: "/Castlevania.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 206, name: 'Bleach', genre: 'Action, Adventure', rating: 8.2, src: "/Bleach.jpg", heroSrc: "/Bleach.jpg", description: DUMMY_MOVIE_DESCRIPTION },
    { id: 207, name: 'Naruto', genre: 'Action, Adventure', rating: 8.8, src: "/Naruto.jpg", heroSrc: "/Naruto.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  ];

  // Popular content - combine all movies, TV series, and anime, then sort by rating and take top 6
  const popularMoviesData = [...allMoviesData, ...allTVSeriesData, ...allAnimeData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  // All content combined
  const allContent = [...allMoviesData, ...allTVSeriesData, ...allAnimeData];

  // Fan Favourite - Top rated content from all categories (rating >= 8.5)
  const fanFavouriteData = allContent
    .filter(item => item.rating >= 8.5)
    .sort((a, b) => b.rating - a.rating);

  // Rated Movies - High rated content (rating >= 8.0) - simulating user-rated content
  const ratedMoviesData = allContent
    .filter(item => item.rating >= 8.0)
    .sort((a, b) => b.rating - a.rating);

  // Coming Soon - Latest content (using higher IDs as newer content)
  const comingSoonData = allContent
    .filter(item => item.id > 15) // Simulating newer releases
    .sort((a, b) => b.id - a.id)
    .slice(0, 12); // Show top 12 upcoming items

  // --- POPULAR MOVIES SIDEBAR ---
  const PopularMoviesSidebar = ({ onMovieSelect }) => (
    <aside className="hidden lg:flex lg:flex-col w-80 bg-gray-900 border-l border-gray-800 flex-shrink-0 p-4 h-full overflow-y-auto">
      <div>
        <h3 className="text-xl font-bold mb-4">Popular Movies</h3>
        <div className="space-y-4">
          {popularMoviesData.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onMovieSelect(movie)}
              className="flex items-center space-x-3 bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition cursor-pointer"
            >
              <img src={movie.src} alt={movie.name} className="w-16 h-16 object-cover rounded-lg" />
              <div>
                <p className="font-semibold">{movie.name}</p>
                <p className="text-gray-400 text-sm">{movie.genre}</p>
                <span className="text-yellow-400 text-sm font-bold flex items-center">
                  <span className="mr-1">⭐</span>{movie.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );

  // --- MOVIE CARD COMPONENT ---
  const MovieCard = ({ movie, onClick }) => (
    <div 
      onClick={onClick}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-amber-900/50 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group max-w-[200px]"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={movie.src} 
          alt={movie.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-1.5 right-1.5 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">
          ⭐ {movie.rating}
        </div>
      </div>
      <div className="p-2">
        <p className="text-pink-500 text-xs font-semibold mb-1">HD Movies</p>
        <h3 className="text-white font-semibold text-xs mb-1.5 line-clamp-2 leading-tight">{movie.name}</h3>
        <div className="flex items-center space-x-1">
          <span className="text-pink-500 text-sm">❤</span>
          <span className="text-gray-400 text-xs">{Math.floor(movie.rating * 100)}</span>
        </div>
      </div>
    </div>
  );

  // --- OTHER PAGE CONTENT ---
  export const OtherPageContent = ({ title }) => {
    const navigate = useNavigate();
    // Show appropriate content based on the page title
    let displayMovies = [];
    
    if (title === 'Movies') {
      displayMovies = allMoviesData;
    } else if (title === 'TV Series') {
      displayMovies = allTVSeriesData;
    } else if (title === 'Animes') {
      displayMovies = allAnimeData;
    } else if (title === 'Fan Favourite') {
      displayMovies = fanFavouriteData;
    } else if (title === 'Rated Movies') {
      displayMovies = ratedMoviesData;
    } else if (title === 'Coming Soon') {
      displayMovies = comingSoonData;
    } else if (title === 'Trends') {
      // Trends - show all content sorted by rating
      displayMovies = allContent.sort((a, b) => b.rating - a.rating).slice(0, 20);
    }

    const handleMovieClick = (movieId) => {
      // Determine content type and navigate to appropriate route
      const isMovie = allMoviesData.find(m => m.id === movieId);
      const isTVSeries = allTVSeriesData.find(m => m.id === movieId);
      const isAnime = allAnimeData.find(m => m.id === movieId);
      
      if (isMovie) {
        navigate(`/movie/${movieId}`);
      } else if (isTVSeries) {
        navigate(`/tv-series/${movieId}`);
      } else if (isAnime) {
        navigate(`/anime/${movieId}`);
      }
    };

    return (
      <div className="flex-grow overflow-y-auto pr-0 lg:pr-4 px-4 lg:px-0">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 mt-4 text-white">
          {title}
        </h2>
        
        {displayMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 pb-8">
            {displayMovies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onClick={() => handleMovieClick(movie.id)}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-64 md:h-80 lg:h-96 bg-gray-700 rounded-lg flex items-center justify-center mb-6 md:mb-10">
            <p className="text-gray-400 text-2xl">This is the dedicated {title} page!</p>
          </div>
        )}
      </div>
    );
  };

  // --- MAIN CONTENT (Hero Banner) ---
  const MainContent = ({ currentHeroMovie, setCurrentHeroMovie }) => {
    const navigate = useNavigate();

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentHeroMovie((prev) => {
          const i = popularMoviesData.findIndex((m) => m.id === prev.id);
          return popularMoviesData[(i + 1) % popularMoviesData.length];
        });
      }, 5000);
      return () => clearInterval(interval);
    }, [setCurrentHeroMovie]);

    const handleHeroClick = () => {
      // Determine content type based on ID ranges
      let contentType = 'movie';
      if (currentHeroMovie.id >= 101 && currentHeroMovie.id <= 199) {
        contentType = 'tv-series';
      } else if (currentHeroMovie.id >= 201 && currentHeroMovie.id <= 299) {
        contentType = 'anime';
      }
      navigate(`/${contentType}/${currentHeroMovie.id}`);
    };

    return (
      <main className="pr-0 lg:pr-4">
        <div 
          onClick={handleHeroClick}
          className="relative w-full h-64 md:h-80 lg:h-96 bg-gray-700 rounded-lg overflow-hidden mb-6 lg:mb-10 cursor-pointer group"
        >
          <img src={currentHeroMovie.heroSrc} alt={currentHeroMovie.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent p-4 md:p-6 lg:p-8 flex flex-col justify-end">
            <span className="text-amber-500 text-xs md:text-sm font-semibold mb-1 md:mb-2">{currentHeroMovie.genre}</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 group-hover:text-amber-500 transition-colors">{currentHeroMovie.name.toUpperCase()}</h2>
            <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6 w-full md:w-2/3 line-clamp-3">{currentHeroMovie.description}</p>
            <div className="flex items-center gap-2 text-sm text-amber-500 font-semibold">
              <span>Click to watch trailer</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </main>
    );
  };

  // --- ARTISTS SECTION ---
  const ArtistCard = ({ name, movies, src }) => (
    <div className="bg-gray-900 rounded-2xl p-3 md:p-4 flex flex-col items-center shadow-md transition hover:scale-105 hover:shadow-amber-900/30 hover:shadow-xl">
      <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border-3 md:border-4 border-gradient-to-r from-amber-600 to-orange-600 overflow-hidden flex-shrink-0 shadow-lg shadow-amber-900/30">
        <img src={src} alt={name} className="w-full h-full object-cover" />
      </div>
      <p className="font-semibold text-center mt-2 md:mt-3 text-white text-sm md:text-base line-clamp-2 w-full px-1">{name}</p>
      <p className="text-gray-400 text-xs md:text-sm truncate w-full text-center">{movies}</p>
    </div>
  );

  const ArtistsSection = ({ allArtists }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(allArtists.length / ARTISTS_PER_PAGE);
    const startIndex = currentPage * ARTISTS_PER_PAGE;
    const currentArtists = allArtists.slice(startIndex, startIndex + ARTISTS_PER_PAGE);

    const handlePrev = () => setCurrentPage((prev) => Math.max(0, prev - 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));

    return (
      <section className="mb-6 lg:mb-10 pr-0 lg:pr-4 text-white">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">Best Artists</h3>
          <div className="flex space-x-3">
            <button onClick={handlePrev} disabled={currentPage === 0} className={`p-2 rounded-full transition ${currentPage === 0 ? 'text-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600'}`}>
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={handleNext} disabled={currentPage === totalPages - 1} className={`p-2 rounded-full transition ${currentPage === totalPages - 1 ? 'text-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600'}`}>
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {currentArtists.map((artist, index) => (
            <ArtistCard key={index} {...artist} />
          ))}
        </div>
      </section>
    );
  };

  // --- CONTINUE WATCHING SECTION ---
  const ContinueWatchingCard = ({ name, progress, src, onClick }) => (
    <div 
      onClick={onClick}
      className="bg-gray-900 rounded-2xl p-2 md:p-3 flex flex-col items-center shadow-md transition hover:scale-105 hover:shadow-amber-900/30 hover:shadow-xl cursor-pointer"
    >
      <div className="relative rounded-xl overflow-hidden w-full h-28 md:h-32 lg:h-36 mb-2 md:mb-3">
        <img src={src} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
          <button className="p-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 transition shadow-lg">
            <FiClock className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      <p className="font-semibold text-center text-white text-sm truncate w-full">{name}</p>
      <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-gray-400 text-xs mt-1">{progress}% watched</p>
    </div>
  );

  const ContinueWatchingSection = ({ allContinueWatching }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const MOVIES_PER_PAGE = 4;
    const totalPages = Math.ceil(allContinueWatching.length / MOVIES_PER_PAGE);
    const startIndex = currentPage * MOVIES_PER_PAGE;
    const currentMovies = allContinueWatching.slice(startIndex, startIndex + MOVIES_PER_PAGE);

    const handlePrev = () => setCurrentPage((prev) => Math.max(0, prev - 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
    
    const handleMovieClick = (item) => {
      navigate(`/${item.type}/${item.id}`);
    };

    return (
      <section className="mb-6 lg:mb-10 pr-0 lg:pr-4 text-white">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">Continue Watching</h3>
          <div className="flex space-x-3">
            <button onClick={handlePrev} disabled={currentPage === 0} className={`p-2 rounded-full transition ${currentPage === 0 ? 'text-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600'}`}>
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={handleNext} disabled={currentPage === totalPages - 1} className={`p-2 rounded-full transition ${currentPage === totalPages - 1 ? 'text-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600'}`}>
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {currentMovies.map((movie, index) => (
            <ContinueWatchingCard 
              key={index} 
              {...movie} 
              onClick={() => handleMovieClick(movie)}
            />
          ))}
        </div>
      </section>
    );
  };

  // --- TV SERIES SECTION ---
  const TVSeriesSection = () => {
    const navigate = useNavigate();

    const handleSeriesClick = (seriesId) => {
      navigate(`/tv-series/${seriesId}`);
    };

    return (
      <section className="mb-6 lg:mb-10 pr-0 lg:pr-4 text-white">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">TV Series</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-6">
          {allTVSeriesData.map((series) => (
            <MovieCard 
              key={series.id} 
              movie={series} 
              onClick={() => handleSeriesClick(series.id)}
            />
          ))}
        </div>
      </section>
    );
  };

  // --- DASHBOARD (Main Component) ---
  const Dashboard = ({ activeTab, setActiveTab }) => {
    const [currentHeroMovie, setCurrentHeroMovie] = useState(popularMoviesData[0]);

    return (
      <div className="bg-gray-900 text-white w-full h-full overflow-hidden">
        <div className="flex flex-col lg:flex-row w-full h-full">
          {activeTab === 'TV Series' ? (
            <>
              <div className="flex-grow lg:pt-4 overflow-y-auto lg:max-h-screen px-4 lg:px-0">
                <MainContent currentHeroMovie={currentHeroMovie} setCurrentHeroMovie={setCurrentHeroMovie} />
                <ArtistsSection allArtists={allArtists} />
                <ContinueWatchingSection allContinueWatching={allContinueWatching} />
              </div>
              <PopularMoviesSidebar onMovieSelect={(movie) => setCurrentHeroMovie(movie)} />
            </>
          ) : (
            <OtherPageContent title={activeTab} />
          )}
        </div>
      </div>
    );
  };

  export { allMoviesData, allTVSeriesData, allAnimeData };
  export default Dashboard;
