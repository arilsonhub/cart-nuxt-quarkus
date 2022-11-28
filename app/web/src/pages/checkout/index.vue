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
            <input v-model="creditCardNumber" type="text" /><br /><br />
            <button type="submit">Comprar</button>&nbsp;
            <button @click.prevent="goToIndex">Voltar</button>
        </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import { ProcessOrderUseCase } from '../../core/application/order/processOrderUseCase';
import { Cart } from '../../core/domain/entities/cart';
import { container, Registry } from '../../core/infra/containerRegistry';
const cartStore = namespace('cart');

@Component
export default class CheckOutIndex extends Vue {
  creditCardNumber: string = '';

  @cartStore.State
  cart!: Cart;

  @cartStore.Action
  reloadCart!: () => void;

  async onSubmit() {
    const processOrderUseCase = container.get<ProcessOrderUseCase>(Registry.ProcessOrderUseCase);
    const order = await processOrderUseCase.execute({
      products: this.cart.products,
      credit_card_number: this.creditCardNumber
    });
    this.reloadCart();
    this.$router.push({path: `/checkout/${order.id}/success`});
  }

  goToIndex() {
    this.$router.push({name: 'index'});
  }
}
</script>
