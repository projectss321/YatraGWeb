import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagepackageComponent } from './managepackage.component';

describe('ManagepackageComponent', () => {
  let component: ManagepackageComponent;
  let fixture: ComponentFixture<ManagepackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagepackageComponent]
    });
    fixture = TestBed.createComponent(ManagepackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
