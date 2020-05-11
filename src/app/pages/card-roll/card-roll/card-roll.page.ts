import { Component, Input, OnInit } from '@angular/core';
import { NavParams, ActionSheetController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';

import { UserService, User } from './../../../services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CardService, Card } from 'src/app/services/card/card.service';



@Component({
  selector: 'app-card-roll',
  templateUrl: './card-roll.page.html',
  styleUrls: ['./card-roll.page.scss'],
})
export class CardRollPage implements OnInit {

  @Input() cardDataFront: string;
  @Input() cardDataBack: string;

  private users: Observable<User[]>;
  private cards: Observable<Card[]>;

  id;
  card: Card = {
    frontImg: '',
    backImg: ''
  };
  user;
  keys;

  showBlankCard;
  mobileOrientation: string;
  portraitCardView = true;

slideOpts = {
    effect: 'flip',
    direction: 'vertical',
    flipEffect: {
      rotate: 0,
      slideShadows: false,
    },
  on: {
    beforeInit() {
      const swiper = this;
      swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
      const overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: true,
      };
      swiper.params = Object.assign(swiper.params, overwriteParams);
      swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
    },
    setTranslate() {
      const swiper = this;
      const { $, slides, rtlTranslate: rtl } = swiper;
      for (let i = 0; i < slides.length; i += 1) {
        const $slideEl = slides.eq(i);
        let progress = $slideEl[0].progress;
        if (swiper.params.flipEffect.limitRotation) {
          progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        }
        const offset$$1 = $slideEl[0].swiperSlideOffset;
        const rotate = -180 * progress;
        let rotateY = rotate;
        let rotateX = 0;
        let tx = -offset$$1;
        let ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
          rotateX = -rotateY;
          rotateY = 0;
        } else if (rtl) {
          rotateY = -rotateY;
        }

         $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

         if (swiper.params.flipEffect.slideShadows) {
          // Set shadows
          let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if (shadowBefore.length === 0) {
            shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
            $slideEl.append(shadowBefore);
          }
          if (shadowAfter.length === 0) {
            shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
            $slideEl.append(shadowAfter);
          }
          if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
          if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
        }
        $slideEl
          .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
      }
    },
    setTransition(duration) {
      const swiper = this;
      const { slides, activeIndex, $wrapperEl } = swiper;
      slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
      if (swiper.params.virtualTranslate && duration !== 0) {
        let eventTriggered = false;
        // eslint-disable-next-line
        slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
          if (eventTriggered) return;
          if (!swiper || swiper.destroyed) return;

          eventTriggered = true;
          swiper.animating = false;
          const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
          for (let i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    }
  }
}

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private userService: UserService,
              private cardService: CardService, public modalController: ModalController, public navParams: NavParams, platform: Platform,
              private screenOrientation: ScreenOrientation, private gyroscope: Gyroscope) {

    platform.ready().then(() => {
    this.getScreenOrientation();
    }).catch(err => {
     console.log('Error while loading platform', err);
    });
    this.getGyroscopeData();

  }

  ngOnInit() {

    if (!this.cardDataBack) {
        this.showBlankCard;
    };
  }

  dismissModal() {
   this.modalController.dismiss({
     'dismissed': true
   });
  }

  getScreenOrientation(){
      this.mobileOrientation = this.screenOrientation.type;
      console.log('Orientation is ' + this.mobileOrientation);

      this.screenOrientation.onChange().subscribe(() => {
      this.mobileOrientation = this.screenOrientation.type;
           if (this.mobileOrientation == "portrait-primary") {
               this.portraitCardView = true;
                console.log('Orientation is ' + this.mobileOrientation);

           } else if (this.mobileOrientation == "landscape-primary") {
               this.portraitCardView = false;
               console.log('Orientation is ' + this.mobileOrientation);
           };
      });
  }

  getGyroscopeData() {
     let options: GyroscopeOptions = {
         frequency: 1000
     }

     this.gyroscope.getCurrent(options)
          .then((orientation: GyroscopeOrientation) => {
             console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
          })
     .catch()

     this.gyroscope.watch()
           .subscribe((orientation: GyroscopeOrientation) => {
              console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
           if (orientation.z > 0) {
                  this.mobileOrientation == "landscape-primary";
                  this.portraitCardView = false;
           }
     });
  }

}
