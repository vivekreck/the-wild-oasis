import { useMutation } from "@tanstack/react-query";
import { singnup as singupAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {

    const { mutate: signup, isPending } = useMutation({
        mutationFn: ({ email, password, fullName }) => singupAPI({
            email, password, fullName
        }),

        onSuccess: () => {
            toast.success("Account created successfully.")
        },

        onError: (err) => {
            console.log("Error-login: ", err);
            toast.error("Not able to create account at this moment.")
        }

    })

    return { signup, isPending }
}