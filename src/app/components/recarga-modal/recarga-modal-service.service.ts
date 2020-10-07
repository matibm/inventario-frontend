import { ProductoService } from './../../services/producto.service';
import { RecargaService } from './../../services/recarga.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecargaModalServiceService {
  oculto = 'oculto'
  marca
  tipo
  stockActual
  id
  precio
  comentario
  fecha
  stockAgregado
  stockAnterior
  recarga
  constructor(
    private _recargaService: RecargaService,
    private _productoService: ProductoService
  ) { }

  ocultarModal() {
    this.oculto = 'oculto';

  }

  async mostrarModal(recarga) {
    this.oculto = '';
    this.id = recarga.productoId;
    this.recarga = recarga;
    let producto: any = await this.getProducto(this.id);
 
    this.marca = producto.marca;
    this.tipo = producto.modelo
    this.stockActual = producto.stock;
    this.precio = producto.precio;
    this.comentario = recarga.comentario;
    this.fecha = recarga.fecha;
    this.stockAgregado = recarga.cantidadASumar
    this.stockAnterior = recarga.stockAnterior
  }

  getProducto(id) {
    return this._productoService.getProductoById(id).then((resp: any) => {
      return resp.producto;
    })
  }

  eliminarRegistro(recarga){

    this._recargaService.deleteRecarga(recarga).subscribe( ()=>{
      this.ocultarModal();
    });
  }

}
