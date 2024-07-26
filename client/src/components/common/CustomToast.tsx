import React from "react";
import { Toast } from "react-hot-toast";
import { IoIosCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";

type Props = { toast: Toast; status: number; message: string };

const CustomToast: React.FC<Props> = ({ toast, status, message }) => {
  return (
    <div
      className={`${
        toast.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full ${
        status >= 200 && status < 300 ? "bg-[#EBFBF6]" : "bg-[#FDEDEE]"
      } shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 pl-5 py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 py-0.5">
            {status >= 200 && status < 300 ? (
              <IoIosCheckmarkCircle size={35} color="#34D39D" />
            ) : (
              <IoMdCloseCircle size={35} color="#EF4D62" />
            )}
          </div>
          <div className="ml-4 flex-1">
            <p className="text-lg font-medium text-gray-900">
              {status >= 200 && status < 300 ? "Success" : "Error"}
            </p>
            <p className="mt-1 text-md text-gray-500">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomToast;
