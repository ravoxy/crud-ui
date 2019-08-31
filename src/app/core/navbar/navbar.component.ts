import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';

import {ErrorHandlerService} from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;

  constructor(
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }
}
