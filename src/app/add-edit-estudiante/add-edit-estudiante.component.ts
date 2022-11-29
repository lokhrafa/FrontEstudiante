import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EstudianteService } from '../Services/estudiante.service';
import { ToastrService } from 'ngx-toastr'
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EstudianteDetalleComponent } from '../estudiante-detalle/estudiante-detalle.component';

@Component({
  selector: 'app-add-edit-estudiante',
  templateUrl: './add-edit-estudiante.component.html',
  styleUrls: ['./add-edit-estudiante.component.css']
})
export class AddEditEstudianteComponent implements OnInit {

 EsValido: boolean = true;
   
  constructor(public service: EstudianteService, private dialog: MatDialog, private toastr: ToastrService,
    private router: Router, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {

    let estudianteID = this.currentRoute.firstChild?.snapshot.params['id'];
         
    if(estudianteID == null || undefined){
      this.resetForm();
    } else {
      this.service.getEstudianteID(parseInt(estudianteID)).subscribe((v) => {
        this.service.formData = v.estudiante
        this.service.EstudianteDetalle = v.estudiantedetalle
      })      
    }

  }
  resetForm(form?: NgForm) {

    if(form?.value == null || undefined){

      form?.resetForm();

   }

   this.service.formData = {
    id: 0,
    edad: 0,
    genero: '',
    nombre: ''
   }

   this.service.EstudianteDetalle = [];

  }

  AddOrEditEstudiante(estudianteIndex: any, estudianteID: any){
   
 

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose  = true;
    dialogConfig.width = "50%"; 
    dialogConfig.data = {estudianteIndex, estudianteID};
    this.dialog.open(EstudianteDetalleComponent, dialogConfig);

  }

  validateForm(){

    this.EsValido = true

    if(this.service.formData.id == null){
         this.service.formData.id = 0
    }


    if(this.service.formData.nombre == "" || this.service.formData.genero == "" || this.service.formData.edad == 0){
      this.EsValido = false
    }

    return this.EsValido;

  }

  onSubmit(form: NgForm){
    
    
    if(this.validateForm()){

      

      this.service.saveOrUpdateEstudiante().subscribe(() => {

        this.resetForm();
       
        this.router.navigate(['/estudiantes']);
        this.toastr.success('Estudiante Agregado', 'Estudiante App');
      })
    
    } else {
      this.toastr.error('Debe completar los campos del Estudiante antes de guardar.', 'Estudiante App');
    }
  }

  onDeleteEstudianteDetalle(estudiantedetalleId: any, i: number){
      
  

    if(estudiantedetalleId != null || undefined){ 
    
      var numero = Number(estudiantedetalleId);

      this.service.deleteEstudianteDetalle(numero).subscribe(() => {

        this.service.EstudianteDetalle.splice(i, 1);
      

      })

    /*   this.service.formData.deleteOrderItemIDs += orderItemID + "," */
    
    } else {
      this.service.EstudianteDetalle.splice(i, 1);
     
    }

  }
   




}
