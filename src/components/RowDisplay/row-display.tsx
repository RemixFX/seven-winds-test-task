import Row from "../Row/row";
import { RowDisplayProps } from "./row-display.types";
import EditableRow from "../EditableRow/editable-row";

export default function RowDisplay({
  data,
  editeRow,
  updateOrCreateRow,
  createChildRow,
  deleteRow,
  isEdited,
  parentId
}: RowDisplayProps) {



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
          <RowDisplay
            level={index}
            key={data.id}
            data={data}
            editeRow={editeRow}
            updateOrCreateRow={updateOrCreateRow}
            deleteRow={deleteRow}
            createChildRow={createChildRow}
            isEdited={isEdited}
            parentId={parentId}
          />
        )
      }
    </Row>
  )
}