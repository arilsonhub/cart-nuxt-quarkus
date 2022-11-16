<template>
  <nav>Cart - {{cart.total}} | Items - {{productsLength}}</nav>
</template>

<script lang="ts">
import { mapActions, mapState, mapGetters } from 'vuex';
import { GetCartUseCase } from '../core/application/cart/getCartUseCase';
import { container, Registry } from '../core/infra/containerRegistry';

export default {
  name: 'cart',

  computed: {
    ...mapState('cart', ['cart']),
    ...mapGetters('cart', ['productsLength'])
  },

  methods: {
    ...mapActions('cart', ['saveCart'])
  },

  mounted() {
    const useCase = container.get<GetCartUseCase>(Registry.GetCartUseCase);
    const cart = useCase.execute();
    this.saveCart(cart);
  }
}
</script>
