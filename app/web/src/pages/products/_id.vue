<template>
  <div>
    <h3>{{product.name}}</h3>
    <label>Preço</label><span>&nbsp;{{product.price}}</span><br /><br />
    <button @click.prevent="addProductInCart(product)">Adicionar no carrinho</button><br /><br />
    <button @click.prevent="goToIndex">Voltar</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';
import { GetProductUseCase } from '../../core/application/product/getProductUseCase';
import { container, Registry } from '../../core/infra/containerRegistry';
import { Product } from '../../core/domain/entities/product';
const cartStore = namespace('cart');

@Component
export default class ProductDetail extends Vue {
  @cartStore.Action
  addProductInCartAction!: (product: Product) => void;

  product: Product = new Product({
    id: 0,
    name: '',
    description: '',
    price: 0
  });

  async asyncData(context: Context): Promise<Object> {
    const {id} = context.params || {};
    const useCase = container.get<GetProductUseCase>(Registry.GetProductUseCase);
    const product = await useCase.execute(+id!);
    return {
      product
    }
  }

  addProductInCart(product: Product) {
    this.addProductInCartAction(product);
    this.goToIndex();
  }

  goToIndex() {
    this.$router.push({name: 'index'});
  }
}
</script>
