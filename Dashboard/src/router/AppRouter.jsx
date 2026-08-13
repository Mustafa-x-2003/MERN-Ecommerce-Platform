import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../Features/home/pages/Home";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
