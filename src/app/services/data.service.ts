import { Injectable, Output, EventEmitter } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';


const showdownJs = require('showdown');

@Injectable()
export class DataService {

  leftVisible = true;

  @Output()
  versionChange: EventEmitter<String> = new EventEmitter();
  optionsChange: EventEmitter<String> = new EventEmitter();
  leftVisibleChange: EventEmitter<boolean> = new EventEmitter();

  options = {
    'checkOpts' : {
      'omitExtraWLInCodeBlocks': true,
      'noHeaderId': false,
      'parseImgDimensions': true,
      'simplifiedAutoLink': true,
      'literalMidWordUnderscores': true,
      'strikethrough': true,
      'tables': true,
      'tablesHeaderId': false,
      'ghCodeBlocks': true,
      'tasklists': true,
      'smoothLivePreview': true,
      'prefixHeaderId': false,
      'disableForced4SpacesIndentedSublists': false,
      'ghCompatibleHeaderId': true,
      'smartIndentationFix': false
    },
    'numOpts' : {
      'headerLevelStart': 3
    },
    'textOpts' : {
      'prefixHeaderId' : ''
    }
  };

  constructor(private http: Http) { }

  getVersions(): Observable<string[]> {
    return this.http
      .get('https://api.github.com/repos/showdownjs/showdown/releases')
      .map( res => {
        return res.json().map( item => {
            return item.tag_name;
        });
      });
      // TODO compare versions greater than 1.0.0
  }

  getHash() {
    return this.http.get('assets/md/text.md');
  }

  getOptions() {
   const defaultOptions = showdownJs.getDefaultOptions(false);

   let savedCheckOpts;
   let savedNumOpts;
   let savedTextOpts;

   for (const opt in defaultOptions) {
    if (defaultOptions.hasOwnProperty(opt)) {
      let nOpt = (defaultOptions[opt].hasOwnProperty('defaultValue')) ? defaultOptions[opt].defaultValue : true;
      if (defaultOptions[opt].type === 'boolean') {
        if (!this.options.checkOpts.hasOwnProperty(opt)) {
          this.options.checkOpts[opt] = nOpt;
        }
      } else if (defaultOptions[opt].type === 'integer') {
        if (!this.options.numOpts.hasOwnProperty(opt)) {
          this.options.numOpts[opt] = nOpt;
        }
      } else {
        if (!this.options.textOpts.hasOwnProperty(opt)) {
          // fix bug in showdown's older version that specifies 'ghCompatibleHeaderId' as a string instead of boolean
          if (opt === 'ghCompatibleHeaderId') {
            continue;
          }
          if (!nOpt) {
            nOpt = '';
          }
          this.options.textOpts[opt] = nOpt;
        }
      }
    }
  }
  if (localStorage.getItem('checkOpts')) {
    savedCheckOpts = JSON.parse(localStorage.getItem('checkOpts'));
  }

  if (localStorage.getItem('numOpts')) {
    savedNumOpts = JSON.parse(localStorage.getItem('numOpts'));
  }

  if (localStorage.getItem('textOpts')) {
    savedTextOpts = JSON.parse(localStorage.getItem('textOpts'));
  }

  for (const opt of Object.keys(this.options.checkOpts)) {
      for (const savedOpt in savedCheckOpts) {
        if (opt === savedOpt) {
          this.options.checkOpts[opt] = savedCheckOpts[savedOpt];
        }
   }
  }

  for (const opt of Object.keys(this.options.numOpts)) {
      for (const savedOpt in savedNumOpts) {
        if (opt === savedOpt) {
          this.options.numOpts[opt] = savedNumOpts[savedOpt];
        }
    }
   }

  for (const opt of Object.keys(this.options.textOpts)) {
      for (const savedOpt in savedTextOpts) {
        if (opt === savedOpt) {
          this.options.textOpts[opt] = savedTextOpts[savedOpt];
        }
    }
   }

   return this.options;
  }

  updateOptions(opts) {
    // TODO
    this.optionsChange.emit(opts);
  }

  // This method is used for transmitting the current active version from left navbar to top navbar
  updateVersion(version) {
    this.versionChange.emit(version);
  }

  isLeftVisible() {
    return this.leftVisible;
  }

  setLeftVisible(isVisible) {
    this.leftVisible = isVisible;
    this.leftVisibleChange.emit(this.leftVisible);
  }
}
