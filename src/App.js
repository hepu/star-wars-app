import { Routes, Route } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import { ProtectedLayout } from "./components/ProtectedLayout";
import HomeLayout from "./components/HomeLayout";
import AuthLayout from "./components/AuthLayout";

import LoginPage from './pages/LoginPage';
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
          </Route>
          <Route path="*" element={<ErrorPage />}/>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
