import { Routes, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { ProtectedLayout } from "./components/ProtectedLayout";
import HomeLayout from "./components/HomeLayout";
import AuthLayout from "./components/AuthLayout";

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PlanetsPage from './pages/PlanetsPage';

import ErrorPage from "./error-page";

import './App.css';

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path='/app' element={<ProtectedLayout />}>
          <Route path="/app/planets" element={<PlanetsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
