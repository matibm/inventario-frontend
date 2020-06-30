import { ClienteService } from './../../services/cliente.service';
import { ProductoService } from './../../services/producto.service';
import { ImprimirFacturaService } from 'src/app/components/imprimir-factura/imprimir-factura.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteModalService {
  oculto = 'oculto'
  cliente = {
    ci: '',
    // ruc: '',
    nombre: '',
    _id: ''

  }
  clientes = new Array
  tablaBoolean = false;
  factura
  imprimir = false;
  constructor(
    private _clienteService: ClienteService
  ) {
    this.tablaBoolean = JSON.parse(localStorage.getItem('tablaBoolean')) || false;
  }

  ocultarModal() {
    this.oculto = 'oculto'
  }

  buscarCliente(termino: string) {
    
    if (termino.length <= 0) {
      // this.cargarProductos();
      return;
    }

    this._clienteService.buscarClientes(termino).subscribe(resp =>{
      this.clientes = resp
    })
  }

  mostrarTabla() {
    this.cliente.nombre = ''
    this.cliente.ci = ''
    this.cliente._id = ''
    this.tablaBoolean = true;
    localStorage.setItem('mostarTabla', 'false');
    console.log("Mostar tabla");
    
    this._clienteService.getClientes().subscribe((resp :any)=>{
      console.log(resp);
      
      this.clientes = resp.clientes;
    })
  }

  seleccionarCliente(cliente){
    console.log(cliente);
    this.cliente =cliente;
    this.ocultarModal()
  }

  agregarCliente(){
    let cliente = {
      nombre: this.cliente.nombre,
      ci: this.cliente.ci
      // ruc: this.cliente.ruc
    }
    this._clienteService.crearCliente(cliente).subscribe((cliente:any )=>{
      this.cliente = cliente
    })
    this.ocultarModal()
  }

  ocultarTabla() {

    this.cliente.nombre = ''
    this.cliente.ci = ''
    this.cliente._id = ''

    this.tablaBoolean = false;
    localStorage.setItem('mostarTabla', 'true');
  }

  guardar() {

    console.log(this.cliente)
    if (this.cliente.ci || this.cliente.nombre) {
      this.imprimir = true;
    }
    this.ocultarModal();

    // this._productosService.oculto = 'oculto';
    // this._imprimiFacturaService.mostrarFactura(this.cliente, this.factura)


  }

}
