import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ResponseRow, TreeResponse, DeleteRowRequest, UpdateRowRequestWithId, CreateRowRequestWithId } from '../types'

// Рекурсивная функция для создания новых элементов
const createItem = (tree: TreeResponse[], parentId: number, createdItems: ResponseRow): void => {
  for (const item of tree) {
    if (item.id === parentId) {
      if (!item.child) {
        item.child = [];
      }
      item.child.push(createdItems.current)
    }
    if (item.child) {
      createItem(item.child, parentId, createdItems)
    }
  }

  for (const changedItem of createdItems.changed) {
    updateItem(tree, changedItem.id, { current: changedItem, changed: [] });
  }
}

// Рекурсивная функция для обновления элементов
const updateItem = (tree: TreeResponse[], rID: number, updatedItems: ResponseRow): void => {
  for (const item of tree) {
    if (item.id === rID) {
      Object.assign(item, updatedItems.current)
    }
    if (item.child) {
      updateItem(item.child, rID, updatedItems)
    }
  }

  for (const changedItem of updatedItems.changed) {
    updateItem(tree, changedItem.id, { current: changedItem, changed: [] });
  }
}

// Рекурсивная функция для удаления элемента
const deleteItem = (tree: TreeResponse[], rID: number, deletedItems: ResponseRow): void => {
  const index = tree.findIndex(index => index.id === rID)
  if (index !== -1) {
    tree.splice(index, 1)
  }

  for (const item of tree) {
    if (item.child) {
      deleteItem(item.child, rID, deletedItems)
    }
  }

  for (const changedItem of deletedItems.changed) {
    updateItem(tree, changedItem.id, { current: changedItem, changed: [] })
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
    // Метод создания элемента
    createRowInEntity: builder.mutation<ResponseRow, CreateRowRequestWithId>({
      query: ({ eID, ...data }) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/create`,
        method: 'POST',
        body: data,
      }),
      // Обновление кеша
      async onQueryStarted({ eID, ...data }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedRows } = await queryFulfilled
          dispatch(
            outlayStringControllerApi.util.updateQueryData('getTreeRows', eID, (draft) => {
              if (data.parentId === null) {
                draft.push(updatedRows.current)
              } else {
                createItem(draft, data.parentId, updatedRows)
              }
            })
          )
        } catch {
          queryFulfilled.catch()
        }
      },
    }),
    // Метод обновления элемента
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
              updateItem(draft, rID, updatedRows)
            })
          )
        } catch {
          queryFulfilled.catch()
        }
      },
    }),
    // Метод удаления элемента
    deleteRow: builder.mutation<ResponseRow, DeleteRowRequest>({
      query: ({ eID, rID }) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/${rID}/delete`,
        method: 'DELETE',
      }),
      async onQueryStarted({ eID, rID }, { dispatch, queryFulfilled }) {
        try {
          const { data: deletedRow } = await queryFulfilled
          dispatch(
            outlayStringControllerApi.util.updateQueryData('getTreeRows', eID, (draft) => {
              deleteItem(draft, rID, deletedRow)
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


