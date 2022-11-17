package org.cart.next.Repositories;

import java.math.BigInteger;
import java.util.List;
import org.cart.next.Entities.Pedido;

public interface PedidoRepository {

    public List<Pedido> obterPedidos();
    
    public Pedido obterPedidoPeloId(BigInteger id);

    public void salvarPedido(Pedido pedido);
}
