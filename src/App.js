import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import { Toaster } from "react-hot-toast";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  return (
    <div>
      <Toaster position="bottom-center" reverseOrder={false} />
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
