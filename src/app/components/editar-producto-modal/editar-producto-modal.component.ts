import { ProveedorService } from './../../services/proveedor.service';
import { EditarProductoModalService } from './editar-producto-modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-producto-modal',
  templateUrl: './editar-producto-modal.component.html',
  styleUrls: ['./editar-producto-modal.component.scss']
})
export class EditarProductoModalComponent implements OnInit {
 email
 proveedores
  constructor(public _editarProductoModalService: EditarProductoModalService,
    
      public _proveedorService: ProveedorService
    ) { }

  ngOnInit() {
  }
  buscarProveedor(termino) {
    if (termino) {
      this._proveedorService.buscarProveedor(termino).subscribe(proveedores => {
        
        
        this.proveedores = proveedores;
       
      })  
    }else{
     }
    
  }


  
}
