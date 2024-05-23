import React from 'react';
import { useState } from 'react';
import { selectappointments } from '../../../StoreRedux/appointmentSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../../../config';
import { useDispatch } from 'react-redux';
import { updateappointments } from '../../../StoreRedux/appointmentSlice';
import { toast } from 'react-toastify';
import { Loader } from '../../Loader/loader';
import DeleteModal from '../../DeleteModal';
const Appointments = () => {
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false)
    const [delId, setdelId] = useState(null);
    const [showModal, setshowModal] = useState(false);
    const handleChange = async (value, id) => {
        try {
            setloading(true);
            const response = await axios.put(`${serverUrl}/api/appointment/${id}/update-status`, {
                projectStatus: value
            });
            if (response && response.status === 200) {
                setloading(false);
                dispatch(updateappointments(response.data.updatedAppointment))
                console.log(response.data.updatedAppointment)
                toast.success(response.data.message);
            }
        } catch (error) {
            setloading(false);
            console.error(error);
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }
    };
    const allappointment = useSelector(selectappointments);

    return (
        <div className='overflow-x-scroll'>
            <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 w-[250px] text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Client Name
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
                            Update Status
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 w-[150px] text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Status
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 w-[150px] text-center text-md font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {allappointment &&
                        allappointment.length > 0 &&
                        allappointment.map((use) => (
                            <tr key={use._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <Link
                                                to={`/Admin/appointments/${use._id}/detail`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                <div className="text-sm font-medium text-gray-900">
                                                    {use.userName}
                                                </div>
                                            </Link>
                                            {/* Additional user information can be added here */}
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
                                    <select
                                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"

                                        onChange={(e) => { handleChange(e.target.value, use._id) }}
                                    >
                                        <option selected={use.projectStatus === "" ? true : false} value="">Appending</option>
                                        <option selected={use.projectStatus === "processing" ? true : false} value="processing">Processing</option>
                                        <option selected={use.projectStatus === "completed" ? true : false} value="completed">Completed</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {use.projectStatus === "" ? (
                                        <span className="px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-green-900">
                                            Appending
                                        </span>
                                    ) : (
                                        <span className={`px-4 inline-flex text-xs leading-5 font-semibold rounded-full ${use.projectStatus==="completed"?"bg-blue-200 text-green-900 ":"bg-green-200 text-green-900"}`}>
                                            {use.projectStatus}
                                        </span>
                                    )}
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
                whatdelete="appointment"
            />
        </div>
    );
}

export default Appointments;
