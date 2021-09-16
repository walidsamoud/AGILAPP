<template>
<ion-page>
    <ion-content id="ionContent" :fullscreen="true">
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title size="large">Plans</ion-title>
            </ion-toolbar>
        </ion-header>

        <div id="Login">
            <Loader v-if="loader"></Loader>
            <div><img src="/images/placeholder.png" class="placeholder" alt="Agil placeholder"></div>
            <Header :showCustomersArea="false"></Header>

            <div class="section-loader" v-if="circle_loader">
                <img src="/images/loader-circle.gif" alt="Agil section loader">
            </div>

            <div class="vendors row" v-for="item in pending_tickets" :key="item.id" @click="$router.push('/ticket_request/'+item.id)">
            <div v-if="item.business_summary.organization_id==organization_id || organization_id==''">
                <div class="col-lg-3 col-md-3 col-sm-12"></div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="vendor">
                        <div class="image">
                            <img :src="item.business_summary.photo" :alt="item.business_summary.name+' logo'" style="border: 1px solid #ddd;">
                        </div>
                        <div class="infos">
                            <span class="name">{{item.business_summary.name}}</span>
                            <span class="phone">
                                <img src="/images/phone.png" class="icon icon-phone" alt="">
                                {{item.business_summary.phone}}
                            </span>
                            <span class="badge badge-outlined" style="margin-top: 10px;text-align: center;">
                                File d'attente
                            </span>
                        </div>
                        <div class="crowd">
                            <img  src="/images/waiting.png" alt="Agil waiting">

                            <span class="badge badge-gris">En <br>attente</span>
                        </div>
                        <br>
                        <br>
                            <div class="services">
                                <div :class="'service'" v-for="service in item.services" :key="service.id">
                                    <img :class="'dot'" src="/images/dot-checked.png" alt="Agil dot">
                                    <span>{{JSON.parse(service.translations)['fr']}}</span>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            </div>

            <div class="vendors row" v-for="item in confirmed_tickets" :key="item.id" @click="$router.push('/ticket/'+item.unique_id)">
            <div v-if="item.business_summary.organization_id==organization_id || organization_id==''">
                <div class="col-lg-3 col-md-3 col-sm-12"></div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="vendor">
                        <div class="image">
                            <img :src="item.business_summary.photo" :alt="item.business_summary.name+' logo'"  style="border: 1px solid #ddd;">
                        </div>
                        <div class="infos">
                            <span class="name">{{item.business_summary.name}}</span>
                            <span class="phone">
                                <img src="/images/phone.png" class="icon icon-phone" alt="">
                                {{item.business_summary.phone}}
                            </span>
                            <span class="badge badge-outlined" style="margin-top: 10px;text-align: center;">
                                File d'attente
                            </span>
                        </div>
                        <div class="crowd">

                            <span class="badge badge-success" v-if="item.waiting_time-60*item.estimatedTimeToSpend>0">
                                Votre tour <br>est dans <br>
                                <span>{{getWaitingTime(item.waiting_time, item.estimatedTimeToSpend)}}</span>
                            </span>
                            <div v-else>
                                <img src="/images/check.png" alt="Agil check">

                                <span class="badge badge-success">
                                    Votre tour <br>est prét
                                </span>
                            </div>
                            
                        </div>
                        <br>
                        <br>
                            <div class="services">
                                <div :class="'service'" v-for="service in item.services" :key="service.id">
                                    <img :class="'dot'" src="/images/dot-checked.png" alt="Agil dot">
                                    <span>{{JSON.parse(service.translations)['fr']}}</span>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            </div>

            <div class="vendors row" v-for="item in pending_bookings" :key="item.id" @click="$router.push('/booking_request/'+item.unique_id)">
            <div v-if="item.business.organization_id==organization_id || organization_id==''">
                <div class="col-lg-3 col-md-3 col-sm-12"></div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="vendor">
                        <div class="image">
                            <img :src="item.business.photo" :alt="item.business.name+' logo'"  style="border: 1px solid #ddd;">
                        </div>
                        <div class="infos">
                            <span class="name">{{item.business.name}}</span>
                            <span class="phone">
                                <img src="/images/phone.png" class="icon icon-phone" alt="">
                                {{item.business.phone}}
                            </span>
                            <span class="badge badge-outlined" style="margin-top: 10px;text-align: center;font-size: 2vw;">
                                Rendez-vous le <br>
                                {{item.start_datetime}}
                            </span>
                        </div>
                        <div class="crowd">
                            <img  src="/images/waiting.png" alt="Agil waiting">
                            <!-- <span class="booking-time">{{item.start_datetime}}</span> -->
                            <span class="badge badge-gris">En <br>attente</span>
                        </div>
                        <br>
                        <br>
                            <div class="services">
                                <div :class="'service'" v-for="service in item.services_array" :key="service.id">
                                    <img :class="'dot'" src="/images/dot-checked.png" alt="Agil dot">
                                    <span>{{JSON.parse(service.translations)['fr']}}</span>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            </div>

            <div class="vendors row" v-for="item in confirmed_bookings" :key="item.id" @click="$router.push('/booking/'+item.id)">
            <div v-if="item.business.organization_id==organization_id || organization_id==''">
                <div class="col-lg-3 col-md-3 col-sm-12"></div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="vendor">
                        <div class="image">
                            <img :src="item.business.photo" :alt="item.business.name+' logo'"  style="border: 1px solid #ddd;">
                        </div>
                        <div class="infos">
                            <span class="name">{{item.business.name}}</span>
                            <span class="phone">
                                <img src="/images/phone.png" class="icon icon-phone" alt="">
                                {{item.business.phone}}
                            </span>
                            <span class="badge badge-outlined" style="margin-top: 10px;text-align: center;">
                                Rendez-vous
                            </span>
                        </div>
                        <div class="crowd">
                            <img src="/images/check.png" alt="Agil check">
                            <span class="badge badge-success">
                                {{item.start_datetime.split(' ')[0]}}<br>{{item.start_datetime.split(' ')[1]}}
                            </span>
                        </div>
                        <br>
                        <br>
                            <div class="services">
                                <div :class="'service'" v-for="service in item.services_array" :key="service.id">
                                    <img :class="'dot'" src="/images/dot-checked.png" alt="Agil dot">
                                    <span>{{JSON.parse(service.translations)['fr']}}</span>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            </div>
            <br>
        </div>
    </ion-content>
