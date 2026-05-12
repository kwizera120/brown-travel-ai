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
    Component: Places,
  },
  {
    path: "/food-guide",
    Component: FoodGuide,
  },
  {
    path: "/trip-planner",
    Component: TripPlanner,
  },
  {
    path: "/housing",
    Component: Housing,
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
    Component: TravelInfo,
  },
]);
