import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateModelsComponent } from './template-models.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('TemplateModelsComponent', () => {
  let component: TemplateModelsComponent;
  let fixture: ComponentFixture<TemplateModelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateModelsComponent],
      imports:[HttpClientModule,ToastrModule.forRoot(),RouterTestingModule]
    });
    fixture = TestBed.createComponent(TemplateModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
