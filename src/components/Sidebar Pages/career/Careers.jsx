import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectcareers } from '../../../StoreRedux/careerSlice';
import { Loader } from '../../Loader/loader';
import DeleteModal from '../../DeleteModal';
const Careers = () => {
    const [loading, setloading] = useState(false)
    const [delId, setdelId] = useState(null);
    const [showModal, setshowModal] = useState(false);
    const allcareer = useSelector(selectcareers);

    return (
        <div className='overflow-x-scroll'>
            <table className="min-w-full divide-y divide-gray-200  overflow-x-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 w-[150px] text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Applicent
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 w-[150px] text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Email
                        </th>

                        <th
                            scope="col"
                            className="px-6 py-3 w-[250px] text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Phone
                        </th>
                        <th
                            scope="col"
                            className="px-6 w-[250px] py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                        >
                            salary
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 w-[150px] text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Location
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 w-[150px] text-center text-md font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Job
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 w-[50px] text-center text-md font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Resume
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 w-[50px] text-center text-md font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Del
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {allcareer &&
                        allcareer.length > 0 &&
                        allcareer.map((use) => (
                            <tr key={use._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="ml-4">

                                            <div className="text-sm font-medium text-gray-900">
                                                {use.userName}
                                            </div>


                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900">
                                    {use.userEmail}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                                    {use.userContact}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                                    {use.expectedSalary}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                                    {use.location}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                                    {use.jobTitle}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link className='text-white border p-3 bg-blue-600' to={use.resumeURL} target="_blank">Open</Link>

                                </td>
                                <td className="px-6 py-4 whitespace-nowrap flex justify-center text-sm font-medium">

                                    <button
                                        onClick={() => {
                                            setshowModal(true);
                                            setdelId(use._id);
                                        }}
                                        className="ml-2 text-red-600 hover:text-red-900 text-2xl"
                                    >

                                        <i className="fa-solid fa-trash text-40"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <Loader loading={loading} />
            <DeleteModal
                setloading={setloading}
                showModal={showModal}
                setshowModal={setshowModal}
                delId={delId}
                whatdelete="career"
            />
        </div>
    );
}

export default Careers;

