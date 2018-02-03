import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

import 'showdown';

const showdownJs = require('showdown');
const converter = new showdownJs.Converter();

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  text: string;
  cText: string;
  options =  {};

  constructor(private dataService: DataService) {
    console.log('this.text = ' + this.text);
  }

  ngOnInit() {
    this.getText();
    this.options = this.dataService.getOptions();

    for (const optType of Object.keys(this.options)){
      const typeOpts = this.options[optType];
      for (const opt of Object.keys(typeOpts)) {
        converter.setOption(opt, typeOpts[opt]);
      }
    }

    this.dataService.optionsChange.subscribe( opts => {
      for (const opt of Object.keys(opts)){
        converter.setOption(opt, opts[opt]);
      }
      this.cText = converter.makeHtml(this.text);
    });
  }

  getText() {
    this.dataService.getHash()
    .subscribe(res => {
      this.text = res.text();
      this.cText = converter.makeHtml(this.text);
    });
  }

  textChanged() {
    console.log('textChanged');
    this.cText = converter.makeHtml(this.text);
  }
}
