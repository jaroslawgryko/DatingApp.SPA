import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {

  canDeactivate(component: MemberEditComponent) {
    if (component.editForm.dirty) {
        return confirm('Are you sure you want to continue? Any unsaved chandes will be lost.');
    }


    // this.alertify.error('You need to be logged in to access this area');
    // this.router.navigate(['/home']);
    return true;
  }
}
