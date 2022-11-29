import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEditEstudianteComponent } from './add-edit-estudiante/add-edit-estudiante.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { EstudianteDetalleComponent } from './estudiante-detalle/estudiante-detalle.component';
import { LandingComponent } from './landing/landing.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { AddEditAsistenciaComponent } from './add-edit-asistencia/add-edit-asistencia.component';
import { AsistenciaDetalleComponent } from './asistencia-detalle/asistencia-detalle.component';


@NgModule({
  declarations: [
    AppComponent,
    EstudiantesComponent,
    AddEditEstudianteComponent,
    EstudianteDetalleComponent,
    LandingComponent,
    AsistenciaComponent,
    AddEditAsistenciaComponent,
    AsistenciaDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CommonModule,
    MatDialogModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
