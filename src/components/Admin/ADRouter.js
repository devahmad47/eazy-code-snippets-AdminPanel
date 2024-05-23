import { Navigate } from "react-router-dom";
import { AdminLayout } from "./FullLayoutAdmin";
import Statistics from "../Sidebar Pages/Statistics";
import { PrivateRouteAdmin } from "./PrivateRouteAdmin";
import Addproduct from "../Sidebar Pages/products/Addproduct";
import Products from "../Sidebar Pages/products/Products";
import Productdetail from "../Sidebar Pages/products/Productdetail";
import EditProduct from "../Sidebar Pages/products/EditProduct";
import Appointments from "../Sidebar Pages/appointment/Appointments";
import AppointmentDetail from "../Sidebar Pages/appointment/AppointmentDetail";
import Careerdetails from "../Sidebar Pages/career/Careerdetails";
import Careers from "../Sidebar Pages/career/Careers";
export const ThemeRoutes = [
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: "/", element: <Navigate to="starter" /> },
      { path: "starter", exact: true, element: <PrivateRouteAdmin element={<Statistics />} /> },
      { path: "products", exact: true, element: <PrivateRouteAdmin element={<Products/>} /> },
      { path: "products/:productId/detail", exact: true, element: <PrivateRouteAdmin element={<Productdetail/>} /> },
      { path: "products/:productId/editProduct", exact: true, element: <PrivateRouteAdmin element={<EditProduct/>} /> },
      { path: "addproduct", exact: true, element: <PrivateRouteAdmin element={<Addproduct />} /> },
      { path: "appointments", exact: true, element: <PrivateRouteAdmin element={<Appointments/>} /> },
      { path: "appointments/:appointmentId/detail", exact: true, element: <PrivateRouteAdmin element={<AppointmentDetail/>} /> },
      { path: "careers", exact: true, element: <PrivateRouteAdmin element={<Careers/>} /> },
      { path: "careers/:careerId/detail", exact: true, element: <PrivateRouteAdmin element={<Careerdetails/>} /> },
    ],
  },
];


