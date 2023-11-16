import "./App.css";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "@mui/material";
import { theme } from "./Theme";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";

const privateRoutes = [
  { path: "/home", component: () => <HomePage /> },
  { path: "/profile", component: () => <ProfilePage /> },
];

const publicRoutes = [{ path: "/login", component: () => <LoginPage /> }];

function App() {
  // const isSignedIn = checkIfLoggedIn();
  // const [isOnboarded, setIsOnboarded] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const init = async () => {
  //     const onboarded = await checkIfOnboarded();
  //     setIsOnboarded(onboarded);
  //     setIsLoading(false);
  //   };

  //   init();
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <HomePage />
      <Navbar />
    </ThemeProvider>
  );
}

export default App;
