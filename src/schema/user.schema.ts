import {object, string, ref} from "yup";

export const createUserSchema = object({
    body: object({
        name: string().required("Name is required"),
        email: string()
            .email("Must be a valid email")
            .required("The email is required"),
        password: string().required("The password is required")
                .min(6, "The password is too short - should be 6 chars minimum.")
                .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
        passwordConfirmation: string().oneOf(
            [ref("password"), null], 
            "Password must match"
        )
    })
});