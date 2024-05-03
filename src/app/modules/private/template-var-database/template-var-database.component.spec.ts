import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateVarDatabaseComponent } from './template-var-database.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('TemplateVarDatabaseComponent', () => {
  let component: TemplateVarDatabaseComponent;
  let fixture: ComponentFixture<TemplateVarDatabaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateVarDatabaseComponent],
      imports:[HttpClientModule,ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(TemplateVarDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
