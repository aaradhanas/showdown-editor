import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DataService } from '../../services/data.service';

import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.css'],
  animations : [
    trigger('leftState', [
      state( 'visible', style({
        width: '300px',
        display: 'block'
      })),
      state('invisible', style({
        width: '0px',
        display: 'none'
      })),
      transition('visible <=> invisible', animate('0.5s ease'))
    ])
  ]
})
export class LeftNavbarComponent implements OnInit {

  state: string;
  versions = ['develop', 'master'];

  // set the current active version
  activeVersion: string;

  checkOpts = { };
  numOpts = { };
  textOpts = { };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.state = this.dataService.isLeftVisible() ? 'visible' : 'invisible';

    this.dataService.leftVisibleChange.subscribe( visible => {
      this.state = visible ? 'visible' : 'invisible';
    });

    this.dataService.getVersions().subscribe( data => {
      for (const r of Object.keys(data)) {
        this.versions.push(data[r]);
      }
      console.log('Versions : ' + this.versions);
    });

    this.activeVersion = localStorage.getItem('version') || 'develop';

    // TODO Get options based on showdown version
    const options = this.dataService.getOptions();
    this.checkOpts = options['checkOpts'];
    this.numOpts = options['numOpts'];
    this.textOpts = options['textOpts'];
  }

  onVersionChange() {
    console.log('Updated version = ' + this.activeVersion);
    localStorage.setItem('version', this.activeVersion);
    this.dataService.updateVersion(this.activeVersion);
  }

  keys(obj: Object) {
    return Object.keys(obj);
  }

  checkValueChanged() {
    localStorage.setItem('checkOpts', JSON.stringify(this.checkOpts));
    console.log('checkValueChanged = ' + JSON.stringify(this.checkOpts));
    this.dataService.updateOptions(this.checkOpts);
  }

  numValueChanged() {
    localStorage.setItem('numOpts', JSON.stringify(this.numOpts));
    console.log('numValueChanged = ' + JSON.stringify(this.numOpts));
    this.dataService.updateOptions(this.numOpts);
  }

  textValueChanged() {
    localStorage.setItem('textOpts', JSON.stringify(this.textOpts));
    console.log('textValueChanged = ' + JSON.stringify(this.textOpts));
    this.dataService.updateOptions(this.textOpts);
  }

}
