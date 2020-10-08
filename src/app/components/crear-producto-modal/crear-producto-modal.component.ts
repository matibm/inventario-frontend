import { ProveedorService } from './../../services/proveedor.service';
import { ProductoService } from './../../services/producto.service';
import Swal from 'sweetalert2';
import { SubirArchivoService } from './../../services/subir-archivo.service';
import { CrearProductoModalService } from './crear-producto-modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-producto-modal',
  templateUrl: './crear-producto-modal.component.html',
  styleUrls: ['./crear-producto-modal.component.scss']
})
export class CrearProductoModalComponent implements OnInit {
  // nombreImagen
  // imagenSubir: File;
  // imagenTemp: string | ArrayBuffer;
  // brutoIsPercent 
  // descuentoIsPercent
  // precioBrutoPorcentaje = 0;
  // descuentoPorcentaje = 0;
  // precioNormal = 0;
  // precio
  // marca = ''
  // modelo
  // codigo 
  // cantidad
  // precioBruto
  // descuento

  proveedores

  constructor(
    public _crearProductoModalService: CrearProductoModalService,
    private _subirArchivoService: SubirArchivoService,
    public _productoService: ProductoService,
    public _proveedorService: ProveedorService
  ) { }

  ngOnInit() {
    // if (localStorage.getItem('brutoIsPercent')) {
    //   if (localStorage.getItem('brutoIsPercent') == 'true') {
    //     this.brutoIsPercent = true;    
    //   }
    // }else{
    //   this.brutoIsPercent = false;
    // }
    // if (localStorage.getItem('descuentoIsPercent')) {
    //   if (localStorage.getItem('descuentoIsPercent') == 'true') {
    //     this.descuentoIsPercent = true;    
    //   }
    // }else{
    //   this.descuentoIsPercent = false;
    // }

  }
  buscarProveedor(termino) {
    if (termino) {
      this._proveedorService.buscarProveedor(termino).subscribe(proveedores => {
        
        
        this.proveedores = proveedores;
        console.log(proveedores);
        // this._crearProductoModalService.proveedor = proveedores[0]._id
      })  
    }else{
     }
    
  }










  // changePrecioNormal(value){
  //   // console.log(value);

  //   this.precioNormal = value;
  // }
  // brutoSwitch(){
  //   if (this.brutoIsPercent == false) {
  //     this.brutoIsPercent = true;
  //     localStorage.setItem('brutoIsPercent', 'true');
  //   } else{
  //     this.brutoIsPercent = false
  //     localStorage.setItem('brutoIsPercent', 'false');
  //   }
  // }
  // descuentoSwitch(){
  //   if (this.descuentoIsPercent == false) {
  //     this.descuentoIsPercent = true;
  //     localStorage.setItem('descuentoIsPercent', 'true');
  //   } else{
  //     this.descuentoIsPercent = false;
  //     localStorage.setItem('descuentoIsPercent', 'false');

  //   }
  // }
  // changeBrutoPercent(value){
  //   if (value >=0 && value <=100) {
  //     let aux = 100 - value;
  //     aux = aux/100;
  //     this.precioBrutoPorcentaje = this.precioNormal * aux;

  //   }


  // }
  // changeDescuentoPercent(value){
  //   if (value >=0 && value <=100) {
  //     let aux = 100 - value;
  //     aux = aux/100;
  //     this.descuentoPorcentaje = this.precioNormal * aux;
  //   }


  // }
  // clearInputs(){
  //   this.precio = null;
  //   this.marca = null;
  //   this.codigo = null;
  //   this.modelo = null;
  //   this.precioBruto = null;
  //   this.descuento = null;
  //   this.cantidad = null;
  // }

  // registrar(f) {
  //   // let precioBrutoAux
  //   // let descuentoAux

  //   // precioBrutoAux = ;
  //   if (this.brutoIsPercent) {
  //     f.value.precioBruto = this.precioBrutoPorcentaje;
  //   }
  //   if (this.descuentoIsPercent) {
  //     f.value.descuento = this.descuentoPorcentaje;
  //   }
  //   console.log(f.value);
  //   this.clearInputs
  //   if (this.imagenSubir) {


  //     this._subirArchivoService.subirArchivo(this.imagenSubir)
  //       .then((resp: any) => {

  //         // Swal.fire('Imagen subida correctamente','', 'success')
  //         //   this._crearProductoModalService.notificacion.emit(resp);
  //         this.nombreImagen = resp.nombreArchivo
  //         var form = document.getElementById("myFormNewProduct");
  //         function handleForm(event) { event.preventDefault(); }
  //         form.addEventListener('submit', handleForm);

  //         let producto = {
  //           marca: f.value.marca,
  //           modelo: f.value.modelo,
  //           codigo: f.value.codigo,
  //           precio: f.value.precio,
  //           precioBruto: f.value.precioBruto,
  //           descuento: f.value.descuento,
  //           stock: f.value.cantidad,
  //           img: this.nombreImagen
  //         }

  //         this._productoService.crearProducto(producto).subscribe(resp => {
  //           this._crearProductoModalService.notificacion.emit(resp)

  //           this._crearProductoModalService.ocultarModal()
  //         })

  //       }).catch(err => {
  //         Swal.fire('Error al subir la imagen', err.mensaje, 'error');
  //         this._crearProductoModalService.ocultarModal();

  //       })
  //   } else {
  //     var form = document.getElementById("myFormNewProduct");
  //     //function handleForm(event) { event.preventDefault(); }
  //     form.addEventListener('submit', this.handleForm);

  //     let producto = {
  //       marca: f.value.marca,
  //       modelo: f.value.modelo,
  //       codigo: f.value.codigo,
  //       precio: f.value.precio,
  //       precioBruto: f.value.precioBruto,
  //       descuento: f.value.descuento,
  //       stock: f.value.cantidad

  //     }

  //     this._productoService.crearProducto(producto).subscribe(resp => {
  //       this._crearProductoModalService.notificacion.emit(resp)
  //       this._crearProductoModalService.ocultarModal()
  //     })
  //   }

  // }
  // handleForm(event) { event.preventDefault(); }

  // seleccionImagen(archivo: File) {
  //   if (!archivo) {
  //     this.imagenSubir = null;
  //     return
  //   }

  //   if (archivo.type.indexOf('image') < 0) {
  //     Swal.fire('Solor imagenes', "El archivo seleccionado no es una imagen", 'error')
  //     this.imagenSubir = null
  //     return
  //   }

  //   this.imagenSubir = archivo;
  //   let reader = new FileReader();
  //   let urlImagenTemp = reader.readAsDataURL(archivo);

  //   reader.onloadend = () => this.imagenTemp = reader.result;
  // }

  // subirImagen() {
  //   this._subirArchivoService.subirArchivo(this.imagenSubir)
  //     .then((resp: any) => {

  //       // Swal.fire('Imagen subida correctamente','', 'success')
  //       this._crearProductoModalService.notificacion.emit(resp);
  //       this.nombreImagen = resp.nombreArchivo
  //       //   this._crearProductoModalService.ocultarModal();

  //     }).catch(err => {
  //       Swal.fire('Error al subir la imagen', err.mensaje, 'error');
  //       this._crearProductoModalService.ocultarModal();

  //     })
  // }


}
