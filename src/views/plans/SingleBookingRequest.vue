<template>
<ion-page>
    <ion-content id="ionContent" :fullscreen="true">
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title size="large">Splash screen</ion-title>
            </ion-toolbar>
        </ion-header>

        <div id="Login">
            <Loader v-if="loader"></Loader>
            <div><img src="/images/placeholder.png" class="placeholder" alt="Agil placeholder"></div>
            <Header :showCustomersArea="true" :returnButton="true"></Header>

            <div class="section-loader" v-if="!booking">
                <img src="/images/loader-circle.gif" alt="Agil section loader">
            </div>

            <div class="row" v-else>

                <div class="date" style="text-align: center;letter-spacing: 1px;">
                    <p>Date de rendez-vous</p>
                    <p>{{booking.start_datetime.split(' ')[0]}}</p>
                    <p style="margin-top: -15px;">{{booking.start_datetime.split(' ')[1]}}</p>
                </div>

                <div class="services">
                    <div :class="'service'" v-for="service in booking.service_names.split(',')" :key="service.id">
                        <img :class="'dot'" src="/images/dot-checked.png" alt="Agil dot">
                        <span>{{service}}</span>
                    </div>
                </div>

                <div class="buttons row p-0 m-0">
                    <div class="row p-0 m-0 w-100">
                        <div class="col-lg-3 col-md-3 col-sm-12"></div>
                        <div class="col-lg-6 col-md-6 col-sm-12 queue-div">
                            <button class="pending-btn">
                                <img class="icon" src="/images/pending.png" alt="">
                                <span>Votre Demande est</span>
                                <span>En attente</span>
                            </button>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-12 queue-div">
                            <button class="pending-btn cancel-btn"  @click="ToastConfirmCancel=true">
                                <img class="icon" src="/images/cancel.png" alt="">
                                <span>annuler </span>
                                <span>la demande</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <br>
        </div>
        <!-- //TOASTS// -->
        <ion-toast
            :is-open="ToastConfirmCancel"
            message="Voulez vous vraiment annuler votre demande de rendez-vous?"
            :duration="3000"
            @didDismiss="ToastConfirmCancel=false"
            :position="'top'"
            color="danger"
            :buttons="[
                {
                    text:'Oui',
                    icon: 'star',
                    color: 'success',
                    handler: () => {
                        cancelTicketRequest()
                    }
                }, 
                {
                    text:'Non',
                    icon: 'star',
                    color:'danger'
                },
            ]"
        >
        </ion-toast>
        <ion-toast
            :is-open="ToastCancelSuccess"
            message="Votre demande de rendez-vous a été annulée avec succès."
            :duration="3000"
            @didDismiss="ToastCancelSuccess=false"
            :position="'top'"
            color="success"
        >
        </ion-toast>
    </ion-content>
</ion-page>
</template>

<script>
    import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
    import Header from '../../components/layouts/Header.vue'
    import Loader from '../../components/loader/Loader.vue'
    import { bookingService } from '../../_services'
    import { IonToast } from '@ionic/vue';
    
    export default({
        data:()=>({
            booking: null,
            loader: false,
            ToastConfirmCancel: false,
            ToastCancelSuccess: false
        }),
        methods:{
            cancelTicketRequest(){
                this.loader= true
                bookingService.cancelRequest(this.booking.id).then(function(data){
                    console.log(data)
                    this.ToastCancelSuccess= true
                    this.$router.push('/home')
                }.bind(this)).finally(function(){
                    this.loader= false
                }.bind(this))
            }
        },
        mounted(){
            bookingService.getPendingByUid(this.$route.params.uid).then(function(data){
                console.log(data)
                this.booking= data.bookings;
                if(this.booking==null){
                    this.$router.push('/booking/0')
                }
            }.bind(this)).catch(function(ex){
                console.log(ex)
                // this.$router.push('/ticket/0')
            }.bind(this));
        },
        components: { IonToast, Loader, Header, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }

    })
</script>

<style scoped>
    #Login{
        width: 100vw;
        font-family: Andale Mono, monospace, sans-serif;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .placeholder{
        width: 95%;
        position: fixed;
        top:50%;
        left:50%;
        transform: translate(-50%, -70%);
        opacity: .08;
        z-index: -1;
    }

    @media screen and (min-width: 720px) {
        .placeholder{
            width: 50%;
        }
    }

    .description{
        text-align: center;
        margin-top: 20px;
        padding: 5px 40px;
    }

    .description .title{
        display: block;
        font-size: 17px;
        letter-spacing: 1px;
        color: #333;
    }

    .description .topic{
        display: block;
        color: #666;
        margin-top: 10px;
    }

    .badge{
        color: #fff;
        padding: 2px 10px;
        font-size: 12px;
        border-radius: 5px;
        display: block;
    }

    .badge-danger{
        background: red;
    }
    .badge-success{
        background: green;
    }

    .section-loader img{
        width: 50px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .icon{
        width: 15px;
    }

    .buttons{
        /* position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translate(-50%, 0%); */
        width: 100%;
        background-color: #fff;
        margin-bottom: 20px;
        text-align: center;
    }

    .buttons button{
        width: 95%;
        position: relative;
        height: 60px;
        margin-top: 10px;
        border: none;
        background-color: #666;
        border-radius: 10px;
        color: #FFF;
        font-weight: 700;
        font-size: 18px;
        letter-spacing: 1px;
        transition: .5s;
        text-align: left;
        padding: 0 40px;
    }

    .buttons .cancel-btn:hover, .buttons .cancel-btn:focus{
        background-color: #dc35469f !important;
    }

    .pending-btn span{
        padding-left: 70px;
        display: block;
    }
    .pending-btn .icon{
        display: inline-block;
        position: absolute;
        width: 30px;
    }
    .cancel-btn{
        background-color: #dc3545 !important;
    }

    .services{
        background-color: #fff;
        text-align: center;
    }

    .service{
        display: inline-flex;
        padding: 0 10px;
        color: #323232;
    }

    .service .dot{
        width: 30px;
    }

    .service span{
        font-weight: 600;
        margin-top: 6px;
    }
</style>