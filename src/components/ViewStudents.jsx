import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import CustomButton from "./customComponents/CustomButton";
import { BASE_URL } from "../constants/urlOptions";
const ViewStudents = () => {
  const navigate = useNavigate();
  const { studentid } = useParams();
  const [students, setStudents] = useState({});
  console.log(studentid);


  useEffect(() => {
    fetch(`${BASE_URL}/${studentid}`).then((res) => res.json()).then((data) => setStudents(data)).catch((err) => console.log(err.message)
    )
  },[])

  return (
    <div className="flex flex-col items-center p-6">
      {/* Title Section */}
      <h2 className="text-4xl font-extrabold text-purple-500 mb-8 shadow-lg bg-opacity-70 bg-white p-4 rounded-lg">
        Student Info
      </h2>
      <div className="w-full max-w-4xl bg-white bg-opacity-20 shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <CustomButton
            type="button"
            className="w-full md:w-auto bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md"
            label="Back"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="overflow-x-auto rounded-lg">
          <div className="min-w-full bg-gray-200 rounded-lg shadow-md p-4">
            {students && Object.entries(students).map(([key, value]) => (
              <div key={key} className=""><p className="px-4 py-2 my-2 bg-indigo-300 rounded-md"><span className="font-bold text-violet-500">{key.toUpperCase()}</span><span className="text-gray-600">: {value}</span></p></div>
            ))}
            <div className="flex justify-end gap-2">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewStudents