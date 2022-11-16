<template>
  <div>
    <h3>{{product.name}}</h3>
    <label>Preço</label><span>&nbsp;{{product.price}}</span><br /><br />
    <button @click.prevent="addProductInCart(product)">Adicionar no carrinho</button><br /><br />
    <button @click.prevent="goToIndex">Voltar</button>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { GetProductUseCase } from '../../core/application/product/getProductUseCase';
import { container, Registry } from '../../core/infra/containerRegistry';
import { Product } from '../../core/domain/entities/product';
import { mapActions } from 'vuex';

export default {
  name:'ProductDetail',

  async asyncData(context: Context) {
    const {id} = context.params || {};
    const useCase = container.get<GetProductUseCase>(Registry.GetProductUseCase);
    const product = await useCase.execute(+id!);
    return {
      product
    }
  },

  methods: {
    ...mapActions('cart', ['addProductInCartAction']),

    addProductInCart(product: Product) {
      this.addProductInCartAction(product);
      this.goToIndex();
    },

    goToIndex() {
      this.$router.push({name: 'index'});
    }
  }
}
</script>
