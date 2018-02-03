import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LeftNavbarComponent } from './left-navbar.component';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs/Rx';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('LeftNavbarComponent', () => {
  let component: LeftNavbarComponent;
  let fixture: ComponentFixture<LeftNavbarComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  const dataServiceStub = {
    leftVisibleChange: new EventEmitter<boolean>(),
    isLeftVisible() {
      return false;
    },
    getVersions() {
      // not necessary to populate data
       return Observable.create( observer => {
         observer.next(['1.0.0', '2.0.0']);
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
      declarations: [ LeftNavbarComponent ],
      providers : [{ provide: DataService, useValue: dataServiceStub}],
      imports : [ FormsModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('check invisible', () => {
    component.state  = 'invisible';
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.lateral-menu'));
    el = de.nativeElement;
    expect(el.style.display).toBe('none');
  });

  it('check left visible change emitter', () => {
    dataServiceStub.leftVisibleChange.emit(true);
    dataServiceStub.leftVisibleChange.subscribe(visible => {
      component.state = visible ? 'visible' : 'invisible';
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('.lateral-menu'));
      el = de.nativeElement;
      expect(el.style.display).toBe('');
    });
  });

  it('verify active version', () => {
    spyOn(component, 'onVersionChange').and.callThrough();

    de = fixture.debugElement.query(By.css('select'));
    el = de.nativeElement;
    // de.triggerEventHandler('change', {}); => Does not work !!
    el.dispatchEvent(new Event('change'));

    expect(component.onVersionChange).toHaveBeenCalled();

  });

  it('verify check opts change', () => {
    spyOn(component, 'checkValueChanged').and.callThrough();

    const key = 'omitExtraWLInCodeBlocks';
    de = fixture.debugElement.query(By.css('#checkOpts-' + key));
    el = de.nativeElement;

    // expect(element.value).toEqual('on');
    el.dispatchEvent(new Event('change'));
    expect(component.checkValueChanged).toHaveBeenCalled();
  });

  it('verify num opts change', () => {
    spyOn(component, 'numValueChanged').and.callThrough();

    de = fixture.debugElement.query(By.css('#numOpts-headerLevelStart'));
    el = de.nativeElement;
    // expect(element.value).toBe('3');

    el.dispatchEvent(new Event('input'));
    expect(component.numValueChanged).toHaveBeenCalled();
  });

  it('verify text opts change', () => {
    spyOn(component, 'textValueChanged').and.callThrough();

    de = fixture.debugElement.query(By.css('#textOpts-prefixHeaderId'));
    el = de.nativeElement;

    // TODO expect(el.textContent).toEqual('p1');
    el.dispatchEvent(new Event('input'));
    expect(component.textValueChanged).toHaveBeenCalled();
  });
});
