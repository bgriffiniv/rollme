import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardSelectPage } from './card-select.page';

describe('CardSelectPage', () => {
  let component: CardSelectPage;
  let fixture: ComponentFixture<CardSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardSelectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
