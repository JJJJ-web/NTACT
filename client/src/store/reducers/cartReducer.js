const INITIAL_STATE = {
  spareCart: [],
  spareTotal: 0,
  cart: [],
  total: 0,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_ITEM': {
    const spareItem = state.spareCart.find((item) => item.Id === action.payload.Id);
    const cartItem = state.cart.find((item) => item.Id === action.payload.Id);

    if (spareItem) { // 임시 스토어에 들어있고
      if(cartItem) { // 카트 스토어에 이미 들어 있다면
        // 해당 배열에서 Quantity 값만 수정
        cartItem.Quantity = spareItem.Quantity;
        // 또는 해당 배열에서 삭제 후 현제 값을 배열에 push
      } else { // 임시 스토어에 있지만 카트 스토어에 없는 경우
        // 바로 카트 스토어에 push
        state.cart.push(spareItem);
      }
    } else {
      state.spareCart.push(spareItem);
    }

    state.total = state.spareTotal;
    console.log(state);
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
      total: state.total,
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
        total: state.total,
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
