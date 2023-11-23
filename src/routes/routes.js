import { createBrowserRouter } from "react-router-dom";
import EditPage from "../pages/EditPage/EditPage";
import UploadPage from "../pages/UploadPage/UploadPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <UploadPage />,
  },
  {
    path: "/edit",
    element: <EditPage />,
  },
]);

export default routes;
