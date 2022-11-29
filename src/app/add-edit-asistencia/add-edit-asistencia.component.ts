import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AsistenciaDetalleComponent } from '../asistencia-detalle/asistencia-detalle.component';
import { AsistenciaService } from '../Services/asistencia.service';

@Component({
  selector: 'app-add-edit-asistencia',
  templateUrl: './add-edit-asistencia.component.html',
  styleUrls: ['./add-edit-asistencia.component.css']
})
export class AddEditAsistenciaComponent implements OnInit {

  EsValido: boolean = true;

  constructor(public service: AsistenciaService, private dialog: MatDialog, private toastr: ToastrService,
    private router: Router, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    let asistenciaID = this.currentRoute.firstChild?.snapshot.params['id'];
         
    if(asistenciaID == null || undefined){
      this.resetForm();
    } else {
      this.service.getAsistenciaID(parseInt(asistenciaID)).subscribe((v) => {
        this.service.formData = {
           id: v.asistencia.id,
           fecha: v.asistencia.fecha.slice(0, 10),
          presentes: v.asistencia.presentes,
          ausentes: v.asistencia.ausentes
           

        }
        this.service.AsistenciaDetalle = v.asistenciadetalle

        console.log(this.service.formData);
      })      
    }
  }


  resetForm(form?: NgForm) {

    if(form?.value == null || undefined){

      form?.resetForm();

   }

   this.service.formData = {
    id: 0, 
    presentes:  0,
    ausentes: 0,
    fecha: new Date().toISOString().slice(0, 10)
   }

   this.service.AsistenciaDetalle = [];

  }

  AddOrEditAsistencia(asistenciaIndex: any, asistenciaID: any){
   
 

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose  = true;
    dialogConfig.width = "50%"; 
    dialogConfig.data = {asistenciaIndex, asistenciaID};
    this.dialog.open(AsistenciaDetalleComponent, dialogConfig).afterClosed().subscribe({
      next: () => this.updatePresencia()
    })

  }
  updatePresencia(): void {
  
    this.service.formData.presentes =  this.service.AsistenciaDetalle.filter((obj) => obj.presencia === true).length;

    this.service.formData.ausentes =  this.service.AsistenciaDetalle.filter((obj) => obj.presencia === false).length;
  }

  validateForm(){

    this.EsValido = true

    if(this.service.formData.id == null){
         this.service.formData.id = 0
    }

   if(this.service.AsistenciaDetalle.length == 0){
      this.EsValido = false;

    }

    return this.EsValido;

  }

  onSubmit(form: NgForm){
    
    
    if(this.validateForm()){

      

      this.service.saveOrUpdateAsistencia().subscribe(() => {

        this.resetForm();
       
        this.router.navigate(['/asistencias']);
        this.toastr.success('Asistencia Agregada', 'Estudiante App');
      })
    
    } else {
      this.toastr.error('Debe agregar una asistencia antes de guardar.', 'Estudiante App');
    }
  }

  
  onDeleteAsistenciaDetalle(asistenciadetalleId: any, i: number){
      
  

    if(asistenciadetalleId != null || undefined){ 
    
      var numero = Number(asistenciadetalleId);

      this.service.deleteAsistenciaDetalle(numero).subscribe(() => {

        this.service.AsistenciaDetalle.splice(i, 1);

        this.updatePresencia();
      

      })
    
    } else {
      this.service.AsistenciaDetalle.splice(i, 1);
      this.updatePresencia();
     
    }

  }



}
