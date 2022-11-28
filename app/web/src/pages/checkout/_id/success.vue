<template>
  <div>
    <h3>Parabéns sua compra foi efetivada</h3>
    <ul>
      <li v-for="product in order.products" :key="product.id">
          Produto {{product.name}} - {{product.price}}
      </li>
    </ul>
    <button @click.prevent="goToIndex">Voltar</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types'
import { container, Registry } from '../../../core/infra/containerRegistry'
import { GetOrderUseCase } from '../../../core/application/order/getOrderUseCase'
import { Order } from '../../../core/domain/entities/order';

@Component
export default class CheckOutSucess extends Vue {
  order: Order = new Order({
    id: 0,
    products: [],
    credit_card_number: ''
  });

  async asyncData(context: Context) {
    const {id} = context.params || {}
    const useCase = container.get<GetOrderUseCase>(Registry.GetOrderUseCase);
    const order = await useCase.execute(+id!);
    return {
      order
    }
  }

  goToIndex() {
    this.$router.push({name: 'index'});
  }
}
</script>
