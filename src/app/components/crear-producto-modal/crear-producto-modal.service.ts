import { SubirArchivoService } from './../../services/subir-archivo.service';
import { ProductoService } from './../../services/producto.service';
import { Injectable, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';


@Injectable({
  providedIn: 'root'
})
export class CrearProductoModalService {
  proveedor
  nombreImagen
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  brutoIsPercent 
  descuentoIsPercent
  precioBrutoPorcentaje = 0;
  descuentoPorcentaje = 0;
  precioNormal = 0;
  precio
  marca = ''
  modelo
  codigo 
  cantidad
  precioBruto
  descuento
  stockMinimo = 0
  proveedores
  proveedorFijado

  public notificacion = new EventEmitter<any>();

  oculto = 'oculto'
  constructor(
    private _subirArchivoService: SubirArchivoService,
    private _productoService: ProductoService
  ) { 
    
    this.proveedorFijado = JSON.parse(localStorage.getItem('proveedorFijado'))
    if (this.proveedorFijado) {
        this.proveedor = this.proveedorFijado
    }
    if (localStorage.getItem('brutoIsPercent')) {
      if (localStorage.getItem('brutoIsPercent') == 'true') {
        this.brutoIsPercent = true;    
      }
    }else{
      this.brutoIsPercent = false;
    }
    if (localStorage.getItem('descuentoIsPercent')) {
      if (localStorage.getItem('descuentoIsPercent') == 'true') {
        this.descuentoIsPercent = true;    
      }
    }else{
      this.descuentoIsPercent = false;
    }
  }

  ocultarModal(){
    this.oculto = 'oculto'
  }
  mostrarModal(){
    this.oculto = ''
  }
  changePrecioNormal(value){
    // console.log(value);
    
    this.precioNormal = value;
  }
  brutoSwitch(){
    if (this.brutoIsPercent == false) {
      this.brutoIsPercent = true;
      localStorage.setItem('brutoIsPercent', 'true');
    } else{
      this.brutoIsPercent = false
      localStorage.setItem('brutoIsPercent', 'false');
    }
  }
  descuentoSwitch(){
    if (this.descuentoIsPercent == false) {
      this.descuentoIsPercent = true;
      localStorage.setItem('descuentoIsPercent', 'true');
    } else{
      this.descuentoIsPercent = false;
      localStorage.setItem('descuentoIsPercent', 'false');

    }
  }
  changeBrutoPercent(value){
    if (value >=0 && value <=100) {
      let aux = 100 - value;
      aux = aux/100;
      this.precioBrutoPorcentaje = this.precioNormal * aux;

    }
    
    
  }
  changeDescuentoPercent(value){
    if (value >=0 && value <=100) {
      let aux = 100 - value;
      aux = aux/100;
      this.descuentoPorcentaje = this.precioNormal * aux;
    }
    
    
  }
  clearInputs(){
    this.precio = null;
    this.marca = null;
    this.codigo = null;
    this.modelo = null;
    this.precioBruto = null;
    this.descuento = null;
    this.cantidad = null;
    this.stockMinimo = 0;
 
  }

  registrar(f) {
    // let precioBrutoAux
    // let descuentoAux
    
    // precioBrutoAux = ;
    if (this.brutoIsPercent) {
      f.value.precioBruto = this.precioBrutoPorcentaje;
    }
    if (this.descuentoIsPercent) {
      f.value.descuento = this.descuentoPorcentaje;
    }
    // console.log(f.value);
    this.clearInputs();
    if (this.imagenSubir) {


      this._subirArchivoService.subirArchivo(this.imagenSubir)
        .then((resp: any) => {

          // Swal.fire('Imagen subida correctamente','', 'success')
          //   this._crearProductoModalService.notificacion.emit(resp);
          this.nombreImagen = resp.nombreArchivo
          var form = document.getElementById("myFormNewProduct");
          function handleForm(event) { event.preventDefault(); }
          form.addEventListener('submit', handleForm);
          
          let producto = {
            marca: f.value.marca,
            modelo: f.value.modelo,
            codigo: f.value.codigo,
            precio: f.value.precio,
            precioBruto: f.value.precioBruto,
            descuento: f.value.descuento,
            stock: f.value.cantidad,
            img: this.nombreImagen,
            proveedor : '',
            stockMinimo: f.value.stockMinimo


          }
          if (this.proveedor) {
            producto.proveedor = this.proveedor._id
    
          }
          

          this._productoService.crearProducto(producto).subscribe(resp => {
            this.notificacion.emit(resp)

            this.ocultarModal()
          })

        }).catch(err => {
          Swal.fire('Error al subir la imagen', err.mensaje, 'error');
          this.ocultarModal();

        })
    } else {
      var form = document.getElementById("myFormNewProduct");
      //function handleForm(event) { event.preventDefault(); }
      form.addEventListener('submit', this.handleForm);
      console.log(this.proveedor);
      if(this.proveedor){
        
      }
      console.log(this.stockMinimo);
      
      let producto = {
        marca: f.value.marca,
        modelo: f.value.modelo,
        codigo: f.value.codigo,
        precio: f.value.precio,
        precioBruto: f.value.precioBruto,
        descuento: f.value.descuento,
        stock: f.value.cantidad,
        proveedor : '',
        stockMinimo: f.value.stockMinimo
      }


      if (this.proveedor) {
        producto.proveedor = this.proveedor._id

      }
      console.log(producto);
      
      this._productoService.crearProducto(producto).subscribe(resp => {
        this.notificacion.emit(resp)
        this.ocultarModal()
      })
    }

  }
  handleForm(event) { event.preventDefault(); }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return
    }

    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Solor imagenes', "El archivo seleccionado no es una imagen", 'error')
      this.imagenSubir = null
      return
    }

    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSubir)
      .then((resp: any) => {

        // Swal.fire('Imagen subida correctamente','', 'success')
        this.notificacion.emit(resp);
        this.nombreImagen = resp.nombreArchivo
        //   this._crearProductoModalService.ocultarModal();

      }).catch(err => {
        Swal.fire('Error al subir la imagen', err.mensaje, 'error');
        this.ocultarModal();

      })
  }


  fijar(proveedor){
    this.proveedorFijado = proveedor
    proveedor = JSON.stringify(proveedor)
    localStorage.setItem('proveedorFijado', proveedor)
  }

  desfijar(){
    localStorage.removeItem('proveedorFijado')
    this.proveedor = null;     
    this.proveedores = null;
    this.proveedorFijado = null;
  }

  
}
