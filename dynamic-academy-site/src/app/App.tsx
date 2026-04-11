import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ChatWidget } from "./components/ChatWidget";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ChatWidget />
    </>
  );
}
