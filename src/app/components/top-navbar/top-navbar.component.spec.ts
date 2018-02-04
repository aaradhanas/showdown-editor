import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';

import { TopNavbarComponent } from './top-navbar.component';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs/Rx';
import { ResponseOptions } from '@angular/http';

describe('TopNavbarComponent', () => {
  let component: TopNavbarComponent;
  let fixture: ComponentFixture<TopNavbarComponent>;
  const sampleText = 'Heading';

  const dataServiceStub = {
    versionChange: new EventEmitter(),
    isLeftVisible() {
        return false;
    },
    setLeftVisible() {

    },
    getHash() {
      return Observable.create( observer => {
        const responseOptions = new ResponseOptions();
        responseOptions.body = '# ' + sampleText;
        const response = new Response(responseOptions);
        observer.next(response);
        observer.complete();
      });
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavbarComponent ],
      providers : [ {provide: DataService, useValue: dataServiceStub} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('version display', () => {
    dataServiceStub.versionChange.emit('1.3.0');
    dataServiceStub.versionChange.subscribe( version => {
      component.version = version;
      fixture.detectChanges();

      const de = fixture.debugElement.query(By.css('.version'));
      const el: HTMLElement = de.nativeElement;
      expect(el.textContent).toContain(component.version);
    });
  });

  it('display hash text modal', () => {
    // TODO Add encode logic
    component.getHash();
    fixture.detectChanges();

    const de = fixture.debugElement.query(By.css('.modal-wrapper #dlnk'));
    const el: HTMLElement = de.nativeElement;

    expect(el.textContent).toEqual(component.hashText);
  });

  it('hide hash text modal', () => {
    component.showModal = false;
    fixture.detectChanges();

    const de = fixture.debugElement.query(By.css('app-top-navbar modal-wrapper'));
    expect(de).toBeNull();
  });

  it('toggle menu', () => {
    component.toggleMenu();
    expect(document.body.classList).toContain('squeezed-body');

    component.toggleMenu();
    expect(document.body.classList).toContain('full-body');
  });
});
