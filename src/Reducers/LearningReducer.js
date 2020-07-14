export const learningReducer = (state, {type, payload}) => {
    switch (type) {
        case "ADD_NEW_SUBJECT":
            return [
                ...state, {
                    name: payload.subjectName, id: payload.id,
                    category: []
                }
            ];

        case "ADD_NEW_CATEGORY":
            return (
                state.map((item) => item.name === payload.subjectName ? {
                        ...item,
                        category: [...item.category, {name: payload.newCategory, id: payload.categoryId, text: []}]
                    }
                    : item)
            );
        case "ADD_NEW_CATEGORY_TEXT_TITLE":
            return (
                state.map((item) => item.name === payload.subjectName ? {
                        ...item,
                        category: item.category.map((category) => category.name === payload.nameCategory ? {
                            ...category,
                            text: [...category.text, {name: payload.newCategoryTextTitle, id: Math.random(), text: ''},]
                        } : category)
                    }
                    : item)
            );
        case "ADD_NEW_CATEGORY_TEXT":
            const {subjectName, nameCategory, textName} = payload;
            debugger
            return (
                state.map((item) => item.name === payload.subjectName ? {
                        ...item,
                        category: item.category.map((category) => category.name === payload.nameCategory ? {
                                ...category,
                                text: category.text.map((text) => text.name === payload.textName
                                    ? {name: text.name, id: text.id, text: payload.categoryTextChanged}
                                    : text)
                            }
                            : category)
                    }
                    : item)
            );
        case "DELETE_CATEGORY_TEXT":
            return (
                state.map((item) => item.name === payload.subjectName ? {
                        ...item,
                        category: item.category.map((category) => category.name === payload.nameCategory ? {
                                ...category,
                                text: category.text.filter((text) => text.id !== payload.textId)
                            }
                            : category)
                    }
                    : item)
            );
        default:
            return state
    }
};


