import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Row, RequestRow, ResponseRow } from '../types'

export const outlayStringControllerApi = createApi({
  reducerPath: 'outlayStringControllerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://185.244.172.108:8081/' }),
  endpoints: (builder) => ({
    getTreeRows: builder.query<Row[], number>({
      query: (eID) => `v1/outlay-rows/entity/${eID}/row/list`,
    }),
    createRowInEntity: builder.mutation<ResponseRow, RequestRow>({
      query: ({ eID, ...data }) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/create`,
        method: 'POST',
        body: data,
      }),
      /* Оптимистичное обновление */
      onQueryStarted({ eID, ...data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          outlayStringControllerApi.util.updateQueryData('getTreeRows', eID, (draft) => {
            Object.assign(draft, data)
          })
        )
        queryFulfilled.catch(patchResult.undo)
      }
    }),
  })
})

export const { useGetTreeRowsQuery, useCreateRowInEntityMutation } = outlayStringControllerApi

