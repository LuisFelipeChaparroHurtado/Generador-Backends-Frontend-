import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateControllerComponent } from './template-controller.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('TemplateControllerComponent', () => {
  let component: TemplateControllerComponent;
  let fixture: ComponentFixture<TemplateControllerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateControllerComponent],
      imports:[HttpClientModule,ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(TemplateControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
