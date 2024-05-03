import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateHeaderComponent } from './template-header.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

describe('TemplateHeaderComponent', () => {
  let component: TemplateHeaderComponent;
  let fixture: ComponentFixture<TemplateHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateHeaderComponent],
      imports:[HttpClientModule,ToastrModule.forRoot(),RouterModule]
    });
    fixture = TestBed.createComponent(TemplateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
