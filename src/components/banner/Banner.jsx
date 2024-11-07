import React, { useEffect, useState } from "react"
import useSWR from "swr"
import { fetcher } from "../../config"
import { SwiperSlide, Swiper } from "swiper/react"

const Banner = () => {
	const { data, error, isLoading } = useSWR(
		`https://api.themoviedb.org/3/movie/upcoming?api_key=0e17369040051d4c2889cd9139f3b77f`,
		fetcher
	)
	const movies = data?.results || []
	console.log("🚀 ~ Banner ~ movies:", movies)
	return (
		<section className="banner h-[500px] page-container mb-20 overflow-hidden">
			<Swiper
				grabCursor={"true"}
				slidesPerView={"auto"}
			>
				{movies.length > 0 &&
					movies.map((item) => (
						<SwiperSlide key={item.id}>
							<BannerItem item={item}></BannerItem>
						</SwiperSlide>
					))}
			</Swiper>
		</section>
	)
}

function BannerItem({ item }) {
	const { title, vote_average, release_date, poster_path } = item

	return (
		<div className="w-full h-full rounded-lg relative">
			<div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
			<img
				src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
				alt="avenger"
				className="w-full h-full object-contain rounded-lg"
			/>
			<div className="absolute left-5 bottom-5 w-full text-white">
				<h2 className="font-bold text-3xl mb-3">{title}</h2>
				<div className="flex items-center gap-x-3 mb-8">
					<span className="py-2 px-4 border border-white rounded-md">Action</span>
					<span className="py-2 px-4 border border-white rounded-md">Adventure</span>
					<span className="py-2 px-4 border border-white rounded-md">Drama</span>
				</div>
				<button className="py-3 px-6 rounded-lg bg-primary text-white font-medium">
					Watch now
				</button>
			</div>
		</div>
	)
}

export default Banner
