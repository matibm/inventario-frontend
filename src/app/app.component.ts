import { SessionModalService } from './components/session-modal/session-modal.service';
import { Component } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'control-stock';
  constructor(private route: Router,
    private _sessionModalService: SessionModalService){
    route.navigateByUrl('/productos')
    // if (localStorage.getItem('logged') != 'true') {
    //   _sessionModalService.mostrarModal()
    // }
  }
}
