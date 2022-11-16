import { MutationTree, ActionTree, ActionContext } from 'vuex';
import { Cart } from "~/src/core/domain/entities/cart";
import { Product } from '~/src/core/domain/entities/product';

export interface State {
  cart: Cart;
}

export interface Getters {
  productsLength: (state: State) => number;
}

export enum Mutations {
  SET_CART = 'SET_CART'
}

export type RootState = ReturnType<() => State>;

export interface MutationsInterface extends MutationTree<RootState> {
  [Mutations.SET_CART](state: State, cart: Cart): void;
}

export interface ActionsInterface extends ActionTree<State, RootState> {
  saveCart(actionContext: ActionContext<State, RootState>, cart: Cart): void;
  addProductInCartAction(actionContext: ActionContext<State, RootState>, product: Product): void;
  reloadCart(actionContext: ActionContext<State, RootState>): void;
}
