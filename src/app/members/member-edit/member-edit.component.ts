import { AuthService } from './../../_services/auth.service';
import { AlertifyService } from './../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/User';
import { NgForm } from '@angular/forms';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm') editForm: NgForm;
  photoUrl: string;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private userSevice: UserService,
    private authSevice: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.authSevice.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser() {
    this.userSevice.updateUser(this.authSevice.decodedToken.nameid, this.user)
      .subscribe(next => {
        this.editForm.reset(this.user);
      }, error => {
        this.alertify.error(error);
      });
    this.alertify.success('Profile update successfully');
    this.editForm.reset(this.user);
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}
