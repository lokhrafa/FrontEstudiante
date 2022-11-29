import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Asistencia } from '../models/asistencia';
import { AsistenciaService } from '../Services/asistencia.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  asistencialist!: Asistencia[]

  constructor(private service: AsistenciaService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.service.getAsistenciaList().subscribe(res => {
 
     this.asistencialist = res;
 
    
 
    })
      
   }
 
   openForEdit(asistenciaId: number){
     this.router.navigate(['/add-edit-asistencia/edit/' + asistenciaId]);
   }
 
   DeleteAsistencia(id: number){
     if(confirm('¿Estas seguro de eliminar este estudiante?')){
       this.service.deleteAsistencia(id).subscribe(res => {
         this.refreshList();
         this.toastr.warning("Asistencia Eliminada", "Estudiante App");
       })
     }
   }
 

}
