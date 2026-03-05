import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "./paths";
import FixturesPage from "../pages/FixturesPage";
import MatchPage from "../pages/MatchPage";
import NotFound from "../components/NotFound";
import UnderConstructionPage from "../components/UnderConstruction";

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <FixturesPage />,
  },
  {
    path: PATHS.MATCH,
    element: <MatchPage />,
  },
  { path: "/live", element: <UnderConstructionPage /> },
  { path: "/standings", element: <UnderConstructionPage /> },
  { path: "/teams", element: <UnderConstructionPage /> },
  { path: "/comparison", element: <UnderConstructionPage /> },
  { path: "/statistics", element: <UnderConstructionPage /> },
  { path: "/venues", element: <UnderConstructionPage /> },
  { path: "*", element: <NotFound /> },
]);
