/* eslint-disable flowtype/require-valid-file-annotation */
import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Loader } from "../Loader/loader";
import axios from "axios";
import { serverUrl } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { selectproducts } from "../../StoreRedux/productSlice";
import { Addproduct } from "../../StoreRedux/productSlice";
import { toast } from "react-toastify";
import { Sidebar } from "../Sidebar Pages/SideBar";
import { Addappointment, selectappointments } from "../../StoreRedux/appointmentSlice";
import { Addcareer,selectcareers } from "../../StoreRedux/careerSlice";


export const AdminLayout = () => {
  const [loader, setloader] = useState(true);
  const dispatch = useDispatch();
  const storeallcareer=useSelector(selectcareers);
  const storeAllProducts = useSelector(selectproducts);
  const storeallappointments=useSelector(selectappointments);
  console.log(storeallappointments);
  console.log(storeAllProducts);
  console.log(storeallcareer);

   ///////////////////////////////fetch total  products////////////////////////////////////////////
    useEffect(() => {
      const fetchappointments = async () => {
  
        try {
          const response = await axios.get(
            `${serverUrl}/api/appointment/get-all-appointment`
          );
          console.log(response);
          if (response && response.status === 200) {
            setloader(false);
            console.log(response.data.appointments);
            toast.success(response.data.message);
            dispatch(Addappointment(response.data.appointments));
            console.log("how are you");
          }
        } catch (error) {
          setloader(false);
          console.log(error);
          if (error.response) {
            toast.error("Failed to Fetch appointments");
          } else {
            toast.error("Failed to Fetch appointments");
            console.log("Failed to fetch appointments")
          }
        }
      };
  
      fetchappointments();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  

    useEffect(() => {
      const fetchcareers = async () => {
  
        try {
          const response = await axios.get(
            `${serverUrl}/api/career/get-all-career`
          );
          console.log(response);
          if (response && response.status === 200) {
            setloader(false);
            console.log(response.data.careers);
            toast.success(response.data.message);
            dispatch(Addcareer(response.data.careers));
            console.log("how are you");
          }
        } catch (error) {
          setloader(false);
          console.log(error);
          if (error.response) {
            toast.error("Failed to Fetch careers");
          } else {
            toast.error("Failed to Fetch careers");
            console.log("Failed to fetch careers")
          }
        }
      };
  
      fetchcareers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const fetchproducts = async () => {
  
        try {
          const response = await axios.get(
            `${serverUrl}/api/product/get-all-products`
          );
          console.log(response);
          if (response && response.status === 200) {
            setloader(false);
            console.log(response.data.products);
            toast.success(response.data.message);
            dispatch(Addproduct(response.data.products));
            console.log("how are you");
          }
        } catch (error) {
          setloader(false);
          console.log(error);
          // if (error.response) {
          //   toast.error("Failed to Fetch products");
          // } else {
          //   toast.error("Failed to Fetch products");
          //   console.log("Failed to fetch products")
          // }
        }
      };
  
      fetchproducts();
   // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <>
      <div className="antialiased bg-gray-50 dark:bg-white-600">
        <Sidebar />
        <main className="p-4 md:ml-64 h-auto pt-20">
          <Outlet />
        </main>
        <Loader loading={loader}></Loader>
      </div>
    </>
  );
};


