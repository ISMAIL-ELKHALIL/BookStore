import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import Delete from "./pages/DeleteBook";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/details" element={<ShowBook />} />
      <Route path="/books/edit" element={<EditBook />} />
      <Route path="/books/delete" element={<Delete />} />
    </Routes>
  );
};

export default App;
 