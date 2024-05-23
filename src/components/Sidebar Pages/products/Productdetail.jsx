import React from 'react';
import { selectproducts } from '../../../StoreRedux/productSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
const Productdetail = () => {
    const { productId } = useParams();
    console.log(productId);
    const alldata = useSelector(selectproducts);
    const [single, setSingledata] = useState()
    useEffect(() => {
        const data = alldata.find(pro => pro._id === productId)
        setSingledata(data);
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alldata]);
    console.log(single);
    return (
        <div>
            <div className="bg-white">

                {
                    single ? <div>

                        <div className='flex px-6 items-center justify-between w-full '>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Product Details</h2>

                        </div>
                        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4  sm:px-6 p-4 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                            <div>
                                {
                                    single.productDescription &&
                                    <p className="mt-4 text-gray-500">
                                        {
                                            single.productDescription
                                        }
                                    </p>
                                }

                                <dl className="my-4 grid grid-cols-1 sm:grid-cols-2  gap-x-2 gap-y-4 sm:gap-y-10 lg:gap-x-4">

                                    <div className="border-t col-span-1 sm:col-span-2   border-gray-200 py-2 ">
                                        <dt className="font-medium text-gray-900">Product Name</dt>
                                        <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                                            {single.productName}

                                        </dd>
                                    </div>
                                    
                                    <div className="border-t col-span-1 sm:col-span-2   border-gray-200 py-2 ">
                                        <dt className="font-medium text-gray-900">Category Type</dt>
                                        <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                                            {single.categoryType}

                                        </dd>
                                    </div>
                                    
                                    <div className="border-t col-span-1 sm:col-span-2   border-gray-200 py-2 ">
                                        <dt className="font-medium text-gray-900">Project Type</dt>
                                        <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                                            {single.projectType}

                                        </dd>
                                    </div>
                                    
                                    <div className="border-t col-span-1 sm:col-span-2   border-gray-200 py-2 ">
                                        <dt className="font-medium text-gray-900">Product price</dt>
                                        <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                                            {single.price}

                                        </dd>
                                    </div>

                                    <div className="border-t col-span-1 sm:col-span-2   border-gray-200 py-2 ">
                                        <dt className="font-medium text-gray-900">Product Url</dt>
                                        <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                                            <a className='text-blue-600' href={single.projectUrl}>{single.projectUrl}</a>

                                        </dd>
                                    </div>
                                    <div className="border-t col-span-1 sm:col-span-2   border-gray-200 py-2 ">
                                        <dt className="font-medium text-gray-900">Code Url</dt>
                                        <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                                            <a className='text-blue-600'  href={single.codeUrl}>{single.codeUrl}</a>
                                           
                                        </dd>
                                    </div>



                                </dl>
                            </div>
                            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                               {single.productImage1 && <img
                                    src={single.productImage1}
                                    alt="miqat"
                                    className="rounded-lg bg-gray-100 w-[200px] h-[200px]"
                                />}
                                {
                                    single.productImage2 && <img
                                        src={single.productImage2}
                                        alt="miqat"
                                        className="rounded-lg bg-gray-100 w-[200px] h-[200px]"
                                    />
                                }
                                {
                                    single.productImage3 && <img
                                        src={single.productImage3}
                                        alt="miqat"
                                        className="rounded-lg bg-gray-100 w-[200px] h-[200px]"
                                    />
                                }
                                {
                                    single.productImage4 && <img
                                    src={single.productImage4}
                                    alt="miqat"
                                    className="rounded-lg bg-gray-100 w-[200px] h-[200px]"
                                />

                                }
                                                             {
                                    single.productImage5 && <img
                                    src={single.productImage5}
                                    alt="miqat"
                                    className="rounded-lg bg-gray-100 w-[200px] h-[200px]"
                                />

                                }

                            </div>
                        </div>
                    </div> :
                        <div>
                            <p>
                                No Product found
                            </p>
                        </div>

                }

            </div >
        </div>
    );
}

export default Productdetail;
