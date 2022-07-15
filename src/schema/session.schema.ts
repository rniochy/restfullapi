import {object, string, ref} from "yup";

export const sessionUserSchema = object({
    body: object({
        email: string()
            .email("Must be a valid email")
            .required("The email is required"),
        password: string().required("The password is required")
                .min(6, "The password is too short - should be 6 chars minimum.")
                .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
    })
    })