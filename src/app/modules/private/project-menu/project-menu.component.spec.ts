import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMenuComponent } from './project-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('ProjectMenuComponent', () => {
  let component: ProjectMenuComponent;
  let fixture: ComponentFixture<ProjectMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectMenuComponent],
      imports:[HttpClientModule,ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(ProjectMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
