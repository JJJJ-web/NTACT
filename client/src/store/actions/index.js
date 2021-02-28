export const addCart = (item) => {
    return {
        type: 'ADD_ITEM',
        payload: item,
    };
};

export const deleteCart = (idx) => {
    return {
        type: 'DELETE_ITEM',
        idx,
    };
};