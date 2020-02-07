import { FacturaService } from './../../services/factura.service';
import { ProductoService } from './../../services/producto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos
  items: any[] = new Array
  constructor(private _productoService: ProductoService, private _facturaService: FacturaService) { }
  desde
  cantidad
  total = 0
  vuelto = 0
  factura
  ngOnInit() {
    this.cargarProductos()
  }

  ingreso(ing) {
    let vueltoAux = 0;
    vueltoAux = ing - this.total
    if (vueltoAux >= 0) {
      this.vuelto = vueltoAux;
    } else {
      this.vuelto = 0;
    }
  }

  cargarProductos() {
    //  this.cargando = true;
    this._productoService.getProductos(this.desde).subscribe((resp: any) => {
      // console.log(resp);
      this.productos = resp.productos
      //  this.cargando = false;
    })
  }

  buscarProducto(termino: string) {
    if (termino.length <= 0) {
      this.cargarProductos();
      return;
    }
    this._productoService.buscarProductos(termino).subscribe((productos) => {
      this.productos = productos
    })
  }

  selecctionarItem(producto, cant) {
    console.log(producto);
    producto.cantidad = cant
    this.items.push(producto)
    this.total += cant * producto.precio
  }

  seleccionarCantidad(cantidad) {
    console.log(cantidad);
    this.cantidad = cantidad
  }

  vender() {
    let date = new Date()
    this.factura = {
      productos: this.items,
      fecha: date.getTime(),
      monto: this.total
    }
    this._facturaService.setFactura(this.factura).subscribe()

  }

}
