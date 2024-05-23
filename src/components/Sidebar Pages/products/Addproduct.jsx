import React, { useState } from "react";
import imageCompression from 'browser-image-compression';
import axios from "axios";
import { serverUrl } from "../../../config";
import { Loader } from "../../Loader/loader";
import { useDispatch } from "react-redux";
// import { AddNewbook } from "../../../StoreRedux/bookSlice";
import { toast } from "react-toastify";
import { AddNewproduct } from "../../../StoreRedux/productSlice";
// import { PDFDocument } from 'pdf-lib';
const Addproduct = () => {  

   
    const cloudName = 'da6yuh11g'; 
    const uploadPreset = 'g6k9owtj'; 

    const handleImageSelect = async (filename) => {
        const file = filename;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        formData.append('folder', 'product');
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData); // Changed the URL endpoint for image uploads
                console.log("upload")
             return response.data.secure_url
        } catch (error) {
            console.error('Error uploading image:', error);
            return "";
        }
    };
    const dispatch = useDispatch()
    const doorinitial = {
        productName: "", productDescription: "", price: "", categoryType: "", projectType: "", projectUrl: "", codeUrl: "", Image1: null, Image2:null, Image3: null, Image4: null, Image5: null, addInHome: false
    }
    const [addbook, setaddbook] = useState(doorinitial);
    const Doorerror = {
        productName: "", productDescription: "", price: "", categoryType: "", projectType: "", projectUrl: "", codeUrl: "",Image1: null, Image2:null, Image3: null, Image4: null, Image5: null, addInHome: false
    }
    const [error, setError] = useState(Doorerror);
    const [loading, setloading] = useState(false);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        if (value.trim() === "") {
            setError((prevError) => ({ ...prevError, [name]: `Required` }));
        } else {
            setError((prevError) => ({ ...prevError, [name]: "" }));
        }

        setaddbook((prev) => ({ ...prev, [name]: value }))
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setaddbook({ ...addbook, [name]: checked });
    };
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        let image1;
        let image2;
        let image3;
        let image4;
        let image5;
        try {
        if(addbook.Image1){  
            const compressedFile1 = await imageCompression(addbook.Image1, options);
             image1 = await handleImageSelect(compressedFile1);
        }
        if(addbook.Image2){
            const compressedFile1 = await imageCompression(addbook.Image2, options);
            image2 = await handleImageSelect(compressedFile1);
        }
        if(addbook.Image3){
            
            const compressedFile1 = await imageCompression(addbook.Image3, options);
            image3 = await handleImageSelect(compressedFile1);
        }
        if(addbook.Image4){
            
            const compressedFile1 = await imageCompression(addbook.Image4, options);
            image4 = await handleImageSelect(compressedFile1);
        }
        if(addbook.Image5){
            
            const compressedFile1 = await imageCompression(addbook.Image5, options);
            image5 = await handleImageSelect(compressedFile1);
        }

            
            const response = await axios.post(`${serverUrl}/api/product/add-product`, {
                productImage1:image1,
                productImage2:image2,
                productImage3:image3,
                productImage4:image4,
                productImage5:image5,
                productName:addbook.productName,
                productDescription:addbook.productDescription,
                price:addbook.price,
                codeUrl:addbook.codeUrl,
                projectUrl:addbook.projectUrl,
                categoryType:addbook.categoryType,
                projectType:addbook.projectType,
                mainPage:addbook.addInHome
            })
            if (response && response.status === 200) {
                setloading(false);
                dispatch(AddNewproduct(response.data.newProduct))
                console.log(response.data.newProduct)
                toast.success(response.data.message);
                setaddbook(doorinitial);
            }
            setloading(false);
        } catch (error) {
            setloading(false);
            console.error(error);
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }
    }
    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className="space-y-12">
                    <div>
                        <h2 className="text-3xl mt-4 font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Add Products
                        </h2>

                        <div className="my-4 grid grid-cols-3 gap-x-6 gap-y-2 ">
                            <div className="col-span-3 sm:col-span-1">
                                <label htmlFor="app-type" className="block text-md font-medium leading-6 text-gray-900">
                                    Project Type
                                </label>
                                <div className="mt-2">
                                    <select
                                        onChange={handleChangeInput}
                                        required
                                        name="projectType"
                                        value={addbook.projectType}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="">Select App Type</option>
                                        <option value="Mobile App">Mobile App</option>
                                        <option value="Web App">Web App</option>
                                    </select>
                                    {error.projectType && <p className="text-red-700 text-sm font-normal">{error.projectType}</p>}
                                </div>
                            </div>

                            <div className=" col-span-3 sm:col-span-1">
                                <label htmlFor="project-category" className="block text-md font-medium leading-6 text-gray-900">
                                    Project Category
                                </label>
                                <div className="mt-2">
                                    <select
                                        onChange={handleChangeInput}
                                        required
                                        name="categoryType"
                                        value={addbook.categoryType}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="">Select Project Category</option>
                                        <option value="Web Application">Web Application</option>
                                        <option value="Mobile Application">Mobile Application</option>
                                        <option value="Utility Tools">Utility Tools</option>
                                        <option value="Enterprise Solutions">Enterprise Solutions</option>
                                    </select>
                                    {error.categoryType && <p className="text-red-700 text-sm font-normal">{error.categoryType}</p>}
                                </div>
                            </div>



                            <div className="col-span-3 sm:col-span-1">
                                <label htmlFor="first-name" className="block text-md font-medium leading-6 text-gray-900">
                                    Product name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChangeInput}
                                        required
                                        type="text"
                                        name="productName"
                                        value={addbook.productName}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {error.productName && <p className="text-red-700 text-sm font-normal">{error.productName}</p>}
                                </div>
                            </div>
                            <div className="col-span-3 sm:col-span-1">
                                <label htmlFor="numberRange" className="block text-md font-medium leading-6 text-gray-900">
                                    Product price
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={addbook.price}
                                        name="price"
                                        onChange={handleChangeInput}
                                        type="number"
                                        placeholder="0"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {error.Bookprice && <p className="text-red-700 text-sm font-normal">{error.Bookprice}</p>}
                                </div>
                            </div>

                            <div className="col-span-3 sm:col-span-1">
                                <label htmlFor="first-name" className="block text-md font-medium leading-6 text-gray-900">
                                    Product Url
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChangeInput}
                                        required
                                        type="text"
                                        name="projectUrl"
                                        value={addbook.projectUrl}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {error.projectUrl && <p className="text-red-700 text-sm font-normal">{error.projectUrl}</p>}
                                </div>
                            </div>
                            <div className="col-span-3 sm:col-span-1">
                                <label htmlFor="first-name" className="block text-md font-medium leading-6 text-gray-900">
                                    Code Url
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChangeInput}
                                        required
                                        type="text"
                                        name="codeUrl"
                                        value={addbook.codeUrl}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {error.codeUrl && <p className="text-red-700 text-sm font-normal">{error.codeUrl}</p>}
                                </div>
                            </div>

                            <div className="col-span-3">
                                <label htmlFor="street-address" className="block text-md font-medium leading-6 text-gray-900">
                                    Product Description
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={addbook.productDescription}
                                        name="productDescription"
                                        onChange={handleChangeInput}
                                        className="block w-full border-0 rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {error.productDescription && <p className="text-red-700 text-sm font-normal">{error.productDescription}</p>}
                                </div>
                            </div>
                            <div className="sm:col-span-1 flex">
                                <label htmlFor="add-in-home" className="mt-2 text-md font-medium leading-6 text-gray-900">
                                    Add in Home
                                </label>
                                <div className="mt-2 mx-2">
                                    <input
                                        type="checkbox"

                                        onChange={handleCheckboxChange}
                                        name="addInHome"
                                        checked={addbook.addInHome}
                                        className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>


                        <div className="max-w-5xl mx-auto my-1">
                            <div className="border-l-2 border-gray-500 pl-8">
                                <div className="flex flex-col md:flex-row md:justify-between">
                                    <div className="mb-4 md:mb-0">
                                        <h3 className="text-xl font-bold mb-2">Image 1 <span className="text-red-500">*</span></h3>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"

                                        onChange={(e) => setaddbook((prev) => ({ ...prev, Image1: e.target.files[0] }))}
                                        className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                                    />
                                    {error.Image1 && <p className="text-red-700 text-sm font-normal">{error.Image1}</p>}
                                </div>
                                <div className="flex flex-col md:flex-row md:justify-between">
                                    <div className="mb-4 md:mb-0">
                                        <h3 className="text-xl font-bold mb-2">Image 2 <span className="text-red-500">*</span></h3>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"

                                        onChange={(e) => setaddbook((prev) => ({ ...prev, Image2: e.target.files[0] }))}
                                        className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                                    />
                                    {error.Image2 && <p className="text-red-700 text-sm font-normal">{error.Image2}</p>}
                                </div>
                                <div className="flex flex-col md:flex-row md:justify-between">
                                    <div className="mb-4 md:mb-0">
                                        <h3 className="text-xl font-bold mb-2">Image 3 <span className="text-red-500">*</span></h3>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"

                                        onChange={(e) => setaddbook((prev) => ({ ...prev, Image3: e.target.files[0] }))}
                                        className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                                    />
                                    {error.Image3 && <p className="text-red-700 text-sm font-normal">{error.Image3}</p>}
                                </div>
                                <div className="flex flex-col md:flex-row md:justify-between">
                                    <div className="mb-4 md:mb-0">
                                        <h3 className="text-xl font-bold mb-2">Image 4 <span className="text-red-500">*</span></h3>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"

                                        onChange={(e) => setaddbook((prev) => ({ ...prev, Image4: e.target.files[0] }))}
                                        className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                                    />
                                    {error.Image4 && <p className="text-red-700 text-sm font-normal">{error.Image4}</p>}
                                </div>
                                <div className="flex flex-col md:flex-row md:justify-between">
                                    <div className="mb-4 md:mb-0">
                                        <h3 className="text-xl font-bold mb-2">Image 5 <span className="text-red-500">*</span></h3>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"

                                        onChange={(e) => setaddbook((prev) => ({ ...prev, Image5: e.target.files[0] }))}
                                        className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                                    />
                                    {error.Image5 && <p className="text-red-700 text-sm font-normal">{error.Image5}</p>}
                                </div>
                            </div>
                        </div>
                  
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md mr-3 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add Product
                    </button>
                </div>
            </form>
            <Loader loading={loading} />
        </>
    );
};

export default Addproduct;
