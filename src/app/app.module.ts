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
import { AsistenciaComponent } from './grupo/asistencia/asistencia/asistencia.component';
import { ForoComponent } from './grupo/foro/foro.component';
import { TopicComponent } from './grupo/topic/topic.component';
import { DataService } from './services/data.service';
import { CalificacionComponent } from './evaluaciones/calificacion/calificacion.component';
import { TablaCalificacionesComponent } from './evaluaciones/tabla-calificaciones/tabla-calificaciones.component';
import { FormEvaluacionesComponent } from './evaluaciones/form-evaluaciones/form-evaluaciones.component';
import { MisMensajesComponent } from './usuario/mis-mensajes/mis-mensajes.component';
import { MallaCurricularComponent } from './usuario/malla-curricular/malla-curricular.component';
import { HomeGrupoComponent } from './navigation/home-grupo/home-grupo.component';
import { GrupoBarComponent } from './navigation/grupo-bar/grupo-bar.component';


const appRoutes: Routes = [
  {
    path:'mensajes',
    component : MisMensajesComponent
  },
  {
    path:'grupo/home',
    component : HomeGrupoComponent
  },
  {
    path:'malla-curricular',
    component : MallaCurricularComponent
  },
  {
    path:'grupo/evaluaciones/tabla',
    component : TablaCalificacionesComponent
  },
  {
    path: 'grupo/evaluaciones/calificar',
    component: CalificacionComponent,
  },
  {
    path: 'grupo/evaluaciones',
    component: FormEvaluacionesComponent,
  },
  {
    path: 'grupo/asistencia',
    component: AsistenciaComponent,
  },
  {
    path: 'grupo/topic/:id',
    component: TopicComponent,
  },
  {
    path: 'grupo/foro',
    component: ForoComponent,
  },
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
    LoginBarComponent,
    AsistenciaComponent,
    ForoComponent,
    TopicComponent,
    FormEvaluacionesComponent,
    ForoComponent,
    TopicComponent,
    CalificacionComponent,
    TablaCalificacionesComponent,
    MisMensajesComponent,
    MallaCurricularComponent,
    HomeGrupoComponent,
    GrupoBarComponent
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
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
              DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
