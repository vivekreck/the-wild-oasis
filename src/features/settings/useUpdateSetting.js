import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
    const queryClient = useQueryClient();

    const { mutate: updateSetting, isPending: isUpdating } = useMutation({
        mutationFn: updateSettingAPI,
        onSuccess: () => {
            toast.success("Setting successfully updateed");
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (err) => {
            console.log(err);
            toast.error(err.message);
        },
    });

    return { updateSetting, isUpdating };
}