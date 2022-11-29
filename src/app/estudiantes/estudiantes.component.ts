import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from '../models/estudiante';
import { EstudianteService } from '../Services/estudiante.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {
  
  estudiantelist!: Estudiante[]

  constructor(private service: EstudianteService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.refreshList();

  }
  applyFilter(event: Event){


     const filterValue = (event.target as HTMLInputElement).value;

     if(filterValue.trim().toLowerCase() != ""){

      var buscar =  this.estudiantelist.filter(x => 
        x.nombre.trim().toLowerCase().match(filterValue.trim().toLowerCase()))
  
        this.estudiantelist = buscar

     } else {
         this.refreshList()
     }
    
      
      
}

  refreshList() {
   this.service.getEstudianteList().subscribe(res => {

    this.estudiantelist = res;

   

   })
     
  }

  openForEdit(estudianteId: number){
    this.router.navigate(['/add-edit-estudiante/edit/' + estudianteId]);
  }

  DeleteEstudiante(id: number){
    if(confirm('¿Estas seguro de eliminar este estudiante?')){
      this.service.deleteEstudiante(id).subscribe(res => {
        this.refreshList();
        this.toastr.warning("Estudiante Eliminado", "Estudiante App");
      })
    }
  }

}
