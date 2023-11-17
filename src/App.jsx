import "./App.css";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "@mui/material";
import { theme } from "./Theme";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import LoadingContainer from "./components/LoadingContainer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  checkIfLoggedIn,
  isOnboarded as checkIfOnboarded,
} from "./utility/firebase";
import dummyUserPhoto from "./assets/nier.jpg";

const privateRoutes = [
  { path: "/home", component: () => <HomePage /> },
  {
    path: "/profile",
    component: () => <ProfilePage />,
  }, // todo: change params
];

const publicRoutes = [{ path: "/login", component: () => <LoginPage /> }];

function App() {
  const isSignedIn = checkIfLoggedIn();
  const [isOnboarded, setIsOnboarded] = useState(true); // useState(false);
  const [isLoading, setIsLoading] = useState(false); // useState(true);

  // useEffect(() => {
  //   const init = async () => {
  //     const onboarded = await checkIfOnboarded();
  //     setIsOnboarded(onboarded);
  //     setIsLoading(false);
  //   };

  //   init();
  // }, []);

  return (
    <LoadingContainer isLoading={isLoading}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {isSignedIn && !isOnboarded && <Navigate to="/onboarding" />}
          <Routes>
            <Route
              path="*"
              element={
                isSignedIn ? (
                  <Navigate to="/onboarding" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/"
              element={
                isSignedIn ? (
                  <Navigate to="/onboarding" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/onboarding"
              element={
                isSignedIn ? (
                  isOnboarded ? (
                    <Navigate to="/home" />
                  ) : (
                    <OnboardingPage />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {publicRoutes.map((route) => (
              <Route
                path={route.path}
                key={route.path}
                element={
                  isSignedIn ? (
                    <Navigate to="/onboarding" />
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
            {privateRoutes.map((route) => (
              <Route
                path={route.path}
                key={route.path}
                element={
                  isSignedIn ? <route.component /> : <Navigate to="/login" />
                }
              />
            ))}
          </Routes>
          {isSignedIn && isOnboarded && <Navbar />}
        </BrowserRouter>
      </ThemeProvider>
    </LoadingContainer>
  );
}

export default App;
