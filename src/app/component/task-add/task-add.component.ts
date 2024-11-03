import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TaskService } from '../../task.service';
import { User, UserServiceService } from '../../user-service.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent {
  taskform: FormGroup;
  user: User[] = [];

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router, private UserServiceService: UserServiceService) {
    this.taskform = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      dueDate: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      assignee: [''],
      checkLists: this.fb.array([])
    })
    this.UserServiceService.getUsers().subscribe((data) => {
      this.user = data;
    })

  }
  get mycheckLists(): FormArray {
    return this.taskform.get('checkLists') as FormArray
  }
  addcheckList(){
    this.mycheckLists.push(this.fb.control(''));
  }
  removeCheckList(index: number){
    this.mycheckLists.removeAt(index);
  }

  onSubmit() {
    let task = this.taskform.value;
    this.taskService.createTask(task).subscribe(data => {
      this.router.navigate(['/'])
    })
  }
}
