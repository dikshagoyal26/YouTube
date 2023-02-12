import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Head from "./components/Head";
import MainContainer from "./components/MainContainer";
import WatchContainer from "./components/WatchContainer";
import store from "./utils/store";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      { path: "/", element: <MainContainer /> },
      { path: "/watch", element: <WatchContainer /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <Head />
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
