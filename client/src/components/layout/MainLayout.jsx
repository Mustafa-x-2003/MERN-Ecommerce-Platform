import NavBare from "../common/NavBare";
import { Outlet } from "react-router";
import Footer from "../common/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col">
      <NavBare />

      <main className="container mx-auto flex-1 min-h-screen  bg-background pt-18">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
