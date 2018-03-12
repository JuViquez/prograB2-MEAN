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
import { FormProgramaComponent } from './escuela/form-programa/form-programa.component';
import { FormGrupoComponent } from './grupo/form-grupo/form-grupo.component';
import { FormCursoComponent } from './escuela/form-curso/form-curso.component';
import { FormTemaComponent } from './escuela/form-tema/form-tema.component';
import { NavigationBarComponent } from './navigation/navigation-bar/navigation-bar.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { FormUsuarioComponent } from './usuario/form-usuario/form-usuario.component';
import { MatriculaComponent } from './matricula/matricula/matricula.component';
import { LoginBarComponent } from './navigation/login-bar/login-bar.component';


const appRoutes: Routes = [
  {
    path: 'mantenimiento/usuario',
    component: FormUsuarioComponent,
  },
  {
    path: 'mantenimiento/grupo',
    component: FormGrupoComponent,
    data: { title: 'Crear Grupo' }
  },
  {
    path: 'mantenimiento/institucion',
    component: InstitucionesListComponent,
    data: { title: 'Instituciones' }
  },
  {
    path: 'registro/profesor',
    component: CrearProfesorComponent
  },
  {
    path: 'registro/estudiante',
    component: CrearUsuarioComponent
  },
  {
    path: 'mantenimiento/escuela',
    component: FormEscuelaComponent,
  }, 
  {
    path: 'mantenimiento/programa',
    component: FormProgramaComponent,
  }, 
  {
    path: 'mantenimiento/curso',
    component: FormCursoComponent,
  }, 
  {
    path: 'mantenimiento/tema',
    component: FormTemaComponent,
  },
  {
    path: 'matricula',
    component: MatriculaComponent,
  },  
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    InstitucionesListComponent,
    CrearProfesorComponent,
    ListaEscuelasComponent,
    FormEscuelaComponent,
    LoginComponent,
    FormProgramaComponent,
    FormGrupoComponent,
    FormCursoComponent,
    FormTemaComponent,
    NavigationBarComponent,
    CrearUsuarioComponent,
    FormUsuarioComponent,
    MatriculaComponent,
    LoginBarComponent
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
