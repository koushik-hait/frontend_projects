import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// ToastrModule
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { IconComponent } from './components/icon/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    IconComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
