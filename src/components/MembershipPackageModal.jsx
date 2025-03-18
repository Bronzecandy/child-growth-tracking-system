import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().typeError("Price must be a number").required("Price is required").positive("Price must be positive"),
    duration: yup.number().typeError("Duration must be a number").required("Duration is required").positive("Duration must be positive"),
    postLimit: yup.number().typeError("Post Limit must be a number").required("Post Limit is required").min(1, "Must be at least 1"),
    updateChildDataLimit: yup.number().typeError("Child Limit must be a number").required("Child Limit is required").min(0, "Must be at least 0"),
});

const MembershipPackageModal = ({ isOpen, onClose, onSubmitForm }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            price: Number(data.price),
            duration: Number(data.duration),
            postLimit: Number(data.postLimit),
            updateChildDataLimit: Number(data.updateChildDataLimit),
            unit: "VND",
        };

        await onSubmitForm(payload);
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bg-neutral-800/50 top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 h-screen">
            <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg dark:bg-gray-700">
                <form onSubmit={handleSubmit(onSubmit)} className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Create Membership Package</h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-6 gap-6 p-6 space-y-6">
                        {[
                            { name: "name", label: "Name", type: "text" },
                            { name: "price", label: "Price (VND)", type: "number" },
                            { name: "duration", label: "Duration", type: "number" },
                            { name: "postLimit", label: "Post Limit", type: "number" },
                            { name: "updateChildDataLimit", label: "Child Limit", type: "number" },
                        ].map(({ name, label, type }) => (
                            <div key={name} className="col-span-6 sm:col-span-3">
                                <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                                <input
                                    {...register(name)}
                                    id={name}
                                    type={type}
                                    className={`shadow-xs bg-gray-50 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    placeholder={label}
                                />
                                {errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
                            </div>
                        ))}

                        <div className="col-span-6">
                            <label htmlFor="description" className="block text-sm font-medium">Description</label>
                            <textarea {...register("description")} id="description" className={`shadow-xs bg-gray-50 border ${errors.description ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description?.message}</p>}
                        </div>
                    </div>

                    <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="button" onClick={onClose} className="px-5 py-2 bg-gray-300 rounded-lg">Cancel</button>
                        <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MembershipPackageModal;
