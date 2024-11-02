import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent implements OnInit {
  userform: FormGroup;
  isEditMode = false;
  userId: number


  constructor(private fb: FormBuilder,
    private userservice: UserServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    const uid = this.route.snapshot.paramMap.get("id");
    this.userId = Number(uid);

    this.userform = this.fb.group({
      
      name: ['', [Validators.required]],
      email: [''],
      password: [''],
      phone: ['', [Validators.required]],
      address: this.fb.group({
        addressLine1: ['', [Validators.required]],
        addressLine2: [''],
        city: ['']
      })
    })

    if (uid) {
      this.isEditMode = true;
    } else {
      this.isEditMode = false;
    }
  }

  ngOnInit(): void {
    if (this.isEditMode == true) {
      this.userservice.getUser(this.userId).subscribe(data => {

        this.userform.patchValue(data)
      }, error => {
        this.toastr.error("User is not found");
      });
    }
  }

  onSubmit() {
    let user = this.userform.value;

    if (this.isEditMode == true) {
      user.id = this.userId;
      this.userservice.updateUser(user).subscribe(data => {
        this.toastr.success("User is updated successfully");
        this.router.navigate(["/user-edit"]);
      });
    } else {
      this.userservice.createUser(user).subscribe(data => {
        this.toastr.success("User is created successfully");
        this.router.navigate(["/user-add"]);
      });
    }
  }

  cancel() {
    this.userform.reset();
    this.router.navigate(["/user"])
  }

}
