import { ProveedorModalService } from './../../components/editar-proveedor-modal/proveedor-modal.service';
import { ProductoService } from './../../services/producto.service';
import { EditarProductoModalService } from './../../components/editar-producto-modal/editar-producto-modal.service';
import { ProveedorService } from './../../services/proveedor.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
  proveedores
  productos
  proveedor
  oculto = false;
  constructor(
    public _proveedorService: ProveedorService,
    public _editarProductoModalService: EditarProductoModalService,
    public _productoService: ProductoService,
    private _proveedorModal: ProveedorModalService

  ) { }

  async ngOnInit() {

    this.getProveedores()

 
    this._productoService.notificacion.subscribe(() => {
      console.log("actualizando");
      
      this.getProductos(this.proveedor._id)
    })

  }

  async getProveedores() {
    let resp: any = await this._proveedorService.getProveedores()
    if (resp.ok == false) {
      return
    }
    this.proveedores = resp.proveedores
    if (!this.proveedor) {
      this.proveedor =   this.proveedores[0]._id 
      
    }
    // this.getProductos(this.proveedor._id)

  }

  async getProductos(id) {
    let resp: any = await this._productoService.getProductosPorProveedor(id);
    this.productos = resp.productos
  }

  async crearProveedor(nombre, tel, comentario) {
    let proveedor = {
      nombre: nombre,
      telefono: tel,
      comentario: comentario
    }
    let r = await this._proveedorService.createProveedor(proveedor);

    Swal.fire({
      icon: 'success',
      title: 'Proveedor creado',
      showConfirmButton: true
    });
    this.getProveedores()
    this.oculto = false;
  }

  selectProveedor(item) {
    this.proveedor = item
    this.getProductos(item._id)

  }

  async eliminarProveedor(id) {
    await this._proveedorService.deleteProveedor(id)
    Swal.fire({
      icon: 'success',
      title: 'Proveedor eliminado',
      showConfirmButton: true
    });
    this.getProveedores()
  }

  editarProveedor(proveedor) {
    this._proveedorModal.mostrarModal(proveedor);
    this._proveedorModal.notificacion.subscribe(() => {
      this.getProveedores()
      this._proveedorModal.notificacion.unsubscribe()
    })
  }

  getColor(stock, minimo): string {
    if (stock < 1) {

      return 'table-danger'

    }
    else if (stock > 0 && stock < minimo) {
      return 'table-warning'
    }
    else {
      return ''

    }
  }

}
