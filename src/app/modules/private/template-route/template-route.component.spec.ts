import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateRouteComponent } from './template-route.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('TemplateRouteComponent', () => {
  let component: TemplateRouteComponent;
  let fixture: ComponentFixture<TemplateRouteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateRouteComponent],
      imports:[HttpClientModule,ToastrModule.forRoot(),RouterTestingModule]
    });
    fixture = TestBed.createComponent(TemplateRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
