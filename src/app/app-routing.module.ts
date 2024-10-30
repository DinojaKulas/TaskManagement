import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskAddComponent } from './component/task-add/task-add.component';
import { TaskListComponent } from './component/task-list/task-list.component';
import { TaskEditComponent } from './component/task-edit/task-edit.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {path:'Tasks',component:TaskListComponent},
  {path:'users',component:UserListComponent},

  {path:'add',component:TaskAddComponent},  
  {path:'user-add',component:UserAddComponent},

  {path:'edit/:id',component:TaskEditComponent},
  {path:'user-edit/:id',component:UserAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
