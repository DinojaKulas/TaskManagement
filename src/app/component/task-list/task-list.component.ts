import { Component,OnInit } from '@angular/core';
import { Task, TaskService } from '../../task.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  task:Task[] = [];
  searchText: string = '';


  constructor(private taskservice : TaskService, private toastr:ToastrService,private router:Router){

  }
  ngOnInit():void{
    this.taskservice.getTask().subscribe(d =>{
      this.task = d;
    })
  }
  onDelete(taskId: number) {
    if(confirm('Do you want to delete?')) {
      this.taskservice.deleteTask(taskId).subscribe(data => {
        this.toastr.success('Task is deleted', "Deleted", {
          timeOut: 10000,
          closeButton: true
        });
        this.loadTask();
      });
    }
  }
  loadTask() {
    this.taskservice.getTask().subscribe(d => {
      this.task = d;
    })
  }

  onEdit(taskId:number){
    this.router.navigate(['/edit', taskId])
  }
  

}
