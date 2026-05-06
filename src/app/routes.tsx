import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { TripPlanner } from "./pages/TripPlanner";
import { Places } from "./pages/Places";
import { FoodGuide } from "./pages/FoodGuide";
import { TravelInfo } from "./pages/TravelInfo";
import { MyItinerary } from "./pages/MyItinerary";
import { Housing } from "./pages/Housing";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/places",
    element: (
      <ProtectedRoute>
        <Places />
      </ProtectedRoute>
    ),
  },
  {
    path: "/food-guide",
    element: (
      <ProtectedRoute>
        <FoodGuide />
      </ProtectedRoute>
    ),
  },
  {
    path: "/trip-planner",
    element: (
      <ProtectedRoute>
        <TripPlanner />
      </ProtectedRoute>
    ),
  },
  {
    path: "/housing",
    element: (
      <ProtectedRoute>
        <Housing />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-itinerary",
    element: (
      <ProtectedRoute>
        <MyItinerary />
      </ProtectedRoute>
    ),
  },
  {
    path: "/travel-info",
    element: (
      <ProtectedRoute>
        <TravelInfo />
      </ProtectedRoute>
    ),
  },
]);
