import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDaoComponent } from './template-dao.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('TemplateDaoComponent', () => {
  let component: TemplateDaoComponent;
  let fixture: ComponentFixture<TemplateDaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateDaoComponent],
      imports:[HttpClientModule,ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(TemplateDaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
