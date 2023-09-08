import { Route, Routes } from "react-router-dom";
import  CreateBook from "./pages/CreateBook";
import DeleteBook from "./pages/DeleteBook";
import Home from "./pages/Home";
import UpdateBook from "./pages/UpdateBook";
import ShowBook from "./pages/ShowBook";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/books/create" element={<CreateBook/>} />
        <Route path="/books/delete/:id" element={<DeleteBook/>} />
        <Route path="/books/update/:id" element={<UpdateBook/>} />
        <Route path="/books/details/:id" element={<ShowBook/>} />

      </Routes>
    </>
  );
}

export default App;
