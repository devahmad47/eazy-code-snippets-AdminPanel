import React from 'react';
import { useParams,Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { selectappointments } from '../../../StoreRedux/appointmentSlice';
import { useSelector } from 'react-redux';
function AppointmentDetail() {
    const alldata=useSelector(selectappointments);
    const {appointmentId}=useParams();
    const [single, setSingledata] = useState()
    useEffect(() => {
        const data = alldata.find(pro => pro._id === appointmentId)
        setSingledata(data);
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alldata]);
  return (
    <div>
    <div className="bg-white">

        {
            single ? <div>

                <div className='flex px-6 items-center justify-between w-full '>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Appointment Details</h2>

                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4  sm:px-6 p-4 lg:max-w-7xl lg:px-8">
                    <div >
                    {
                                    single.otherInfo &&
                                    <p className="mt-4 text-gray-500">
                                        {
                                            single.otherInfo
                                        }
                                    </p>
                                }

                        <dl className="my-4 grid grid-cols-1 sm:grid-cols-2  gap-x-2 gap-y-4 sm:gap-y-10 lg:gap-x-4">

                            <div className="border-t col-span-2 sm:col-span-1   border-gray-200 py-2 ">
                                <dt className="font-medium text-gray-900">Client Name</dt>
                                <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                                    {single.userName}

                                </dd>
                            </div>
                            
                            <div className="border-t  col-span-2 sm:col-span-1   border-gray-200 py-2 ">
                                <dt className="font-medium text-gray-900">Email</dt>
                                <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                                    {single.userEmail}

                                </dd>
                            </div>
                            
                            <div className="border-t col-span-2 sm:col-span-1   border-gray-200 py-2 ">
                                <dt className="font-medium text-gray-900">Phone no</dt>
                                <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                                    {single.userContact}

                                </dd>
                            </div>
                            
                            <div className="border-t col-span-2 sm:col-span-1  border-gray-200 py-2 ">
                                <dt className="font-medium text-gray-900">Estimated Budget</dt>
                                <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                                    {single.estimatedBudget}$

                                </dd>
                            </div>

                            <div className="border-t col-span-2 sm:col-span-1  border-gray-200 py-2 ">
                                <dt className="font-medium text-gray-900">Completion Date</dt>
                                <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                                    {new Date(single.completionDate).toLocaleString()}
                                   
                                </dd>
                            </div>
                            <div className="border-t col-span-2 sm:col-span-1   border-gray-200 py-2 ">
                                <dt className="font-medium text-gray-900">Application Type</dt>
                                <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                                    {single.applicationType}
                                   
                                </dd>
                            </div>
                            


                            <div className="border-t col-span-1   border-gray-200 py-2 ">
                                <dt className="font-medium text-gray-900">Reference Link</dt>
                                <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                                    <a className='text-blue-600' href={single.referenceLink}>{single.referenceLink}</a>

                                </dd>
                            </div>
                            <div className="border-t col-span-1   border-gray-200 py-2 ">
                                <dt className="font-medium text-gray-900">Project FileUrl</dt>
                                <dd className="py-2 text-sm flex items-center justify-center gap-2 text-gray-500">
                                    <Link className='text-white border p-3 bg-blue-600'  to={single.projectFileUrl} target="_blank">Open project file</Link>
                                </dd>
                            </div>
                         {single.projectId && <div className="border-t col-span-1   border-gray-200 py-2 ">
                                <dt className="font-medium text-gray-900">Appointment Project</dt>
                                <dd className="py-2 text-sm flex items-center justify-center gap-2 text-gray-500">
                                    <Link className='text-white border p-3 bg-blue-600'  to={`/Admin/products/${single.projectId}/detail`}>Open project</Link>
                                </dd>
                            </div>}

                        </dl>
                    </div>
                </div>
            </div> :
                <div>
                    <p>
                        No Appointment found
                    </p>
                </div>

        }

    </div >
</div>
  )
}

export default AppointmentDetail;
