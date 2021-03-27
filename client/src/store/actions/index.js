export const addCart = (item) => {
    return {
        type: 'ADD_ITEM',
        payload: item,
    };
};

export const deleteCart = (item) => {
    return {
        type: 'DELETE_ITEM',
        payload: item,
    };
};

export const increment = (item) => {
    return {
        type: 'INCREMENT',
        payload: item,
    };
};

export const decrement = (item) => {
    return {
        type: 'DECREMENT',
        payload: item,
    };
};