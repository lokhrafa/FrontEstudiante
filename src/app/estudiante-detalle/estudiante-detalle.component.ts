import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Calificacion } from '../models/calificacion';
import { EstudianteService } from '../Services/estudiante.service';

@Component({
  selector: 'app-estudiante-detalle',
  templateUrl: './estudiante-detalle.component.html',
  styleUrls: ['./estudiante-detalle.component.css']
})
export class EstudianteDetalleComponent implements OnInit {


  formData!: Calificacion
  EsValid: boolean = true
  data: any
  materiaList = ["Lengua española", "Matemáticas","Ciencias sociales", "Ciencias naturales"]

  constructor(public dialogRef: MatDialogRef<EstudianteDetalleComponent>, public service: EstudianteService,
    @Inject(MAT_DIALOG_DATA) data: any) {
         this.data = data
     }

  ngOnInit(): void {

    if(this.data.estudianteIndex == null){
      this.formData = {

        calificacionId:0,
        estudianteid: this.data.estudianteID,
        nota: 0,
        materia: this.materiaList[0]

      }
    } else {
      this.formData = Object.assign({}, this.service.EstudianteDetalle[this.data.estudianteIndex])
    }
  }

  onSubmit(form: NgForm){

    if(this.validateForm(form.value)){

      if(this.data.estudianteIndex == null){
        this.service.EstudianteDetalle.push(form.value);
        
        this.dialogRef.close();

      } else {
        this.service.EstudianteDetalle[this.data.estudianteIndex] = form.value;
        this.dialogRef.close();
      } 
      
    } 
} 
  validateForm(formData: Calificacion) {
    this.EsValid = true;

    if(formData.nota == 0){
      this.EsValid = false
    } 

    return this.EsValid;
  }

}
