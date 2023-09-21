import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Row, OutlayRowRequest, ResponseRow } from '../types'

export const outlayStringControllerApi = createApi({
  reducerPath: 'outlayStringControllerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://185.244.172.108:8081/' }),
  tagTypes: ['Row'],
  endpoints: (builder) => ({
    getTreeRows: builder.query<Row[], number>({
      query: (eID) => `v1/outlay-rows/entity/${eID}/row/list`,
      providesTags: ['Row'],
    }),
    createRowInEntity: builder.mutation<ResponseRow, OutlayRowRequest>({
      query: ({ eID, ...data }) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/create`,
        method: 'POST',
        body: data,
      }),
      /* Обновление кеша*/
      async onQueryStarted({ eID }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedRows } = await queryFulfilled
          dispatch(
            outlayStringControllerApi.util.updateQueryData('getTreeRows', eID, (draft) => {
              draft.push(updatedRows.current)

            })
          )
        } catch { /* empty */ }
      },
    }),
  })
})

export const { useGetTreeRowsQuery, useCreateRowInEntityMutation } = outlayStringControllerApi

