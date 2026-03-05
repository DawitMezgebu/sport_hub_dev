import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "animate.css";

function App() {
  return (
    <div className=" w-full bg-[#0F172A] text-white">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
