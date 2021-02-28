const cartReducer = (state = [], action) => {
    switch(action.type) {
    case 'ADD_ITEM':
        return [...state, action.payload];
    case 'DELETE_ITEM':
        const delIdx = action.idx; // Id값임
        const filteredItem = state.filter((_, idx) => {
            return state[idx]['Id'] !== state[delIdx]['Id'];
        });
        return filteredItem;
    default:
        return state;
    }
};

export default cartReducer;