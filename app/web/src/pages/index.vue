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
import { Component, Vue } from 'nuxt-property-decorator';
import { ListProductsUseCase } from '../core/application/product/listProductsUseCase';
import { Product } from '../core/domain/entities/product';
import { container, Registry } from '../core/infra/containerRegistry';

@Component
export default class Index extends Vue {
  products: Array<Product> = [];

  async asyncData(): Promise<object> {
    const useCase = container.get<ListProductsUseCase>(Registry.ListProductsUseCase);
    const products = await useCase.execute();
    return {
      products
    }
  }

  goToProductDetail(product: Product) {
    this.$router.push({name: 'products-id', params: {id: String(product.id)}});
  }

  goToCheckout() {
    this.$router.push({name: 'checkout'});
  }
}
</script>
