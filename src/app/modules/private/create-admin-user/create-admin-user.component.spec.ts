import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminUserComponent } from './create-admin-user.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RendererFactory2 } from '@angular/core';

describe('CreateAdminUserComponent', () => {
  let component: CreateAdminUserComponent;
  let fixture: ComponentFixture<CreateAdminUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAdminUserComponent],
      imports:[HttpClientModule,ToastrModule.forRoot(),RendererFactory2]
    });
    fixture = TestBed.createComponent(CreateAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
