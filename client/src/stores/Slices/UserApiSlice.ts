import { User } from "../../interfaces/Interface";
import apiSlice from "../Slices/ApiSlice";


interface LoginCredentials {
    email: string;
    password: string;
}

export interface Response {
    accessToken: string;
    user: User
}
const UserApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        register: builder.mutation<Response, User>({
            query: (user) => ({
                url: "api/register",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["User"]
        }),
        login: builder.mutation<Response, LoginCredentials>({
            query: (user) => ({
                url: "api/login",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["LoginCredentials"]
        }),
    })
})

export const { useLoginMutation, useRegisterMutation } = UserApiSlice;
export default UserApiSlice;