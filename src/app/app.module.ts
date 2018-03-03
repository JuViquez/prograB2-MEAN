import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { InstitucionesListComponent } from './instituciones/instituciones-list/instituciones-list.component';
import { CrearProfesorComponent } from './usuario/crear-profesor/crear-profesor.component';

const appRoutes: Routes = [
  {
    path: 'instituciones',
    component: InstitucionesListComponent,
    data: { title: 'Instituciones' }
  },
  {
    path: 'crearprofesor',
    component: CrearProfesorComponent,
    data: { title: 'Formulario para Profesores' }
  },
  { path: '',
    redirectTo: 'instituciones',
    pathMatch: 'prefix'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    InstitucionesListComponent,
    CrearProfesorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
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
