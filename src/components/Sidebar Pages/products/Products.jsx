import React, { useState, useEffect } from 'react'
import { selectproducts } from '../../../StoreRedux/productSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { serverUrl } from '../../../config';
import { toast } from "react-toastify";
import { Loader } from '../../Loader/loader';
import { updateproducts } from '../../../StoreRedux/productSlice';
import { useDispatch } from 'react-redux';
import DeleteModal from '../../DeleteModal';
import axios from 'axios';
function Products() {
  const dispatch = useDispatch();
  const storeallproducts = useSelector(selectproducts);
  const [delId, setdelId] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState()
  useEffect(() => {
    setdata(storeallproducts);
  }, [storeallproducts]);
  const handleCheckboxChange = async (index, value, id) => {
    try {
      setloading(true);
      const response = await axios.put(`${serverUrl}/api/product/${id}/show-to-home`, {
        mainPage: !value
      });
      if (response && response.status === 200) {
        setloading(false);
        dispatch(updateproducts(response.data.updatedproduct))
        console.log(response.data.updatedproduct)
        toast.success(response.data.message);
        // setaddbook(doorinitial);
      }
    } catch (error) {
      setloading(false);
      console.error(error);
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }

  };
  return (
    <div>
      {
        data && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* CARD 1 */}
          {data.map((item, index) => (
            <div
              key={index}
              className="relative mb-8 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg"
            >
              <Link
                className="relative mx-3 mt-3 flex overflow-hidden rounded-xl"
                to={`/Admin/products/${item._id}/detail`}
              >
                <img className="h-[300px] w-[100%]" src={item.productImage1} alt="product" />
                <span className="absolute top-0 right-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                  {item.productName}
                </span>
              </Link>
              <div className="mt-4 px-5 pb-5">
                <a href="/">
                  <h5 className="text-md font-bold text-center tracking-tight text-slate-900">
                    {item.productName}
                  </h5>
                </a>
                <div className="mt-4 mb-5 flex items-center justify-between">
                  <div className="sm:col-span-1 flex">
                    <label htmlFor="add-in-home" className="mt-2 text-md leading-6 text-gray-900">
                      Add in Home
                    </label>
                    <div className="mt-2 mx-2">
                      <input
                        type="checkbox"

                        onChange={() => { handleCheckboxChange(index, item.mainPage, item._id) }}
                        name="addInHome"
                        checked={item.mainPage}
                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                    </div>
                  </div>

                </div>
                <hr />
                <div className="px-6 py-3 m-0 flex flex-row items-center justify-between bg-gray-100">
                  <span
                    href="/"
                    className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
                  >
                    {/* <img className="h-4 w-4" alt="sds" src={icon} /> */}
                    <span className="ml-1">{item.categoryType}</span>
                  </span>
                  <span
                    href="/"
                    className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
                  >
                    <span className="ml-1 border border-gray-300 hover:bg-gray-300 px-2">
                      ${item.price}
                    </span>
                    <button
                      className="ml-1 border py-0.5  text-black border-gray-300 hover:bg-gray-300 px-2.5"
                      onClick={() => {
                        setshowModal(true);
                        setdelId(item._id);
                      }}
                    >
                      <i className="fa-solid fa-trash text-red-600"></i>
                    </button>
                    <Link to={`/Admin/products/${item._id}/editProduct`}
                      className="ml-1 border py-0.5  text-black border-gray-300 hover:bg-gray-300 px-2.5  "
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      }
      <Loader loading={loading} />
      <DeleteModal
        setloading={setloading}
        showModal={showModal}
        setshowModal={setshowModal}
        delId={delId}
        whatdelete="product"
      />
    </div>
  )
}

export default Products
