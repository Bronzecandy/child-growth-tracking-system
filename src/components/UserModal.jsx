import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SelectButton from './SelectButton';

// Define validation schema using yup
const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: yup.string()
        .matches(/^\+?[0-9\s\-()]+$/, 'Invalid phone number format')
        .required('Phone number is required'),
    role: yup.string().required('Role selection is required')
}).required();

const UserModal = ({ isModalOpen, closeModal, onSubmit, initialData = {} }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialData
    });

    // Handle form submission
    const submitForm = (data) => {
        const formData = new FormData();
        
        // Append text fields
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phoneNumber", data.phoneNumber);
        formData.append("role", data.role);
        
        // Append file (nếu có)
        if (avatar) {
            formData.append("avatar", avatar);
        }
    
        // Gửi FormData thay vì object JSON
        onSubmit(formData);
        reset();
    };
    

    // Handle file change
    const [avatar, setAvatar] = useState(null);
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setAvatar(e.target.files[0]);
        }
    };

    // Reset form when modal closes
    useEffect(() => {
        if (!isModalOpen) {
            reset();
            setAvatar(null);
        } else if (initialData) {
            reset(initialData);
        }
    }, [isModalOpen, initialData, reset]);

    // Handle role selection change
    const handleRoleChange = (value) => {
        setValue('role', value, { shouldValidate: true });
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed bg-neutral-800/50 top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-2xl max-h-full">
                {/* Modal content */}
                <form onSubmit={handleSubmit(submitForm)} className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    {/* Modal header */}
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit user
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={closeModal}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    {/* Modal body */}
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className={`shadow-xs bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    placeholder="Green"
                                    {...register('name')}
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className={`shadow-xs bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    placeholder="example@company.com"
                                    {...register('email')}
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    className={`shadow-xs bg-gray-50 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    placeholder="e.g. +(12)3456 789"
                                    {...register('phoneNumber')}
                                />
                                {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber.message}</p>}
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <SelectButton
                                    id="languages"
                                    label="Order"
                                    defaultOption={
                                        initialData.role === 0
                                            ?  "User" 
                                            : "Doctor" 
                                    }
                                    options={
                                        initialData.role === 0
                                            ? [{ value: "2", label: "Doctor" }]
                                            : [{ value: "0", label: "User" }]
                                    }
                                    onChange={(value) => handleRoleChange(value)}
                                    value={watch('role') || initialData.role || ''}
                                />
                                {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>}
                            </div>
                            <div className="col-span-6 sm:col-span-6">
                                <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>

                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                                            </p>
                                            {avatar && <p className="mt-2 text-sm text-green-500">File selected: {avatar.name}</p>}
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal footer */}
                    <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Save all
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;