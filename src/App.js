import { Routes, Route } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import { ProtectedLayout } from "./components/ProtectedLayout";
import HomeLayout from "./components/HomeLayout";
import AuthLayout from "./components/AuthLayout";

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';

import PlanetsPage from './pages/planets/IndexPage';
import PlanetPage from './pages/planets/ShowPage';
import EditPlanetPage from './pages/planets/EditPage';
import NewPlanetPage from './pages/planets/NewPage';

import PeoplePage from './pages/people/IndexPage';
import PersonPage from './pages/people/ShowPage';
import EditPersonPage from './pages/people/EditPage';
import NewPersonPage from './pages/people/NewPage';

import FilmsPage from './pages/films/IndexPage';
import FilmPage from './pages/films/ShowPage';
import EditFilmPage from './pages/films/EditPage';
import NewFilmPage from './pages/films/NewPage';

import FilmPlanetsPage from './pages/film_planets/IndexPage';
import FilmPlanetPage from './pages/film_planets/ShowPage';
import EditFilmPlanetPage from './pages/film_planets/EditPage';
import NewFilmPlanetPage from './pages/film_planets/NewPage';

import FilmPeoplePage from './pages/film_people/IndexPage';
import FilmPersonPage from './pages/film_people/ShowPage';
import EditFilmPersonPage from './pages/film_people/EditPage';
import NewFilmPersonPage from './pages/film_people/NewPage';

import ErrorPage from "./pages/ErrorPage";

import './App.css';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route path='/app' element={<ProtectedLayout />}>
            <Route path="/app" element={<DashboardPage />} />

            <Route path="/app/planets" element={<PlanetsPage />} />
            <Route path="/app/planets/new" element={<NewPlanetPage />} />
            <Route path="/app/planets/:id" element={<PlanetPage />} />
            <Route path="/app/planets/:id/edit" element={<EditPlanetPage />} />

            <Route path="/app/people" element={<PeoplePage />} />
            <Route path="/app/people/new" element={<NewPersonPage />} />
            <Route path="/app/people/:id" element={<PersonPage />} />
            <Route path="/app/people/:id/edit" element={<EditPersonPage />} />

            <Route path="/app/films" element={<FilmsPage />} />
            <Route path="/app/films/new" element={<NewFilmPage />} />
            <Route path="/app/films/:id" element={<FilmPage />} />
            <Route path="/app/films/:id/edit" element={<EditFilmPage />} />

            <Route path="/app/film_planets" element={<FilmPlanetsPage />} />
            <Route path="/app/film_planets/new" element={<NewFilmPlanetPage />} />
            <Route path="/app/film_planets/:id" element={<FilmPlanetPage />} />
            <Route path="/app/film_planets/:id/edit" element={<EditFilmPlanetPage />} />

            <Route path="/app/film_people" element={<FilmPeoplePage />} />
            <Route path="/app/film_people/new" element={<NewFilmPersonPage />} />
            <Route path="/app/film_people/:id" element={<FilmPersonPage />} />
            <Route path="/app/film_people/:id/edit" element={<EditFilmPersonPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />}/>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
