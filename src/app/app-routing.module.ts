import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditAsistenciaComponent } from './add-edit-asistencia/add-edit-asistencia.component';
import { AddEditEstudianteComponent } from './add-edit-estudiante/add-edit-estudiante.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component: LandingComponent},
  {path:'estudiantes', component:EstudiantesComponent},
  {path: 'add-edit-estudiante', component:AddEditEstudianteComponent, children:[{path:'edit/:id', component:AddEditEstudianteComponent}]},
  {path:'asistencias', component:AsistenciaComponent},
  {path:'add-edit-asistencia', component:AddEditAsistenciaComponent, children:[{path:'edit/:id', component:AddEditAsistenciaComponent}]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
