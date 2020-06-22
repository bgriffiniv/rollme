import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService, User } from 'src/app/services/user/user.service';
import { CardService, Card } from 'src/app/services/card/card.service';

import { Platform, ActionSheetController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { CardSelectPage } from 'src/app/pages/card-select/card-select.page';


@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.page.html',
  styleUrls: ['./exchange.page.scss'],
})
export class ExchangePage implements OnInit {
  user;
  contactDataList;
  index;
  staticCards: Card[];
  cards: Card[];

  id;
  card: Card;

  frontImg;
  backImg;

  isCardFound = false;

  tagId;
  tagDesc;

  ownerId = "";
  holderId;

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


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router,
    platform: Platform,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private toastCtrl: ToastController,
    public modalController: ModalController,
    private nfc: NFC,
    private ndef: Ndef
  ) {
     platform.ready().then(() => {
     this.startNFCListener();
      console.log('launch NFC listener');
     }).catch(err => {
      console.log('Error while loading platform', err);
     });

    console.log("Exchange page Start");
    console.log('Is authenticated:', this.authService.isAuthenticated());
  }

  ngOnInit() {
    console.log('Exchange Page Init');

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      console.log('Current card ID: ', this.id);
      this.cardService.getCard(this.id, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Card: ", data)
          this.isCardFound = true;
          this.card = data;
          this.frontImg = this.card.frontImg;
          this.backImg = this.card.backImg;

          this.ownerId = this.authService.getCurrentUserId();
          console.log('Current owner ID: ', this.ownerId);
          this.holderId = this.card.holders;
          console.log('Current holder ID: ', this.holderId);
        }
      });
    }
  }

  async selectCard() {
    const modal = await this.modalController.create({
      component: CardSelectPage
    });

    modal.onWillDismiss().then(data => {
       console.log(data);
    });
    return await modal.present();
  }

  cancel() {
    !this.isCardFound;
    this.router.navigate(['/home/exchange']);
  }

  startNFCListener() {
    this.ownerId = this.authService.getCurrentUserId();
    console.log('Current owner ID: ', this.ownerId);

    this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');

      let toast = this.toastCtrl.create({
        message: 'Connected',
        duration: 1000,
        position: 'top'
      }).then(toast => toast.present());

    }, (err) => {
      console.log('error attaching ndef listener', err);

      let toast = this.toastCtrl.create({
        message: err,
        duration: 1000,
        position: 'top'
      }).then(toast => toast.present());

     }).subscribe(async (event) => {
       let ndefMessage = [
           this.ndef.textRecord(this.ownerId)
       ];

       console.log('received ndefMessage. the tag contains: ', event.tag);
       console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));

       this.tagId = "";
       this.tagDesc = "";

       let tagIdInfo = await this.nfc.bytesToHexString(event.tag.id);
       this.tagId = tagIdInfo;

       if (event.tag.ndefMessage) {
         let payload = event.tag.ndefMessage[0].payload;
         let tagContent = await this.nfc.bytesToString(payload).substring(3);
         this.tagDesc = tagContent;
         if (this.nfc.share(ndefMessage)) {
             this.acceptCardAlert();
         }
       }

       let toast = this.toastCtrl.create({
         message:  this.tagDesc,
         duration: 1000,
         position: 'top'
       }).then(toast => toast.present());
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
              console.log('Got card');
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

  async acceptCardAlert() {
    const alert = await this.alertController.create({
     header: this.tagDesc,
     subHeader: this.id,
     message: 'You are about to send your card to User X. Do you wish to continue with this action?',
     buttons: [
       {
         text: 'Accept',
         handler: () => {
           this.launchNFC();
           console.log('Card accepted');
         }
       }, {
         text: 'Decline',
         handler: () => {
          this.router.navigateByUrl('/home/exchange');
           console.log('Card declined');
         }
       },
     ]
   });
   await alert.present();
  }

  launchNFC(){
    console.log('begin launchNFC');

    console.trace('Updating card holders');
    this.holderId = this.tagDesc;
    this.card = {
       holders: [this.holderId]
    };
    this.cardService.updateCard(this.id, this.card, (error, data) => {
      if (error) {
          this.showToast('There was a problem updating your card :(');
      } else {
         this.showToast('Card updated');
      }
    });

    this.router.navigateByUrl('/home/rolodex');
  }
}
