import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ResponseRow, ResponseDeleteRow, TreeResponse, DeleteRowRequest, UpdateRowRequestWithId, CreateRowRequestWithId } from '../types'

// Рекурсивный поиск в "child" элементах

const createItem = (tree: TreeResponse[], parentId: number, newItem: TreeResponse): void => {
  for (const item of tree) {
    if (item.id === parentId) {
      if (!item.child) {
        item.child = []
      }
      item.child.push(newItem)
      return
    }
    if (item.child) {
      createItem(item.child, parentId, newItem)
    }
  }
}

const updateItem = (tree: TreeResponse[], rID: number, newItem: TreeResponse): void => {
  for (const item of tree) {
    if (item.id === rID) {
      Object.assign(item, newItem)
      return
    }
    if (item.child) {
      updateItem(item.child, rID, newItem)
    }
  }
}

const deleteItem = (tree: TreeResponse[], rID: number): void => {

  const index = tree.findIndex(index => index.id === rID)
  if (index !== -1) {
    tree.splice(index, 1)
    return
  }
  for (const item of tree) {
    if (item.child) {
      deleteItem(item.child, rID)
    }
  }
}

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
                console.log(data.parentId)
                createItem(draft, data.parentId, updatedRows.current)
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
      async onQueryStarted({ eID, rID }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedRows } = await queryFulfilled
          dispatch(
            outlayStringControllerApi.util.updateQueryData('getTreeRows', eID, (draft) => {
              updateItem(draft, rID, updatedRows.current)
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
                deleteItem(draft, rID)
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


