import React, { useState, useEffect } from 'react';
import CustomButton from './customComponents/CustomButton';
import { BTN } from '../constants/BtnName';
import { HEADING_OPTIONS } from '../constants/headingOptions';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/urlOptions';


const StudentsTable = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState();
    useEffect(() => {
        fetch(BASE_URL).then((res) => res.json()).then((data) => {
            setStudents(data);
        }).catch((error) => {
            console.log(error.message);
        })
    }, [])

    const handleClick = (id, mode) => {

        if (mode === "delete") {
            if (window.confirm("Are you sure want to delete")) {

                fetch(`${BASE_URL}/${id}`, {
                    method: "DELETE"
                })
                    .then((res) => {
                        if (res.ok) {
                            setStudents((prev) => prev.filter((student) => student.id !== id))
                            alert("Data deleted successfully");
                            navigate("/");
                        } else {
                            throw new Error("Failed to update data");
                        }
                    })
                    .catch((err) => console.log(err.message));
            }

        }
        else {
            navigate(`/student/${mode}/` + id)

        }

    }

    return (
        <div className="flex flex-col items-center p-6">
            {/* Title Section */}
            <h2 className="text-4xl font-extrabold text-purple-500 mb-8 shadow-lg bg-opacity-70 bg-white p-4 rounded-lg">
                Student Details
            </h2>
            {/* Main Content Section */}
            <div className="w-full max-w-4xl bg-white bg-opacity-20 shadow-lg rounded-lg p-6">
                {/* Button */}
                <div className="mb-6">
                    <CustomButton
                        className="w-full md:w-auto bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md"
                        label="Add New Student"
                        type='button'
                        onClick={() => navigate('/student/create')}
                    />
                </div>
                {/* Table Section */}
                <div className="overflow-x-auto rounded-lg">
                    <table className="min-w-full bg-gray-200 rounded-lg shadow-md">
                        <thead className="bg-indigo-600 text-white">
                            <tr>
                                {HEADING_OPTIONS.map((heading) => (
                                    <th key={heading.option} className='py-3 px-3'>
                                        {heading.option}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {students && students.map((student, index) => {
                                const serialNumber = {
                                    ...student,
                                    id: index + 1
                                }
                                return (
                                    <tr key={student.id} className="border-b border-gray-400 hover:bg-indigo-100 transition duration-200 ease-in-out">
                                        <td className='py-4 px-3 text-center'>
                                            {serialNumber.id}
                                        </td>
                                        {Object.entries(student).map(([key, value]) => {
                                            if (key === 'id') return null;
                                            return (
                                                <td key={key} className='py-4 px-3 text-center'>
                                                    {value}
                                                </td>
                                            )

                                        })}
                                        <td>
                                            <div className="flex space-x-2 justify-center">
                                                {BTN.map((button) => (
                                                    <CustomButton
                                                        key={button.name}
                                                        type='button'
                                                        label={button.name}
                                                        onClick={() => handleClick(student.id, button.mode)
                                                        }
                                                        className={`px-4 py-2 rounded-md ${button.isView
                                                            ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                                            : button.isEdit
                                                                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                                                : button.isDelete
                                                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                                                    : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                )

                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentsTable;
