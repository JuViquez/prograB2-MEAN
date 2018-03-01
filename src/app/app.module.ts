import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { InstitucionesListComponent } from './instituciones/instituciones-list/instituciones-list.component';

const appRoutes: Routes = [
  {
    path: 'instituciones',
    component: InstitucionesListComponent,
    data: { title: 'Instituciones' }
  },
  { path: '',
    redirectTo: 'instituciones',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    InstitucionesListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } 
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
