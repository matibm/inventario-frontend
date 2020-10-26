import { ProveedorModalService } from './proveedor-modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-proveedor-modal',
  templateUrl: './editar-proveedor-modal.component.html',
  styleUrls: ['./editar-proveedor-modal.component.scss']
})
export class EditarProveedorModalComponent implements OnInit {

  constructor(
    public _editarproveedorModalService: ProveedorModalService
  ) { }

  ngOnInit() {
  }

}
