<template>
  <ion-page>
    <!-- <ion-tabs @ionTabsDidChange="testIt()"> -->
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
    
      <ion-tab-bar slot="bottom" id="ionTabBar">
        <ion-tab-button tab="tab1" href="/home">
          <img src="/images/home-selected.png" class="tab-icon tab-home" v-if="$route.fullPath=='/home'">
          <img src="/images/home.png" class="tab-icon tab-home" v-else>

          <ion-label :style="($route.fullPath=='/home')?'color: #ffdb00 !important;':''">Accueil</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/qr">
          <img src="/images/qr-scanner-selected.png" class="tab-icon tab-home" v-if="$route.fullPath=='/qr'">
          <img src="/images/qr-scanner.png" class="tab-icon tab-home" v-else>

          <ion-label :style="($route.fullPath=='/qr')?'color: #ffdb00 !important;':'color: #666 !important;'">Qr</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/stations" :style="($route.fullPath=='/stations')?'background: #ffdb00 !important;':''">
          <img src="/images/marker-tab.png" class="tab-icon tab-home">

          <ion-label :style="($route.fullPath=='/stations')?'color: #333 !important;':''">Stations</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/plans">
          <img src="/images/ticket-selected.png" class="tab-icon tab-home" v-if="$route.fullPath=='/plans'">
          <img src="/images/ticket.png" class="tab-icon tab-home" v-else>

          <ion-label :style="($route.fullPath=='/plans')?'color: #ffdb00 !important;':''">Plans</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab5" href="/profile">
          <img src="/images/user-selected.png" class="tab-icon tab-home" v-if="$route.fullPath=='/profile'">
          <img src="/images/user.png" class="tab-icon tab-home" v-else>

          <ion-label :style="($route.fullPath=='/profile')?'color: #ffdb00 !important;':''">Profile</ion-label>
        </ion-tab-button>


      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonPage, IonRouterOutlet },
  setup() {
    return {
      ellipse, 
      square, 
      triangle,
    }
  },
  methods: {},
  mounted(){
    console.log(this.$route.fullPath)
  }
}
</script>

<style scoped>
  #ionTabBar{
    border-top: 1px solid #888;
    height: 50px;
  }

  .tab-icon{
    width: 25px;
    padding: 2px;
  }

  .middle-tab{
    background: linear-gradient(to right, #ffde00, rgb(240, 243, 53));
    border-radius: 100px;
  }

  .custom-tabs a{
    display: inline-flex;
    padding: 0 10px;
  }
</style>