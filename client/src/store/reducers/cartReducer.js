const INITIAL_STATE = {
  spareCart: [],
  spareTotal: 0,
  cart: [],
  total: 0,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_ITEM': {
    const cartitem = state.spareCart.find((item) => item.Id === action.payload.Id);

    if (cartitem) {
      state.cart.push(cartitem);
    } else {
      const addtoCart = {
        Id: action.payload.Id,
        Img: action.payload.Img,
        Name: action.payload.Name,
        Price: action.payload.Price,
        Quantity: 1,
      };
      state.cart.push(addtoCart);
    }

    state.total = state.spareTotal;

    return {
      ...state,
      spareCart: [...state.cart],
      spareTotal: state.spareTotal,
      cart: [...state.cart],
      total: state.total,
    };
  }

  case 'DELETE_ITEM':
    return {
      ...state,
      spareCart: state.cart.filter((item) => item.Id !== action.payload.Id),
      cart: state.cart.filter((item) => item.Id !== action.payload.Id),
      spareTotal: state.total - action.payload.Price * action.payload.Quantity,
      total: state.total - action.payload.Price * action.payload.Quantity,
    };

  case 'DELETE_ALL':
    return {
      spareCart: [],
      cart: [],
      spareTotal: 0,
      total: 0,
    };

  case 'INCREMENT': {
    const plus = state.cart.find((item) => item.Id === action.payload.Id);

    if (plus) {
      plus.Quantity += 1;
    }

    return {
      ...state,
      spareCart: [...state.cart],
      cart: [...state.cart],
      spareTotal: state.total + action.payload.Price,
      total: state.total + action.payload.Price,
    };
  }

  case 'INCREMENT2': {
    const add = state.spareCart.find((item) => item.Id === action.payload.Id);

    if(add) {
      add.Quantity += 1;
    } else {
      const addtoSpare = {
        Id: action.payload.Id,
        Img: action.payload.Img,
        Name: action.payload.Name,
        Price: action.payload.Price,
        Quantity: 1,
      };
      state.spareCart.push(addtoSpare);
    }
    
    return {
      ...state,
      spareCart: [...state.spareCart],
      spareTotal: state.spareTotal + action.payload.Price,
      cart: [...state.cart],
      total: 0,
    };
  }

  case 'DECREMENT': {
    const minus = state.cart.find((item) => item.Id === action.payload.Id);

    if (minus && minus.Quantity > 0) {
      minus.Quantity -= 1;

      return {
        ...state,
        spareCart: [...state.cart],
        cart: [...state.cart],
        spareTotal: state.total - action.payload.Price,
        total: state.total - action.payload.Price,
      };
    }

    return {
      ...state,
      spareCart: [...state.spareCart],
      spareTotal: state.spareTotal,
      cart: [...state.cart],
      total: state.total,
    };
  }

  case 'DECREMENT2': {
    const del = state.spareCart.find((item) => item.Id === action.payload.Id);

    if (del && del.Quantity > 0) {
      del.Quantity -= 1;

      return {
        ...state,
        spareCart: [...state.spareCart],
        spareTotal: state.spareTotal - action.payload.Price,
        cart: [...state.cart],
        total: 0,
      };
    }

    return {
      ...state,
      spareCart: [...state.spareCart],
      spareTotal: state.spareTotal,
      cart: [...state.cart],
      total: 0,
    };
  }

  default:
    return state;
  }
};

export default cartReducer;
