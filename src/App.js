import { Fragment } from "react"
import { NavLink } from "react-router-dom"

import "swiper/scss"
import MovieList from "./components/movie/MovieList"

function App() {
	return (
		<Fragment>
			<header className="header flex items-center justify-center gap-x-5 text-white py-10 mb-5">
				<span className="text-primary">Home</span>
				<span>Movies</span>
			</header>
			<section className="banner h-[500px] page-container mb-20">
				<div className="w-full h-full rounded-lg relative">
					<div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
					<img
						src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/July2022/biet-doi-avenger_(1).jpg"
						alt="avenger"
						className="w-full h-full object-cover rounded-lg"
					/>
					<div className="absolute left-5 bottom-5 w-full text-white">
						<h2 className="font-bold text-3xl mb-3">Avengers: Endgame</h2>
						<div className="flex items-center gap-x-3 mb-8">
							<span className="py-2 px-4 border border-white rounded-md">Action</span>
							<span className="py-2 px-4 border border-white rounded-md">
								Adventure
							</span>
							<span className="py-2 px-4 border border-white rounded-md">Drama</span>
						</div>
						<button className="py-3 px-6 rounded-lg bg-primary text-white font-medium">
							Watch now
						</button>
					</div>
				</div>
			</section>
			<section className="movies-layout page-container pb-20">
				<h2 className="capitalize text-white mb-10 text-3xl font-bold">Now playing</h2>
				<MovieList></MovieList>
			</section>
			<section className="movies-layout page-container pb-20">
				<h2 className="capitalize text-white mb-10 text-3xl font-bold">Top rated</h2>
				<MovieList type="top_rated"></MovieList>
			</section>
			<section className="movies-layout page-container pb-20">
				<h2 className="capitalize text-white mb-10 text-3xl font-bold">Trending</h2>
				<MovieList type="popular"></MovieList>
			</section>
		</Fragment>
	)
}

export default App
