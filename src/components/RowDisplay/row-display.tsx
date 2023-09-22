import { useEffect, useState } from "react";
import { CreateRowRequest, TreeResponse, UpdateRowRequest } from "../../types";
import Row from "../Row/row";
import { RowDisplayProps } from "./row-display.types";
import EditableRow from "../EditableRow/editable-row";

export default function RowDisplay({ data, updateOrCreateRow, deleteRow, isLoaded }: RowDisplayProps) {

  const [isEdited, setIsEdited] = useState<UpdateRowRequest | null>(null)
  const [parentId, setParentId] = useState<CreateRowRequest['parentId']>(null)

  const editeRow = (data: UpdateRowRequest) => {
    setIsEdited(data)
  }

  const createChildRow = (data: TreeResponse) => {
    setParentId(data.id)
  }

  useEffect(() => {
    if (isLoaded) {
      setIsEdited(null)
      setParentId(null)
    }
  }, [isLoaded])

  if (isEdited) {
    return (
      <EditableRow
        updateOrCreateRow={updateOrCreateRow}
        isEditedData={isEdited}
        parentId={null}
      />
    )
  }

  return (
    <Row
      data={data}
      editeRow={editeRow}
      deleteRow={deleteRow}
      createChildRow={createChildRow}
    >
      {parentId &&
        <EditableRow
          updateOrCreateRow={updateOrCreateRow}
          parentId={parentId}
        />
      }
      {data.child &&
        data.child.map((data, index) =>
          <Row
            level={index}
            key={data.id}
            data={data}
            editeRow={editeRow}
            deleteRow={deleteRow}
            createChildRow={createChildRow}
          />
        )
      }
    </Row>
  )
}