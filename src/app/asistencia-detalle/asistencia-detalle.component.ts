import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Asistenciadetalle } from '../models/asistenciadetalle';
import { Estudiante } from '../models/estudiante';
import { AsistenciaService } from '../Services/asistencia.service';
import { EstudianteService } from '../Services/estudiante.service';

@Component({
  selector: 'app-asistencia-detalle',
  templateUrl: './asistencia-detalle.component.html',
  styleUrls: ['./asistencia-detalle.component.css']
})
export class AsistenciaDetalleComponent implements OnInit {

  formData!: Asistenciadetalle
  EsValid: boolean = true
  data: any
  estudianteList!: Estudiante[]

  constructor(public dialogRef: MatDialogRef<AsistenciaDetalleComponent>, public service: AsistenciaService,
    @Inject(MAT_DIALOG_DATA) data: any, public estudianteservice: EstudianteService) { 
      this.data = data

    }

  ngOnInit(): void {

    this.estudianteservice.getEstudianteList().subscribe(res => {
      this.estudianteList = res
     })

     if(this.data.asistenciaIndex == null){
      this.formData = {

        id:0,
        asistenciaid: this.data.asistenciaID,
        estudianteid: 0,
        estudiantenombre: '',
        presencia: false

      }
    } else {
      this.formData = Object.assign({}, this.service.AsistenciaDetalle[this.data.asistenciaIndex])
    } 

  }

  onSubmit(form: NgForm){

    if(this.validateForm(form.value)){

      if(this.data.asistenciaIndex == null){
        this.service.AsistenciaDetalle.push(form.value);
        
        this.dialogRef.close();

      } else {
        this.service.AsistenciaDetalle[this.data.asistenciaIndex] = form.value;
        this.dialogRef.close();
      } 
      
    } 
} 
  validateForm(formData: Asistenciadetalle) {
    this.EsValid = true;

    if(formData.estudiantenombre == ''){
      this.EsValid = false
    } 

    return this.EsValid;
  }

  updateEstudiante(ctrl: any){
    if(ctrl.selectedIndex == 0){
      this.formData.estudianteid = 0;
      this.formData.estudiantenombre = '';
    } else{
      this.formData.estudianteid = this.estudianteList[ctrl.selectedIndex - 1].id;
      this.formData.estudiantenombre = this.estudianteList[ctrl.selectedIndex -  1].nombre;
    }
   
  }

}
