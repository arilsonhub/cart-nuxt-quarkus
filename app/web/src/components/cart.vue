<template>
  <nav>Cart - {{cart.total}} | Items - {{productsLength}}</nav>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator';
import { GetCartUseCase } from '../core/application/cart/getCartUseCase';
import { Cart } from '../core/domain/entities/cart';
import { container, Registry } from '../core/infra/containerRegistry';
const cartStore = namespace('cart');

@Component
export default class CartView extends Vue {
  @cartStore.Action
  saveCart!: (cart: Cart) => void;

  @cartStore.State
  cart!: Cart;

  @cartStore.Getter
  productsLength!: number;

  mounted() {
    const useCase = container.get<GetCartUseCase>(Registry.GetCartUseCase);
    const cart = useCase.execute();
    this.saveCart(cart);
  }
}
</script>
