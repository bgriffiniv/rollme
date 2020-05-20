import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { UserService, User } from './../../../services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CardService, Card } from 'src/app/services/card/card.service';

import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private users: Observable<User[]>;
  private cards: Observable<Card[]>;

  id;
  card: Card = {
    frontImg: '',
    backImg: ''
  };
  user;
  keys;

  frontImg: string;
  isFrontCaptured = false;
  portraitCardView;

  cameraOptions: CameraOptions = {
    // Some common settings are 20, 50, and 100
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true,
    correctOrientation: true,
    targetWidth: 658.5,
    targetHeight: 374
  }

  slideOpts = {
     scrollbar: {el: ''},
     effect: 'coverflow',
     direction: 'vertical',
     setWrapperSize: true,
     loop: true,
     loopedSlides: 1,
     centeredSlides: true,
     slidesPerView: 3,
     coverflowEffect: {
       rotate: 25,
       stretch: 450,
       depth: 225,
       modifier: 1,
       slideShadows: false
     },
          freeMode: true,
          freeModeSticky: false,
          freeModeMomentum: true,
          freeModeMomentumRatio: 1,
          freeModeMomentumVelocityRatio: 1,
        on: {
          beforeInit() {
            const swiper = this;

            swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
            swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

            swiper.params.watchSlidesProgress = true;
            swiper.originalParams.watchSlidesProgress = true;
          },
          setTranslate() {
            const swiper = this;
            const {
              width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
            } = swiper;
            const params = swiper.params.coverflowEffect;
            const isHorizontal = swiper.isHorizontal();
            const transform$$1 = swiper.translate;
            const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
            const rotate = isHorizontal ? params.rotate : -params.rotate;
            const translate = params.depth;
            // Each slide offset from center
            for (let i = 0, length = slides.length; i < length; i += 1) {
              const $slideEl = slides.eq(i);
              const slideSize = slidesSizesGrid[i];
              const slideOffset = $slideEl[0].swiperSlideOffset;
              const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

               let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
              let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
              // var rotateZ = 0
              let translateZ = -translate * Math.abs(offsetMultiplier);

               let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
              let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

               // Fix for ultra small values
              if (Math.abs(translateX) < 0.001) translateX = 0;
              if (Math.abs(translateY) < 0.001) translateY = 0;
              if (Math.abs(translateZ) < 0.001) translateZ = 0;
              if (Math.abs(rotateY) < 0.001) rotateY = 0;
              if (Math.abs(rotateX) < 0.001) rotateX = 0;

               const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

               $slideEl.transform(slideTransform);
              $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
              if (params.slideShadows) {
                // Set shadows
                let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
                let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
                if ($shadowBeforeEl.length === 0) {
                  $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
                  $slideEl.append($shadowBeforeEl);
                }
                if ($shadowAfterEl.length === 0) {
                  $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
                  $slideEl.append($shadowAfterEl);
                }
                if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
              }
            }

             // Set correct perspective for IE10
            if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
              const ws = $wrapperEl[0].style;
              ws.perspectiveOrigin = `${center}px 50%`;
            }
          },
          setTransition(duration) {
            const swiper = this;
            swiper.slides
              .transition(duration)
              .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
              .transition(duration);
        }
     }
  }

  constructor(private authService: AuthService, private userService: UserService, private cardService: CardService, private activatedRoute: ActivatedRoute,
              private router: Router, private camera: Camera, public actionSheetController: ActionSheetController, public alertController: AlertController, private toastCtrl: ToastController) {

    console.log("Profile page started (constructor)");

    console.log('Is authenticated:', this.authService.isAuthenticated());
  }

  ngOnInit() {
      console.log("Profile page (init)");
      this.users = this.userService.listUsers();
      this.cards = this.cardService.listCards();

      if (this.router.getCurrentNavigation().extras.state){
          this.card.frontImg = this.router.getCurrentNavigation().extras.state.cardDataFront;
          this.card.backImg = this.router.getCurrentNavigation().extras.state.cardDataBack;
      } else if (this.card.frontImg = !this.router.getCurrentNavigation().extras.state.cardDataFront){
          this.newCardAlert();
      }


  }

  goToCardImportPage() {
      this.router.navigateByUrl('/card-import');
  }

  goToEditPage() {
      let navigationExtras: NavigationExtras = {
      state: {
        data: this.user,
        parent: 'profile'
      }
    };
    this.router.navigateByUrl('/edit');
  }

  goToUserListPage() {
    this.router.navigateByUrl('/user-details');
  }

  async createACard() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Create from:',
        buttons: [{
          text: 'Photo',
          icon: 'images',
          handler: () => {
            this.router.navigateByUrl('/card-import');
            console.log('Card import page loaded');
          }
        }, {
          text: 'Template',
          icon: 'easel',
          handler: () => {
            this.router.navigateByUrl('/edit');
            console.log('Template card page loaded');
          }
        }, {
          text: 'New',
          icon: 'card',
          handler: () => {
            this.router.navigateByUrl('/user');
            console.log('User list page loaded');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
  }

  async newCardAlert() {
       const alert = await this.alertController.create({
         header: 'Welcome!',
         subHeader: '',
         message: 'You currently have no cards saved. Click on the card template to create one now!',
         buttons: ['OK']
       });
       await alert.present();
  }

   deleteCard() {
         console.log('card id: ' + this.card.id);
         this.cardService.deleteCard(this.card.id).then(() => {
           this.router.navigateByUrl('/profile');
           this.showToast('Card deleted');
         }, err => {
           this.showToast('There was a problem deleting your card :(');
         });
   }

   showToast(msg) {
          this.toastCtrl.create({
            message: msg,
            duration: 2000,
            color: 'success',
            position: 'top',
            buttons: [
                {
                  side: 'start',
                  icon: 'checkmark-circle',
                  handler: () => {
                    console.log('Card saved');
                  }
                },
                {
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                }
            ]
          }).then(toast => toast.present());
   }

}
