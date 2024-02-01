import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tierListApi = createApi({
	reducerPath: "tierlist-api",
	baseQuery: fetchBaseQuery({
		baseUrl: "/"
	}),
	endpoints: builder => ({
		getUniqueId: builder.query<string, void>({
			query: () => {
				return "/api/id"
			}
		})
	})
})


export const { useLazyGetUniqueIdQuery } = tierListApi