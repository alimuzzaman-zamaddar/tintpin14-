/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "./apiSlice";

export const cmsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHomeCms: builder.query<any, void>({
      query: () => ({
        url: "/cms/page/home",
        method: "GET",
        includeToken: false,
      }),
    }),
    subscribeNewsletter: builder.mutation<any, any>({
      query: (data) => ({
        url: "/newsletter/subscribe",
        method: "POST",
        data,
        includeToken: true,
      }),
    }),
  }),
});

export const { useGetHomeCmsQuery, useSubscribeNewsletterMutation } = cmsApi;
