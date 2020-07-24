export const learningReducer = (state, {type, payload}) => {
    switch (type) {
        case "ADD_NEW_SUBJECT":
            return [
                ...state,
                {
                    name: payload.subjectName, id: payload.id,
                    category: []
                }
            ];
        case "ADD_NEW_CATEGORY":
            return (
                state.map((item) => item.id === payload.subjectId ? {
                        ...item,
                        category: [...item.category, {name: payload.newCategory, id: payload.categoryId, text: []}]
                    }
                    : item)
            );
        case "ADD_NEW_CATEGORY_TEXT_TITLE":
            return (
                state.map((item) => item.id === payload.subjectId ? {
                        ...item,
                        category: item.category.map((category) => category.id === payload.categoryId ? {
                            ...category,
                            text: [...category.text, {name: payload.newCategoryTextTitle, id: payload.id, text: ''},]
                        } : category)
                    }
                    : item)
            );
        case "ADD_NEW_CATEGORY_TEXT":
            return (
                state.map((item) => item.id === payload.subjectId ? {
                        ...item,
                        category: item.category.map((category) => category.id === payload.categoryId ? {
                                ...category,
                                text: category.text.map((text) => text.id === payload.textId
                                    ? {name: text.name, id: text.id, text: payload.categoryTextChanged}
                                    : text)
                            }
                            : category)
                    }
                    : item)
            );
        case "DELETE_SUBJECT_ITEM":
            return (
                state.filter((item) => item.id !== payload.subjectId)
            );
        case "DELETE_CATEGORY_ITEM":
            return (
                state.map((item) => item.id === payload.subjectId
                    ? {
                        ...item,
                        category: item.category.filter((category) => category.id !== payload.categoryId)
                    }
                    : item
                )
            );
        case "DELETE_CATEGORY_TEXT":
            return (
                state.map((item) => item.id === payload.subjectId ? {
                        ...item,
                        category: item.category.map((category) => category.id === payload.categoryId ? {
                                ...category,
                                text: category.text.filter((text) => text.id !== payload.textId)
                            }
                            : category)
                    }
                    : item)
            );
        case "CHANGE_SUBJECT_ORDER":
            const {subjectCopy} = payload;
            const remainingSubjects = state.filter((subject) => subject.id !== subjectCopy.id);
            return [
                ...remainingSubjects.slice(0, payload.finishIndex),
                subjectCopy,
                ...remainingSubjects.slice(payload.finishIndex),
            ];
        case "CHANGE_CATEGORY_ORDER":
            const {categoryCopy, subjectId} = payload;
            const subjectCategories = state.find((item) => item.id === subjectId);
            const remainCategories = subjectCategories.category.filter((category) => category.id !== categoryCopy.id);
            const newCategoriesPosition = [
                ...remainCategories.slice(0, payload.finishIndex),
                categoryCopy,
                ...remainCategories.slice(payload.finishIndex),
            ];
            return (
                state.map((item) => item.id === subjectId
                    ? {
                        ...item,
                        category: newCategoriesPosition
                    }
                    : item
                )
            );
        default:
            return state
    }
};


