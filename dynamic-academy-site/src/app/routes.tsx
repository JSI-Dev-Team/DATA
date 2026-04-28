import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Classes } from "./pages/Classes";
import { Competitive } from "./pages/Competitive";
import { ParentPortal } from "./pages/ParentPortal";
import { Contact } from "./pages/Contact";
import { Faq } from "./pages/Faq";
import { Programs } from "./pages/Programs";
import { Schedule } from "./pages/Schedule";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "classes", Component: Classes },
      { path: "competitive", Component: Competitive },
      { path: "portal", Component: ParentPortal },
      { path: "faq", Component: Faq },
      { path: "programs", Component: Programs },
      { path: "schedule", Component: Schedule },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
