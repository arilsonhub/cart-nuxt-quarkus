import { AddProductInCartUseCase } from '~/src/core/application/cart/addProductInCartUseCase';
import { GetCartUseCase } from '~/src/core/application/cart/getCartUseCase';
import { Cart } from '../../core/domain/entities/cart';
import { container, Registry } from '../../core/infra/containerRegistry';
import { State, Mutations, MutationsInterface, ActionsInterface, Getters } from './types';

export const state = (cart: Cart): State => ({
  cart: new Cart({
    products: []
  })
});

export const getters: Getters = {
  productsLength: state => state.cart.products === undefined ? 0 : state.cart.products.length
}

export const mutations: MutationsInterface = {
  [Mutations.SET_CART](state, cart) {
    state.cart = cart;
  }
};

export const actions: ActionsInterface = {
  saveCart({ commit }, cart) {
    commit(Mutations.SET_CART, cart);
  },
  addProductInCartAction({ commit }, product) {
    const addProductInCartUseCase = container.get<AddProductInCartUseCase>(Registry.AddProductInCartUseCase);
    addProductInCartUseCase.execute(product);
    const getCartUseCase = container.get<GetCartUseCase>(Registry.GetCartUseCase);
    const cart = getCartUseCase.execute();
    commit(Mutations.SET_CART, cart);
  },
  reloadCart({ commit }) {
    const getCartUseCase = container.get<GetCartUseCase>(Registry.GetCartUseCase);
    const cart = getCartUseCase.execute();
    cart.clear();
    commit(Mutations.SET_CART, cart);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
