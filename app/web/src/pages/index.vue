<template>
  <div>
      <h1>Ecommerce cart-nuxt</h1>
      <button @click.prevent="goToCheckout">Checkout</button>
      <ul>
          <li v-for="product in products" :key="product.id" style="padding-bottom: 1%;">
            <label>Nome:</label><span>&nbsp;{{product.name}}</span><span>&nbsp;|&nbsp;</span>
            <button @click.prevent="goToProductDetail(product)">Visualizar</button>
          </li>
      </ul>
    </div>
</template>

<script lang="ts">
import { ListProductsUseCase } from '../core/application/product/listProductsUseCase';
import { Product } from '../core/domain/entities/product';
import { container, Registry } from '../core/infra/containerRegistry';

export default {
  name: 'indexPage',

  async asyncData() {
    const useCase = container.get<ListProductsUseCase>(Registry.ListProductsUseCase);
    const products = await useCase.execute();
    return {
      products
    }
  },

  methods: {
    goToProductDetail(product: Product) {
      this.$router.push({name: 'products-id', params: {id: product.id}});
    },

    goToCheckout() {
      this.$router.push({name: 'checkout'});
    }
  }
}
</script>
