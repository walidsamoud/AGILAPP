<template>
<ion-page>
  <div id="qr">
    <div class="stream">
      <div class="overlay"></div>
      <qr-stream @decode="onDecode" class="mb">
        <div style="color: red;" class="frame"></div>
      </qr-stream>
      <!-- <img src="/images/qr-border-empty.png" class="qr-image" alt=""> -->
    </div>
  </div>
</ion-page>
</template>

<script>
import { IonPage, QrStream } from 'vue3-qr-reader';

export default({
  name: 'QrStream',
  components: {
    IonPage,
    QrStream
  },
  methods:{
    onDecode(data) {
      alert(data)
    }
  }
});
</script>
<style scoped>
  .stream{
    width: 100vw;
    height: 95vh;
    z-index: 9;
  }
  .overlay{
    /* width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    z-index: 999999999; */
    z-index: 9999999;
    position: absolute;
    width: 60vw;
    height: 35vh;
    max-width: 350px;
    min-width: 200px;
    max-height: 350px;
    min-height: 200px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* for IE */
    box-shadow: 0 0 0 1000px rgba(0,0,0,.5);
    /* for real browsers */
    box-shadow: 0 0 0 100vmax rgba(0,0,0,.5);
    pointer-events: none;
    border-radius: 5px;
    /* border-top: 5px solid #ffdb00; */
      background:
    linear-gradient(to right, #ffdb00 5px, transparent 5px) 0 0,
    linear-gradient(to right, #ffdb00 5px, transparent 5px) 0 100%,
    linear-gradient(to left, #ffdb00 5px, transparent 5px) 100% 0,
    linear-gradient(to left, #ffdb00 5px, transparent 5px) 100% 100%,
    linear-gradient(to bottom, #ffdb00 5px, transparent 5px) 0 0,
    linear-gradient(to bottom, #ffdb00 5px, transparent 5px) 100% 0,
    linear-gradient(to top, #ffdb00 5px, transparent 5px) 0 100%,
    linear-gradient(to top, #ffdb00 5px, transparent 5px) 100% 100%;

    background-repeat: no-repeat;
    background-size: 50px 50px;
    /* background-image: url('/images/qr-border-empty.png');
    background-size: cover;
    background-repeat: no-repeat; */
  }
  /* .qr-image{
    z-index: 999999999999;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 60vw;
    transform: translate(-50%, -50%);
    background: transparent;
  } */
</style>