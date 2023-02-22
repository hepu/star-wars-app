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
import PlanetsPage from './pages/PlanetsPage';
import PlanetPage from './pages/PlanetPage';
import EditPlanetPage from './pages/EditPlanetPage';
import NewPlanetPage from './pages/NewPlanetPage';
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
          </Route>
          <Route path="*" element={<ErrorPage />}/>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
