import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveProduitComponent } from './remove-produit.component';

describe('RemoveProduitComponent', () => {
  let component: RemoveProduitComponent;
  let fixture: ComponentFixture<RemoveProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
