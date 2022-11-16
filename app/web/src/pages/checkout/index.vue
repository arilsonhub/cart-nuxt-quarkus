<template>
  <div>
    <h3>Meu carrinho</h3>
    <ul>
      <li v-for="product in cart.products" :key="product.id">
          Produto {{product.name}} - {{product.price}}
      </li>
    </ul>
    <form @submit.prevent="onSubmit">
        <div>
            <label>Cartão de crédito</label>&nbsp;
            <input type="text" v-model="creditCardNumber" /><br /><br />
            <button type="submit">Comprar</button>&nbsp;
            <button @click.prevent="goToIndex">Voltar</button>
        </div>
    </form>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from 'vuex';
import { ProcessOrderUseCase } from '../../core/application/order/processOrderUseCase';
import { container, Registry } from '../../core/infra/containerRegistry';

export default {
  name: 'checkout',

  data() {
    return {
      creditCardNumber: ''
    }
  },

  computed: {
    ...mapState('cart', ['cart'])
  },

  methods: {
    ...mapActions('cart', ['reloadCart']),

    async onSubmit() {
      const processOrderUseCase = container.get<ProcessOrderUseCase>(Registry.ProcessOrderUseCase);
      const order = await processOrderUseCase.execute({
        products: this.cart.products,
        credit_card_number: this.creditCardNumber
      });
      this.reloadCart();
      this.$router.push({path: `/checkout/${order.id}/success`});
    },

    goToIndex() {
      this.$router.push({name: 'index'})
    }
  }
}
</script>
