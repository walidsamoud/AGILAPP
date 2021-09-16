<template>
  <ion-page>
    <ion-content id="ionContent" :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Splash screen</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="Splash">
        <div class="logo">
            <img :src="'/images/agil.png'" class="logo-img" alt="Agil logo">
            <span class="under-logo">AgilApp</span>
        </div>

        <div class="loader">
            <img :src="'/images/45_agil-loader-slow.gif'" class="logo-loader" alt="Agil loader">
            <span class="under-loader">Chargement <ion-spinner name="dots" style="color: #fff;padding-top: 10px;position: absolute;margin-top: -5px;margin-left: 10px;"></ion-spinner></span>
        </div>

        <a href="https://liberrex.com" class="liberrex">
          <span>Powered by Liberrex</span>
        </a>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import $ from 'jquery'
  
  export default  {
    name: 'Splash',
    data:()=>({
      redirect: 0
    }),
    mounted(){
      setInterval(function(){
        if(this.redirect==5){
          window.location.href= '/home'
        }else{
          this.redirect++;
        }
      }.bind(this), 500)

      $('#ionTabBar').hide()
    },
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
  }
</script>

<style scoped>
    ::-webkit-scrollbar, *::-webkit-scrollbar {
      display: none;
      overflow: hidden;
    }

    #ionContent {
      overflow: hidden;
      --overflow: hidden;
    }

    .scroll-content {
      overflow: hidden;
    }
    #Splash{
        width: 100vw;
        height: 100vh;
        background-color: #323232;
        font-family: Andale Mono, monospace, sans-serif;
        overflow: hidden !important;
    }
    
    .logo{
        width: 100%;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -75%);
        text-align: center;
    }

    .logo-img{
        width: 25vh;    
    }

    .under-logo{
        text-transform: uppercase;
        color: #fff;
        font-size: 3vh;
        margin-top: 15px;
        letter-spacing: 1px;
        display: block;
    }

    .loader{
        text-align: center;
        position: absolute;
        bottom:10%;
        left:50%;
        transform: translate(-50%, 0%);
        width: 100%;
    }

    .logo-loader{
        width: 100px;
    }

    .under-loader{
        color: #fff;
        text-transform: uppercase;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 2px;
        display: block;
    }

    .liberrex{
      position: absolute;
      left: 50%;
      bottom: 2%;
      transform: translate(-50%, 0%);
      color: #fff;
      display: block;
      flex-wrap: nowrap;
      text-decoration: none;
    }
</style>