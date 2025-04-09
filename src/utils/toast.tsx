import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const showSuccessToast = (message: string) =>
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    icon: <FaCheckCircle className ="text-green-500" />,
  });

export const showErrorToast = (message: string) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    icon: <FaTimesCircle className="text-red-500" />,
  });
