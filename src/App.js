import { Fragment } from "react"
import { NavLink, Routes, Route } from "react-router-dom"

import "swiper/scss"
import MovieList from "./components/movie/MovieList"
import Banner from "./components/banner/Banner"
import Header from "./components/layout/Header"
import Main from "./components/layout/Main"
import HomePage from "./pages/HomePage"
import MoviesPage from "./pages/MoviesPage"
import MovieDetailsPage from "./pages/MovieDetailsPage"

function App() {
	return (
		<Fragment>
			<Routes>
				<Route element={<Main></Main>}>
					<Route
						path="/"
						element={
							<>
								<Banner></Banner>
								<HomePage></HomePage>
							</>
						}
					></Route>
					<Route
						path="/movies"
						element={<MoviesPage></MoviesPage>}
					></Route>
					<Route
						path="/movies/:movieId"
						element={<MovieDetailsPage></MovieDetailsPage>}
					></Route>
				</Route>
			</Routes>
		</Fragment>
	)
}

export default App
