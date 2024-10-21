import { useNavigate } from "react-router-dom";
import CustomButton from "./customComponents/CustomButton";
import CustomInput from "./customComponents/CustomInput";
import { LABEL_OPTIONS } from "../constants/headingOptions";
import { useState } from "react";
import { BASE_URL } from "../constants/urlOptions";

export default function CreateStudents() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    place: "",
    phone: ""
  });
  const [validation, setValidation] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = formData;
    console.log(studentData);

    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(studentData)
    }).then((res) => {
      alert("data uploaded successfully")
      navigate("/")
    }).catch((err) => console.log(err.message)
    )
  };
  return (
    <div className="flex flex-col items-center p-6">
      {/* Title Section */}
      <h2 className="text-4xl font-extrabold text-purple-500 mb-8 shadow-lg bg-opacity-70 bg-white p-4 rounded-lg">
        Add new Student
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
                label="Cancel"
                type="button"
                onClick={() => navigate(-1)}
              />
              <CustomButton
                type="submit"
                className="w-full md:w-auto bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md"
                label="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
