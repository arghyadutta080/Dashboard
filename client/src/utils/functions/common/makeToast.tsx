import CustomToast from "@/components/common/CustomToast";
import { toast } from "react-hot-toast";

export const makeToast = (status: number, message: string) => {
  toast.custom((t) => (
    <CustomToast toast={t} status={status} message={message} />
  ));
};
