import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentsTable from "./components/StudentsTable";
import CreateStudents from "./components/CreateStudents";
import EditStudents from "./components/EditStudents";
import ViewStudents from "./components/ViewStudents";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentsTable/>}></Route>
        <Route path="/student/create" element={<CreateStudents/>}></Route>
        <Route path="/student/edit/:studentid" element={<EditStudents/>}></Route>
        <Route path="/student/view/:studentid" element={<ViewStudents/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}