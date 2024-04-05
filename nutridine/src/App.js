import React, { useState, useEffect } from "react";
import "./App.css";
import TetrisLoader from "./screens/loading/TetrisLoader";
import MacroPage from "./screens/macro/MacroPage";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Signup from "./screens/authentication/Signup";
import Signin from "./screens/authentication/Signin";
import NutrientPreferences from "./screens/nutrientPreferences/NutrientPreferences";
import RegisterForm from "./screens/authentication/RegisterForm";
import ProfilePage from "./screens/authentication/ProfilePage";
import PasswordReset from "./screens/authentication/PasswordReset";
import Homepage from "./screens/Homepage";
import RestaurantsPage from "./screens/restaurants/RestaurantsPage";
import MealsPage from "./screens/restaurants/MealsPage";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, []);

  if (isLoading) {
    return <TetrisLoader />;
  }
  return (
    <Layout>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        } />

        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register-form" element={<RegisterForm />} />

        <Route path="/preferences-page" element={<NutrientPreferences />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/:brandId" element={<MealsPage />} />
        <Route path="/macro" element={<MacroPage />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />

        <Route path="/reset-password" element={<PasswordReset />} />

        <Route path="/restaurants" element={
          <ProtectedRoute>
            <div>Restaurants Page</div>
          </ProtectedRoute>
        } />

        <Route path="/macro" element={
          <ProtectedRoute>
            <MacroPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Layout>
  );
}

export default App;
