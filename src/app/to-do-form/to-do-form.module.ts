import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToDoFormComponent } from './to-do-form.component';

const routes: Routes = [
  {
    path: '',
    component: ToDoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToDoFormModule { }
