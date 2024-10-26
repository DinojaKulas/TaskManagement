import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private http: HttpClient) { }
  getTask() {
    return this.http.get<any[]>('http://localhost:5062/api/TaskItems');
  }
  createTask(task: any) {
    return this.http.post('http://localhost:5062/api/TaskItems', task);
  }
  deleteTask(taskid: number){
    return this.http.delete('http://localhost:5062/api/TaskItems/' + taskid);
  }
  updateTask(task:Task){
    return this .http.put('http://localhost:5062/api/TaskItems/' + task.id, task);

  }
  getTasks(taskId: number){
    return this.http.get<Task>('http://localhost:5062/api/TaskItems/' + taskId);
  }
}
export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
}