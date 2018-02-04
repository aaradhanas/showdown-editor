import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';

import { DataService } from './services/data.service';

import { EditorComponent } from './components/editor/editor.component';
import { LeftNavbarComponent } from './components/left-navbar/left-navbar.component';
import { TextToShowdownDirective } from './text-to-showdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    TopNavbarComponent,
    EditorComponent,
    LeftNavbarComponent,
    TextToShowdownDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
