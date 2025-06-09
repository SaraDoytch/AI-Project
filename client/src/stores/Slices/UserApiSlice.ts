import { createApi } from "@reduxjs/toolkit/query/react";
import apiSlice from "../Slices/ApiSlice";
import {
  IUser,
  ILoginCredentials,
  IResponse,
} from "../../interfaces/Interface";

const UserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IResponse, IUser>({
      query: (user) => ({
        url: "/api/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    login: builder.mutation<IResponse, ILoginCredentials>({
      query: (credentials) => ({
        url: "/api/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["LoginCredentials"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = UserApiSlice;
export default UserApiSlice;
