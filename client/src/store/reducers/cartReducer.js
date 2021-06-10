const INITIAL_STATE = {
  cart: [],
  count: 0,
  total: 0,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_ITEM': {
    const cartitem = state.cart.find((item) => item.Id === action.payload.Id);

    if (cartitem) {
      cartitem.Quantity += action.payload.Quantity;
    } else {
      const addtoCart = {
        Id: action.payload.Id,
        Img: action.payload.Img,
        Name: action.payload.Name,
        Price: action.payload.Price,
        Quantity: action.payload.Quantity,
      };
      state.cart.push(addtoCart);
    }

    return {
      ...state,
      cart: [...state.cart],
      count: state.count + action.payload.Quantity,
      total: state.total + (action.payload.Price * action.payload.Quantity),
    };
  }

  case 'DELETE_ITEM':
    return {
      ...state,
      cart: state.cart.filter((item) => item.Id !== action.payload.Id),
      count: state.count - action.payload.Quantity,
      total: state.total - (action.payload.Price * action.payload.Quantity),
    };

  case 'DELETE_ALL':
    return {
      cart: [],
      count: 0,
      total: 0,
    };

  case 'INCREMENT': {
    const plus = state.cart.find((item) => item.Id === action.payload.Id);

    if (plus) {
      plus.Quantity += 1;
    }

    return {
      ...state,
      cart: [...state.cart],
      count: state.count + 1,
      total: state.total + action.payload.Price,
    };
  }

  case 'DECREMENT': {
    const minus = state.cart.find((item) => item.Id === action.payload.Id);

    if (minus && minus.Quantity > 1) {
      minus.Quantity -= 1;

      return {
        ...state,
        cart: [...state.cart],
        count: state.count - 1,
        total: state.total - action.payload.Price,
      };
    }
    return {
      ...state,
      cart: [...state.cart],
      count: state.count,
      total: state.total,
    };
  }

  default:
    return state;
  }
};

export default cartReducer;
