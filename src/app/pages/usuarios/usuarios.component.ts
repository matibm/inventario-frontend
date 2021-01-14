import { FacturaModalService } from './../../components/factura-modal/factura-modal.service';
import { FacturaService } from './../../services/factura.service';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  editando = false;
  usuarios
  creandoUsuario = false;
  mostrarVentas = false;
  usuario = {
    role: '',
    nombre: '',
    email: '',
    _id: ''
  }
  total = 0;
  totalCosto = 0;
  totalDescuento = 0;

  hoy: Date
  diaDesde: number
  mesDesde
  yearDesde
  productosVendidos
  semanaDesde: Date
  diaHasta
  hasta
  mesHasta
  yearHasta
  seccion = 'usuarios'
  btnAdmin = 'btn-secondary'
  btnNormal = 'btn-secondary'
  roleDefault = 'USER_ROLE';
  facturas

  dateDesde: Date
  dateHasta: Date = new Date();
  ventasSemanales
  fechasSemanales
  ventasDiarias
  fechasDiarias
  diaVentaSemanal
  mesVentaSemanal
  yearVentaSemanal
  diaVentaDiaria
  mesVentaDiaria
  infoSemanal
  diariasBoolean = false;
  yearVentaDiaria
  ocultar = false;
  recargas


  constructor(
    public _usuarioService: UsuarioService,
    public _facturaService: FacturaService,
    public _facturaModalService: FacturaModalService
  ) { }

  async ngOnInit() {
    this.setFechas()
    this.usuarios = await this._usuarioService.getUsers()
    this._facturaModalService.guardado.subscribe(() => {
      this.sumarMontos(this.facturas)
    })
  }

  claseRol(rol) {
    if (rol == 'ADMIN_ROLE') {
      this.btnAdmin = 'btn-primary'
      this.btnNormal = 'btn-secondary'
    } else {
      this.btnNormal = 'btn-primary'
      this.btnAdmin = 'btn-secondary'
    }
  }

  switchRole(isadmin) {
    if (isadmin == true) {
      this.roleDefault = "ADMIN_ROLE"
      this.usuario.role = "ADMIN_ROLE"
    } else {
      this.usuario.role = "USER_ROLE"
      this.roleDefault = "USER_ROLE"
    }
    console.log(this.usuario);

    this.claseRol(this.usuario.role)
  }

  async nuevoUsuario(nombre, email, pass) {
    let user = {
      nombre: nombre,
      email: email,
      password: pass,
      role: this.roleDefault
    }
    await this._usuarioService.newUser(user);
    this.usuarios = await this._usuarioService.getUsers()

    this.creandoUsuario = false;
  }

  async guardarUsuario() {
    await this._usuarioService.updateUser(this.usuario);
    this.usuarios = await this._usuarioService.getUsers()

    this.editando =false;
    

  }

  async getFacturas(idUsuario) {
    console.log(this.dateDesde);
    console.log(this.dateHasta);
    
    this.facturas = await this._facturaService.getFacturasPorUsuario(idUsuario, this.dateDesde.valueOf(), this.dateHasta.valueOf());
    this.sumarMontos(this.facturas)
  }

  sumarMontos(facturas) {
    let monto = 0
    let costo = 0
    let descuento = 0
    for (let i = 0; i < facturas.length; i++) {
      const element = facturas[i];
      monto += element.monto
      costo += element.costo
      // descuento += ((monto * element.descuento) / 100);

      for (let j = 0; j < element.productos.length; j++) {
        const producto = element.productos[j];
        console.log(producto.precio);
        console.log(producto.comision);
        
        descuento += ((producto.precio * producto.comision) / 100)
        console.log(descuento);
        
      }

    }




    this.total = monto
    this.totalCosto = costo
    this.totalDescuento = descuento;
  }

  verFacturaModal(factura) {
    localStorage.setItem('factura', factura)
    this._facturaModalService.mostrarModal(factura, true, true)
  }

  modificarDescuento(descuento, monto) {
    // if (descuento > 0 ) {
    //   let aux = ((monto * descuento) / 100) - ((monto * 10) / 100)
    //   this.totalDescuento += aux      
    // }else{

    // }
    if (descuento > 0) {
      this.sumarMontos(this.facturas)

    }

  }


  setFechas() {
    this.dateDesde = new Date()
    this.hoy = new Date()

    this.semanaDesde = new Date(this.dateDesde.setFullYear(this.dateDesde.getFullYear(), this.dateDesde.getMonth(), this.dateDesde.getDate().valueOf() - 7))
    this.dateDesde = this.semanaDesde;

    this.dateDesde.setUTCHours(0, 0, 0);
    this.dateHasta.setUTCHours(23, 59, 0);

    this.diaDesde = this.dateDesde.getDate();
    this.mesDesde = this.dateDesde.getMonth() + 1;
    this.yearDesde = this.dateDesde.getFullYear();

    this.diaHasta = this.hoy.getUTCDate();
    this.mesHasta = this.hoy.getUTCMonth() + 1;
    this.yearHasta = this.hoy.getUTCFullYear();

    this.diaVentaSemanal = this.diaHasta;
    this.mesVentaSemanal = this.mesHasta;
    this.yearVentaSemanal = this.yearHasta;

    this.diaVentaDiaria = this.diaHasta;
    this.mesVentaDiaria = this.mesHasta;
    this.yearVentaDiaria = this.yearHasta;


  }

  filtrar() {
    let date = new Date();
    let desde = new Date(date.setUTCFullYear(this.yearDesde, this.mesDesde - 1, this.diaDesde));
    desde.setUTCHours(0, 0, 0)

    date = new Date();
    let hasta = new Date(date.setUTCFullYear(this.yearHasta, this.mesHasta - 1, this.diaHasta));
    hasta.setUTCHours(23, 59, 59)
    this.dateDesde = desde
    this.dateHasta = hasta
     this.getFacturas(this.usuario._id)
  }

}

