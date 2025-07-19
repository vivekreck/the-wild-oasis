import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: logout, isPending } = useMutation({
        mutationFn: ({ email, password }) => logoutAPI({
            email, password
        }),

        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/login", { replace: true })
        },

        onError: (err) => {
            console.log("Error-logout: ", err);
            toast.error("Unable to logout facing some issue!")
        }

    })

    return { logout, isPending }
}