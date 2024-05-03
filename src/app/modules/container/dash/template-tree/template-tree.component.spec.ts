import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTreeComponent } from './template-tree.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('TemplateTreeComponent', () => {
  let component: TemplateTreeComponent;
  let fixture: ComponentFixture<TemplateTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateTreeComponent],
      imports:[HttpClientModule,ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(TemplateTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
