import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectproducts } from "../../StoreRedux/productSlice";
import { selectappointments } from "../../StoreRedux/appointmentSlice";
// import GraphComponent from "../Graphcomponent";
const Statistics = () => {

  const storeallproducts = useSelector(selectproducts);
  const storeallappointments = useSelector(selectappointments)

  const [mobileapp, setmobileapp] = useState(0)
  const [webapp, setwebapp] = useState(0)

  const [appending, setappending] = useState(0)
  const [processing, setprocessing] = useState(0)
  const [completed, setcompleted] = useState(0)

  useEffect(() => {
    const apro = storeallappointments.filter((obj) => obj.projectStatus === "");
    setappending(apro.length);

  }, [storeallappointments]);

  useEffect(() => {
    const apro = storeallappointments.filter((obj) => obj.projectStatus === "processing");
    setprocessing(apro.length);

  }, [storeallappointments]);

  useEffect(() => {
    const apro = storeallappointments.filter((obj) => obj.projectStatus === "completed");
    setcompleted(apro.length);

  }, [storeallappointments]);

  useEffect(() => {
    const apro = storeallproducts.filter((obj) => obj.projectType === "Web App");
    setwebapp(apro.length);

  }, [storeallproducts]);

  useEffect(() => {
    const apro = storeallproducts.filter((obj) => obj.projectType === "Mobile App");
    setmobileapp(apro.length);

  }, [storeallproducts]);

  return (
    <div>
      <h2 className="text-3xl font-bold mt-8 text-gray-900 sm:text-4xl">
        Statistics
      </h2>

      <h1 className="text-lg font-bold font-serif">Products</h1>

      <div className="w-full mt-10  grid grid-cols-2 gap-3 px-6 ">
        {storeallproducts &&
          <div className="flex col-span-2 items-center  px-5  py-6 shadow-lg rounded-md bg-slate-300">

            <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
              <img className="h-8 w-8 text-white" src="/post1.png" alt="" />
            </div>

            <div className="mx-5">
              <h4 className="text-2xl font-semibold text-gray-700">
                {storeallproducts ? storeallproducts.length : "0"}
              </h4>
              <div className="text-gray-500">Toatal Products</div>
            </div>
          </div>}

        {storeallproducts &&
          <div className="flex my-4 items-center col-span-2 sm:col-span-1 px-5 py-6 shadow-lg rounded-md bg-slate-300">
            <div className="p-3 rounded-full bg-green-600 bg-opacity-75">

              <img className="h-8 w-8 text-white" src="/webapp.png" alt="" />
            </div>

            <div className="mx-5">
              <h4 className="text-2xl font-semibold text-gray-700">
                {webapp}
              </h4>
              <div className="text-gray-500">Web App products</div>
            </div>
          </div>}


        <div className="flex my-4 items-center  col-span-2 sm:col-span-1 px-5 py-6 shadow-lg rounded-md bg-slate-300">
          <div className="p-3 rounded-full bg-green-600 bg-opacity-75">
            <img className="h-10 w-10 text-white" src="/mobileapp.png" alt="" />

          </div>

          <div className="mx-5">
            <h4 className="text-2xl font-semibold text-gray-700">
              {mobileapp}
            </h4>
            <div className="text-gray-500">Mobile App products</div>
          </div>
        </div>
      </div>

      <h1 className="text-lg mt-5 font-bold font-serif">Appointments</h1>

      <div className="w-full mt-5  grid grid-cols-3 gap-3 px-6 ">
        {storeallappointments &&
          <div className="flex my-4 items-center col-span-3 lg:col-span-1 px-5 py-6 shadow-lg rounded-md bg-slate-300">

            <div className="p-3 rounded-full bg-red-600 bg-opacity-75">
              <img className="h-8 w-8 text-white" src="/appointment.png" alt="" />
            </div>

            <div className="mx-5">
              <h4 className="text-2xl font-semibold text-gray-700">
                {appending?appending: "0"}
              </h4>
              <div className="text-gray-500">Appending</div>
            </div>
          </div>}

        {storeallappointments &&
          <div className="flex my-4 items-center col-span-3  lg:col-span-1 px-5 py-6 shadow-lg rounded-md bg-slate-300">
            <div className="p-3 rounded-full bg-green-600 bg-opacity-75">

              <img className="h-8 w-8 text-white" src="/appointment.png" alt="" />
            </div>

            <div className="mx-5">
              <h4 className="text-2xl font-semibold text-gray-700">
                {processing}
              </h4>
              <div className="text-gray-500">Processing</div>
            </div>
          </div>}


        <div className="flex my-4 items-center col-span-3  lg:col-span-1 px-5 py-6 shadow-lg rounded-md bg-slate-300">
          <div className="p-3 rounded-full bg-blue-600 bg-opacity-75">
            <img className="h-8 w-8 text-white" src="/appointment.png" alt="" />
          </div>

          <div className="mx-5">
            <h4 className="text-2xl font-semibold text-gray-700">
              {completed}
            </h4>
            <div className="text-gray-500">Completed</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Statistics;
