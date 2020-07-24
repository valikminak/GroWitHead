
export const closeInput = (e, newItem, setNewItem) => {
    if (newItem && e.target.nodeName !== "INPUT") {
        setNewItem(false)
    }
};

export const handleDragEnd = (dispatch,item,draggableId,destination,type,subjectId) => {
    const itemCopy = item.find((i) => i.name+i.id === draggableId);
  switch (type) {
      case "subjects":
          return (
              dispatch({
                  type: "CHANGE_SUBJECT_ORDER",
                  payload: {
                      subjectCopy: itemCopy,
                      finishIndex: destination.index
                  }
              })
          );
      case "categories":
          return (
              dispatch({
                  type: "CHANGE_CATEGORY_ORDER",
                  payload: {
                      categoryCopy: itemCopy,
                      finishIndex: destination.index,
                      subjectId:subjectId
                  }
              })
          );
      default:
          return null

  }
};