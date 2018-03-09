import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { InstitucionesListComponent } from './instituciones/instituciones-list/instituciones-list.component';
import { CrearProfesorComponent } from './usuario/crear-profesor/crear-profesor.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ListaEscuelasComponent } from './escuela/lista-escuelas/lista-escuelas.component';
import { FormEscuelaComponent } from './escuela/form-escuela/form-escuela.component';
import { LoginComponent } from './login/login.component';

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
  {
    path: 'crearescuela',
    component: FormEscuelaComponent,
  }, 
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  { path: '',
    redirectTo: 'crearprofesor',
    pathMatch: 'prefix'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    InstitucionesListComponent,
    CrearProfesorComponent,
    ListaEscuelasComponent,
    FormEscuelaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      {useHash: true}
    )
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
