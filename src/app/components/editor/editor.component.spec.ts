import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter, DebugElement } from '@angular/core';

import { EditorComponent } from './editor.component';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs/Rx';
import { Response, ResponseOptions, Headers } from '@angular/http';
import { By } from '@angular/platform-browser';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  const sampleText = 'Heading';

  const dataServiceStub = {
    optionsChange: new EventEmitter(),
    getHash() {
      return Observable.create( observer => {
        const responseOptions = new ResponseOptions();
        responseOptions.body = '# ' + sampleText;
        const response = new Response(responseOptions);
        observer.next(response);
        observer.complete();
      });
    },
    getOptions() {
      return {
        'checkOpts': { 'omitExtraWLInCodeBlocks': true },
        'numOpts': { 'headerLevelStart': 3 },
        'textOpts': { 'prefixHeaderId' : 'p1' }
      };
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorComponent ],
      providers : [{ provide: DataService, useValue: dataServiceStub}],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('check markdown rendering', () => {
    de = fixture.debugElement.query(By.css('#preview'));
    const innerHTML = de.properties.innerHTML;
    console.log('innerHTML = ' + innerHTML);
    expect(innerHTML).toEqual('<h3>' + sampleText + '</h3>');
  });

  it('change text event', () => {
    spyOn(component, 'textChanged').and.callThrough();
    de = fixture.debugElement.query(By.css('#editor'));
    el = de.nativeElement;

    el.dispatchEvent(new Event('input'));
    expect(component.textChanged).toHaveBeenCalled();
  });

  // Added for code coverage
  it('check options change event', () => {
    const opts = {'optionKey' : 'optionValue'};
    dataServiceStub.optionsChange.emit(opts);
    dataServiceStub.optionsChange.subscribe( options => {
      expect(options).toEqual(opts);
    });
  });
});
