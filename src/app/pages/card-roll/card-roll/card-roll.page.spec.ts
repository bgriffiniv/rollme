import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardRollPage } from './card-roll.page';

describe('CardRollPage', () => {
  let component: CardRollPage;
  let fixture: ComponentFixture<CardRollPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardRollPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardRollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
