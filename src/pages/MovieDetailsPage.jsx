import React from "react"
import { useParams } from "react-router-dom"
import useSWR from "swr"
import { apiKey, fetcher } from "../config"
import { SwiperSlide, Swiper } from "swiper/react"
import MovieCard from "../components/movie/MovieCard"

//https://api.themoviedb.org/3/movie/{movie_id}?api_key=
const MovieDetailsPage = () => {
	const { movieId } = useParams()
	const { data, error } = useSWR(
		`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
		fetcher
	)
	// console.log("🚀 ~ MovieDetailsPage ~ data:", data)
	if (!data) return null
	const { poster_path, backdrop_path, title, genres, overview } = data

	return (
		<>
			<div className="w-full h-[600px] relative">
				<div className="absolute inset-0 bg-black bg-opacity-25"></div>
				<div
					className="w-full h-full  bg-cover bg-no-repeat"
					style={{
						backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
					}}
				></div>
			</div>
			<div className="w-full h-[300px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
				<img
					src={`https://image.tmdb.org/t/p/original/${poster_path}`}
					alt=""
					className="w-full h-full object-cover rounded-xl"
				/>
			</div>
			<h1 className="text-center text-3xl font-bold text-white mb-10">{title}</h1>
			{genres.length > 0 && (
				<div className="flex items-center justify-center gap-x-5 mb-10">
					{genres.map((item) => (
						<span
							className="py-2 px-4 border-primary text-primary border rounded"
							key={item.id}
						>
							{item.name}
						</span>
					))}
				</div>
			)}
			<p className="text-center text-sm leading-relaxed max-w-[600px] mx-auto">{overview}</p>
			<MovieCredits></MovieCredits>
			<MovieVideo></MovieVideo>
			<MovieSimilar></MovieSimilar>
		</>
	)
}

function MovieCredits() {
	const { movieId } = useParams()
	const { data, error } = useSWR(
		`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
		fetcher
	)

	if (!data) return null
	const { cast } = data
	if (!cast || cast.length <= 0) return null
	return (
		<>
			<h2 className="text-center-text-2xl mb-10">Casts</h2>
			<div className="grid grid-cols-4 gap-5">
				{cast.slice(0, 4).map((item) => (
					<div
						className="cast-item"
						key={item.id}
					>
						<img
							src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
							alt=""
							className="w-full h-[350px] object-cover rounded-lg mb-3"
						/>
						<h3 className="text-xl font-medium">{item.name}</h3>
					</div>
				))}
			</div>
		</>
	)
}

function MovieVideo() {
	const { movieId } = useParams()
	const { data, error } = useSWR(
		`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
		fetcher
	)

	if (!data) return null
	const { results } = data
	if (!results || results.length <= 0) return null
	return (
		<div className="py-10">
			<div className="flex flex-col gap-10">
				{results.slice(0, 2).map((item) => (
					<div key={item.id}>
						<h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">
							{item.name}
						</h3>
						<div
							key={item.id}
							className="w-full aspect-video"
						>
							<iframe
								width="1045"
								height="438"
								src={`https://www.youtube.com/embed/${item.key}`}
								title={item.name}
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerPolicy="strict-origin-when-cross-origin"
								allowFullScreen
								className="w-full h-full object-fill"
							></iframe>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

function MovieSimilar() {
	const { movieId } = useParams()
	const { data, error } = useSWR(
		`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`,
		fetcher
	)
	if (!data) return null
	console.log("🚀 ~ MovieSimilar ~ data:", data)
	const { results } = data
	if (!results || results.length <= 0) return null
	return (
		<div className="py-10">
			<h2 className="text-3xl font-medium mb-10">Similar Movie</h2>
			<div className="movie-list">
				<Swiper
					grabCursor={"true"}
					spaceBetween={40}
					slidesPerView={"auto"}
				>
					{results.length > 0 &&
						results.map((item) => (
							<SwiperSlide key={item.id}>
								<MovieCard item={item}></MovieCard>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</div>
	)
}

export default MovieDetailsPage
