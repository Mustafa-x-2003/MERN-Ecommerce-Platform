import AppRouter from "../router/AppRouter";
import Providers from "./providers";

export default function App() {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}
