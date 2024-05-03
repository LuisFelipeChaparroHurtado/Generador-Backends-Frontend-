import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateIndexComponent } from './template-index.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('TemplateIndexComponent', () => {
  let component: TemplateIndexComponent;
  let fixture: ComponentFixture<TemplateIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateIndexComponent],
      imports:[HttpClientModule,ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(TemplateIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
