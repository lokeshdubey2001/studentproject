import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LABEL_OPTIONS } from "../constants/headingOptions";
import CustomInput from "./customComponents/CustomInput";
import CustomButton from "./customComponents/CustomButton";
import { BASE_URL } from "../constants/urlOptions";

const EditStudents = () => {
  const navigate = useNavigate();
  const { studentid } = useParams();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    place: "",
    phone: ""
  });
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/${studentid}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.log(err.message));
  }, [studentid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = formData;

    fetch(`${BASE_URL}/${studentid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(studentData)
    })
      .then((res) => {
        if (res.ok) {
          alert("Data updated successfully");
          navigate("/"); 
        } else {
          throw new Error("Failed to update data");
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-4xl font-extrabold text-purple-500 mb-8 shadow-lg bg-opacity-70 bg-white p-4 rounded-lg">
        Edit Student Info
      </h2>
      <div className="w-full max-w-4xl bg-white bg-opacity-20 shadow-lg rounded-lg p-6">
        <div className="overflow-x-auto rounded-lg">
          <form className="min-w-full bg-gray-200 rounded-lg shadow-md p-4" onSubmit={handleSubmit}>
            {LABEL_OPTIONS.map((options) => (
              <div key={options.option}>
                <CustomInput
                  type={options.type}
                  label={options.option}
                  placeholder={options.placeholder}
                  name={options.name}
                  id={options.name}
                  required
                  value={formData[options.name]}
                  onChange={handleInputChange}
                  onMouseDown={() => setValidation(true)}
                />
                {formData[options.name].length === 0 && validation && (
                  <span
                    className={`text-sm text-red-500 -mt-2 transition-opacity duration-300 ease-in-out ${validation ? 'opacity-100' : 'opacity-0'
                      }`}
                  >
                    {`${options.option} field is required`}
                  </span>
                )}
              </div>
            ))}
            <div className="flex justify-end gap-2">
              <CustomButton
                className="w-full md:w-auto ring-1 ring-black bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-md shadow-md"
                label="Back"
                type="button"
                onClick={() => navigate(-1)}
              />
              <CustomButton
                type="submit"
                className="w-full md:w-auto bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md"
                label="Update"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudents;