</ion-page>
</template>

<script>
    import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
    import Header from '../../components/layouts/Header.vue'
    import Loader from '../../components/loader/Loader.vue'
    import { queueService, bookingService } from '../../_services'

    export default({
        data:()=>({
            loader: false,
            circle_loader: false,
            pending_tickets: [],
            confirmed_tickets: [],
            pending_bookings: [],
            confirmed_bookings: [],
            organization_id: 11
        }),
        methods:{
            doRefresh(event){
                console.log('Begin async operation');
                setTimeout(() => {
                    console.log('Async operation has ended');
                    event.target.complete();
                }, 2000);
                alert(0)
            },
            getWaitingTime(seconds, mines_minutes){
                let waiting_seconds= seconds-(mines_minutes*60);
                let h= Math.floor(waiting_seconds/3600);
                let m= Math.floor(waiting_seconds/60);
                let s= Math.floor(waiting_seconds%60);
                return ((h!=0)?h+'h ':'')+m+'m '+s+'s';
            }
        },
        mounted(){
            this.circle_loader= true
            queueService.getPending().then(function(data){
                this.pending_tickets= data.requests.data;
            }.bind(this)).finally(function(){
                this.circle_loader= false
            }.bind(this))

            queueService.getConfirmed().then(function(data){
                this.confirmed_tickets= data.tickets.data;
            }.bind(this))

            bookingService.getPending().then(function(data){
                this.pending_bookings= data.bookings;
            }.bind(this))

            bookingService.getConfirmed().then(function(data){
                this.confirmed_bookings= data.bookings.data;
            }.bind(this))
        },
        components: { Loader, Header, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }

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

    .vendors{
        padding: 0 20px;
        margin-top: 20px;
    }

    .vendor{
        box-shadow: 0 0 8px 1px #ccc;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 10px;
        padding: 10px;
        transition: .5s;
        position: relative;
        cursor: pointer;
    }

    .vendor .image {
        display: inline-block;
        width: 20%;
    }

    .vendor .image img {
        width: 100%;
        border-radius: 5px;
    }

    .vendor .infos{
        width: 45%;
        display: inline-block;
        position: absolute;
        top: 10px;
        padding: 10px 20px;
    }

    .vendor .name{
        font-weight: 600;
        display: block;
        white-space: nowrap;
    }

    .vendor .phone{
        display: block;
        font-size: 14px;
        margin-top: 5px;
        white-space: nowrap;
    }

    .vendor .crowd{
        display: inline-block;
        text-align: center;
        width: 30%;
        float: right;
        vertical-align: middle !important;
        padding-top: 10px;
    }

    .vendor .crowd img{
        width: 30%;
        margin-bottom: 5px;
        display: block;
        left: 50%;
        position: relative;
        transform: translate(-50%, 0%);
        padding: 2px;
    }

    .vendor .crowd .badge{
        width: 100%;
    }

    .vendor:hover{
        background-color: #ffdb00;
    }

    .badge{
        color: #fff;
        padding: 2px 10px;
        font-size: 12px;
        border-radius: 5px;
        display: block;
        width: 100%;
        white-space: nowrap;
    }

    .badge-danger{
        background: #dc3545;
    }
    .badge-success{
        background: green;
    }
    .badge-gris{
        background: #666;
    }
    .badge-outlined{
        color: #333 !important;
        border: 1px solid #888;
    }

    .section-loader{
        text-align: center;
        width: 100%;   
        margin-top: 50px;     
    }

    .section-loader img{
        width: 50px;
    }

    .icon{
        width: 15px;
    }

    .services{
        text-align: center;
        width: 100%;
        display: block;
    }

    .service{
        display: inline-flex;
        padding: 0 10px;
        color: #323232;
    }

    .service .dot{
        width: 30px;
        height: 30px;
    }

    .service span{
        font-weight: 600;
        margin-top: 6px;
    }

    .booking-time{
        letter-spacing: 1px;
        color: #666;
        font-size: 13px;
        font-weight: bold;
    }
</style>