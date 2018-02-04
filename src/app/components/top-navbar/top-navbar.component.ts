import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  showModal = false;
  leftVisible: boolean;
  version: string;
  hashText: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.leftVisible = this.dataService.isLeftVisible();
    this.version = localStorage.getItem('version') || 'develop';
    this.dataService.versionChange.subscribe( version => {
      this.version = localStorage.getItem('version') || 'develop';
    });
  }

  getHash() {
    this.dataService.getHash()
    .subscribe(res => {
      const text = res.text();
      this.hashText = document.location.origin + document.location.pathname + '#/' + encodeURIComponent(text);
      this.showModal = true;
    });
  }

  toggleMenu() {
    this.leftVisible = ! this.leftVisible;
    console.log('this.leftVisible = ' + this.leftVisible);

    if ( this.leftVisible ) {
      document.body.classList.remove('full-body');
      document.body.classList.add('squeezed-body');
    }else {
      document.body.classList.remove('squeezed-body');
      document.body.classList.add('full-body');
    }

    this.dataService.setLeftVisible(this.leftVisible);
  }

}
