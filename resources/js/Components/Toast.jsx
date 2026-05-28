import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = (message, type = 'success') => {
    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        limit: 3,
    };

    if (type === 'success') {
        toast.success(`${message}`, toastOptions);
    } else if (type === 'info') {
        toast.info(`${message}`, toastOptions);
    } else if (type === 'error') {
        toast.error(`${message}`, toastOptions);
    } else if (type === 'warning') { 
        toast.warning(`${message}`, toastOptions);
    } else {
        toast(message, toastOptions);
    }
};

export { ToastContainer, showToast };
