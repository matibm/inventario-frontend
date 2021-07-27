import { RecargaService } from './../../services/recarga.service';
import { LoginService } from './../login/login.service';
import Swal from 'sweetalert2';
import { SubirArchivoService } from './../../services/subir-archivo.service';
import { ProductoService } from './../../services/producto.service';
import { Injectable, EventEmitter } from '@angular/core';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Injectable({
  providedIn: 'root'
})
export class EditarProductoModalService {
  marca
  codigo
  proveedores
  modelo
  buscador
  precio
  precioBruto
  img
  proveedor
  descuento
  id
  cantidad
  stockMinimo = 0
  imagenSubir
  imagenTemp
  agregarCantidad = 0
  stock_antes_de_modificar
  comentario = ''
  stocks
  public notificacion = new EventEmitter<any>();

  oculto = 'oculto'
  constructor(
    private _subirArchivoService: SubirArchivoService,
    private _productoService: ProductoService,
    public _loginService: LoginService,
    public _recargaService: RecargaService,
    public _proveedorService: ProveedorService
  ) { }

  ocultarModal() {
    console.log("ocultando");
    this.proveedor = null;
    this.oculto = 'oculto'
    this.imagenSubir = null
    this.imagenTemp = ''
    this.agregarCantidad = null;
    this.proveedores = null;
    this.buscador = null;
  }

  guardar() {
    console.log(this.proveedor);

    if (!this._loginService.logued) {
      this.cantidad += this.agregarCantidad;
    }
    var form = document.getElementById("amyFormEditProduct");
    function handleForm(event) { event.preventDefault(); }
    form.addEventListener('submit', handleForm);

    if (this.imagenSubir) {
      this._subirArchivoService.subirArchivo(this.imagenSubir)
        .then((resp: any) => {

          // Swal.fire('Imagen subida correctamente','', 'success')
          this.notificacion.emit(resp);
          this.img = resp.nombreArchivo
          let producto = {
            _id: this.id,
            marca: this.marca,
            modelo: this.modelo,
            codigo: this.codigo,
            precio: this.precio,
            precioBruto: this.precioBruto,
            stock: this.cantidad,
            descuento: this.descuento,
            img: this.img,
            proveedor: '',
            stockMinimo: this.stockMinimo
          }

          if (this.proveedor) {
            producto.proveedor = this.proveedor._id

          }


          //  console.log(marca, modelo, precio, codigo, precioBruto, cantidad);
          this._productoService.actualizarProducto(producto).subscribe(resp => {
            let recarga = {
              fecha: new Date().valueOf(),
              productoId: producto._id,
              cantidadASumar: this.cantidad - this.stock_antes_de_modificar,
              stockAnterior: this.stock_antes_de_modificar,
              marca: this.marca,
              tipo: this.modelo,
              comentario: this.comentario
            }

            // this._recargaService.crearRecarga(recarga).subscribe()

            // this._recargaService.crearRecarga(recarga)
            this.ocultarModal()
            this.notificacion.emit(resp)

          })

          //   this._crearProductoModalService.ocultarModal();

        }).catch(err => {
          Swal.fire('Error al subir la imagen', err.mensaje, 'error');
          this.ocultarModal();

        })
    } else {
      let producto = {
        _id: this.id,
        marca: this.marca,
        modelo: this.modelo,
        codigo: this.codigo,
        precio: this.precio,
        precioBruto: this.precioBruto,
        stock: this.cantidad,
        descuento: this.descuento,
        img: this.img,
        proveedor: '',
        stockMinimo: this.stockMinimo
      }

      if (this.proveedor) {
        producto.proveedor = this.proveedor._id

      }
      this._productoService.actualizarProducto(producto).subscribe(resp => {
        this.ocultarModal()
        this.notificacion.emit(resp)
        let recarga = {
          fecha: new Date().valueOf(),
          productoId: producto._id,
          cantidadASumar: this.cantidad - this.stock_antes_de_modificar,
          stockAnterior: this.stock_antes_de_modificar,
          marca: this.marca,
          tipo: this.modelo,
          comentario: this.comentario
        }
        // this._recargaService.crearRecarga(recarga).subscribe()

      })

    }


  }

  eliminarProducto() {
    this._productoService.eliminarProducto(this.id).subscribe(resp => {

      this.notificacion.emit(resp);
      this.ocultarModal()
    })
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.img = null;
      return
    }

    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Solor imagenes', "El archivo seleccionado no es una imagen", 'error')
      this.imagenSubir = null
      return
    }

    this.imagenSubir = archivo;

    //this.imagenTempFile = archivo
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSubir)
      .then((resp: any) => {

        // Swal.fire('Imagen subida correctamente','', 'success')
        this.notificacion.emit(resp);
        this.img = resp.nombreArchivo

        //   this._crearProductoModalService.ocultarModal();

      }).catch(err => {
        Swal.fire('Error al subir la imagen', err.mensaje, 'error');
        this.ocultarModal();

      })
  }

  async mostarModal(producto) {
    console.log("mostrando");
    console.log(producto);
    
    this.stocks = await this._productoService.getStocks(producto._id)
    this.id = producto._id
    this.marca = producto.marca
    this.modelo = producto.modelo
    this.cantidad = producto.stock
    this.stock_antes_de_modificar = producto.stock
    this.codigo = producto.codigo
    this.precio = producto.precio
    this.precioBruto = producto.precioBruto
    this.descuento = producto.descuento
    this.img = producto.img || ''
    this.oculto = ''
    this.imagenTemp = producto.img || '',
      this.stockMinimo = producto.stockMinimo || 0
    if (producto.proveedor) {
      console.log(producto);

      let resp: any = await this._proveedorService.getProveedor(producto.proveedor);
      this.proveedor = resp.proveedor;
    }


    // }else{
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Inicia sesion para esta accion',
    //     showConfirmButton: true
    //   });
    // }

  }

  async buscarProveedor(termino) {
    if (termino) {

      let resp: any = await this._proveedorService.buscarProveedor(termino) 
      this.proveedores = resp.proveedores; 
      if (this.proveedores.length == 1) {
        this.proveedor = this.proveedores[0]
      }
      if (this.proveedores.length == 0) {
        this.proveedores = null
        this.proveedor = null;
      }
      

    } else {
      this.proveedores = null
      this.proveedor = null;
    }

  }






}
