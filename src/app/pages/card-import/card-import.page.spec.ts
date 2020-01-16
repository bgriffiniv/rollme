import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardImportPage } from './card-import.page';

describe('CardImportPage', () => {
  let component: CardImportPage;
  let fixture: ComponentFixture<CardImportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardImportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardImportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
