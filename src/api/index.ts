import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ResponseRow, ResponseDeleteRow, TreeResponse, DeleteRowRequest, UpdateRowRequestWithId, CreateRowRequestWithId } from '../types'

export const outlayStringControllerApi = createApi({
  reducerPath: 'outlayStringControllerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://185.244.172.108:8081/' }),
  tagTypes: ['Row'],
  endpoints: (builder) => ({
    getTreeRows: builder.query<TreeResponse[], number>({
      query: (eID) => `v1/outlay-rows/entity/${eID}/row/list`,
      providesTags: ['Row'],
    }),
    createRowInEntity: builder.mutation<ResponseRow, CreateRowRequestWithId>({
      query: ({ eID, ...data }) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/create`,
        method: 'POST',
        body: data,
      }),
      /* Обновление кеша*/
      async onQueryStarted({ eID, ...data }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedRows } = await queryFulfilled
          dispatch(
            outlayStringControllerApi.util.updateQueryData('getTreeRows', eID, (draft) => {
              if (data.parentId === null) {
                draft.push(updatedRows.current)
              } else {
                const foundIndex = draft.findIndex(index => index.id === data.parentId)
                draft.splice(foundIndex + 1, 0, updatedRows.current)
              }
            })
          )
        } catch {
          queryFulfilled.catch()
        }
      },
    }),
    updateRowInEntity: builder.mutation<ResponseRow, UpdateRowRequestWithId>({
      query: ({ eID, rID, ...data }) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/${rID}/update`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted({ eID }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedRows } = await queryFulfilled
          dispatch(
            outlayStringControllerApi.util.updateQueryData('getTreeRows', eID, (draft) => {
              const foundIndex = draft.findIndex(index => index.id === updatedRows.current.id)
              draft[foundIndex] = updatedRows.current
            })
          )
        } catch {
          queryFulfilled.catch()
        }
      },
    }),
    deleteRow: builder.mutation<ResponseDeleteRow, DeleteRowRequest>({
      query: ({ eID, rID }) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/${rID}/delete`,
        method: 'DELETE',
      }),
      async onQueryStarted({ eID, rID }, { dispatch, queryFulfilled }) {
        try {
          const { data: deletedRow } = await queryFulfilled
          dispatch(
            outlayStringControllerApi.util.updateQueryData('getTreeRows', eID, (draft) => {
              if (deletedRow.current === null) {
                const foundIndex = draft.findIndex(index => index.id === rID)
                draft.splice(foundIndex, 1)
              }
            })
          )
        } catch {
          queryFulfilled.catch()
        }
      },
    }),
  })
})

export const {
  useGetTreeRowsQuery,
  useCreateRowInEntityMutation,
  useUpdateRowInEntityMutation,
  useDeleteRowMutation,
} = outlayStringControllerApi

