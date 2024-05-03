import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminUserComponent } from './update-admin-user.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('UpdateAdminUserComponent', () => {
  let component: UpdateAdminUserComponent;
  let fixture: ComponentFixture<UpdateAdminUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAdminUserComponent],
      imports:[HttpClientModule,ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(UpdateAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
