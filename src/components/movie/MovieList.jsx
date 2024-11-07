import React, { useEffect, useState } from "react"
import { SwiperSlide, Swiper } from "swiper/react"
import MovieCard from "./MovieCard"
import { fetcher } from "./../../config"
import useSWR from "swr"

// api key: 0e17369040051d4c2889cd9139f3b77f

const MovieList = ({ type = "now_playing" }) => {
	const [movies, setMovies] = useState([])
	const { data, error, isLoading } = useSWR(
		`https://api.themoviedb.org/3/movie/${type}?api_key=0e17369040051d4c2889cd9139f3b77f`,
		fetcher
	)
	useEffect(() => {
		if (data && data.results) setMovies(data.results)
	}, [data])
	return (
		<div className="movie-list">
			<Swiper
				grabCursor={"true"}
				spaceBetween={40}
				slidesPerView={"auto"}
			>
				{movies.length > 0 &&
					movies.map((item) => (
						<SwiperSlide key={item.id}>
							<MovieCard item={item}></MovieCard>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	)
}

export default MovieList
