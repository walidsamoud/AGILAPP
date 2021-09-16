<template>
<ion-page>
    <ion-content id="ionContent" :fullscreen="true">
        <ion-header collapse="condense" style="display: none;">
            <ion-toolbar>
                <ion-title size="large">Vendor Details</ion-title>
            </ion-toolbar>
        </ion-header>

        <div id="Vendor">
            <div><img src="/images/placeholder.png" class="placeholder" alt="Agil placeholder"></div>
            <Header :showCustomersArea="false" :returnButton="true"></Header>

            <div v-if="vendor==null" class="section-loader">
                <img src="/images/loader-circle.gif" alt="">
            </div>

            <div v-else>
                <div class="big-title">
                    <span>{{vendor.name}}</span>
                </div>

                <div class="row vendor-informations p-0 m-0">
                    
                    <div class="col-lg-3 col-md-3 col-sm-2 col-2"></div>
                    <div class="col-lg-6 col-md-6 col-sm-8 col-8 infos-area">
                        <span class="phone"><img src="/images/phone.png" class="icon icon-phone" alt="">  {{vendor.phone}}</span>
                        <span class="address"><img src="/images/marker.png" class="icon icon-marker" alt=""> {{vendor.address}}</span>
                        <span class="email"><img src="/images/email.png" class="icon icon-email" alt=""> {{vendor.email}}</span>
                        <span class="services">
                             <div class="service" v-for="service in vendor.services" :key="service.id">
                                <img class="dot" src="/images/dot.png" alt="Agil dot">
                                <span>{{JSON.parse(service.translations)['fr']}}</span>
                            </div>
                        </span>
                    </div>
                </div>

                <div class="row vendor-informations"  style="text-align: center !important;">
                    <div class="col-lg-3 col-md-3 col-sm-12"></div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-12 right-infos">
                        <div class="tab tab-days btn" @click="showWorkingDays()">
                            <span class="working-day title">
                                Heures de travail
                                <img src="/images/caret-down.png" class="caret" alt="" v-if="!tabs.days.active">
                                <img src="/images/caret-up.png" class="caret" alt="" v-else>
                            </span>
                        </div>
                        <div class="days-tab">
                            <span :class="(!workingday.active)?'working-day closed':'working-day'" v-for="workingday in vendor.working_days" :key="workingday.id">
                                {{workingday.day}}
                                <!-- {{$t('Days.'+workingday.day)}} -->
                                <span v-if="workingday.active">{{workingday.start_time.substring(0,5)}} - {{workingday.end_time.substring(0,5)}}</span>
                                <span v-else>Fermé</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row vendor-informations p-0 m-0 mt-4">
                    <div class="col-lg-3 col-md-3 col-sm-12"></div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-12 right-infos">
                        <div class="tab tab-map btn" @click="showMap()">
                            <span class="working-day title">
                                Position sur google map
                                <img src="/images/caret-down.png" class="caret" alt="" v-if="!tabs.map.active">
                                <img src="/images/caret-up.png" class="caret" alt="" v-else>
                            </span>
                        </div>
                        <div class="map-tab">
                            <iframe 
                                :src="'https://maps.google.com/maps?q='+vendor.lat+','+vendor.lng+'&hl=fr&z=14&amp;output=embed'"
                                allowfullscreen="" 
                                loading="lazy"
                                style="width: 100%;height: 150px;border:0;">
                            </iframe>
                        </div>
                    </div>
                </div>

                <div class="buttons row p-0 m-0">
                    <div class="row p-0 m-0 w-100">
                        <div class="col-lg-3 col-md-3 col-sm-12"></div>
                        <div class="col-lg-6 col-md-6 col-sm-12 queue-div">
                            <button :class="(!vendor.status)?'queue-btn closed':'queue-btn'" @click="(vendor.status)?$router.push(vendor.hashedid+'/queues'):''">
                                <img class="icon" src="/images/tickets.png" alt="">
                                <span>PRENDRE</span>
                                <span>UN TICKET</span>
                                <small v-if="!vendor.status" class="badge badge-danger closed-badge">Closed</small>
                            </button>
                        </div>
                    </div>
                    <div class="row p-0 m-0 w-100">
                        <div class="col-lg-3 col-md-3 col-sm-12"></div>
                        <div class="col-lg-6 col-md-6 col-sm-12 inscription-button-div">
                            <button class="rdv-btn" @click="$router.push(vendor.hashedid+'/book')">
                                <img class="icon" src="/images/calendar.png" alt="">
                                <span>PRISE</span>
                                <span>DE RENDEZ-VOUS</span>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- <div class="free-space"></div> -->
            </div>
        </div>
    </ion-content>
</ion-page>
</template>

<script>
    import Header from '../../components/layouts/Header.vue'
    import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
    import $ from 'jquery'
    import { vendorsService } from '../../_services'
    // import moment from 'moment'
    
    export default({
        data:()=>({
            vendor: null,
            tabs: {
                infos: {
                    active: false
                },
                map: {
                    active: false
                },
                days: {
                    active: false
                }
            },
            organization_id: 11
        }),
        methods:{
            openInfosTab(){
                $('.tab-infos').toggleClass('active-tab');
                $('.name-tab').slideToggle('slow')
                this.tabs.infos.active= !this.tabs.infos.active;
            },
            showMap(){
                $('.tab-map').toggleClass('active-tab');
                $('.map-tab').slideToggle('slow', function(){
                    var objDiv = document;
                    objDiv.scrollTop = objDiv.scrollHeight;
                })
                this.tabs.map.active= !this.tabs.map.active;
            },
            showWorkingDays(){
                $('.tab-days').toggleClass('active-tab');
                $('.days-tab').slideToggle('slow', function(){
                    var objDiv = document;
                    objDiv.scrollTop = objDiv.scrollHeight;
                })
                this.tabs.days.active= !this.tabs.days.active;
            }
        },
        mounted(){
            vendorsService.getByHashedId(this.$route.params.id, this.organization_id).then(function(data){
                console.log(data)
                this.vendor= data.data
            }.bind(this))
        },
        components: { Header, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
    })
</script>

<style scoped>
    #Vendor{
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
        font-family: Andale Mono, monospace, sans-serif;
    }

    .placeholder{
        width: 95%;
        position: absolute;
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

    .buttons{
        /* position: absolute;
        bottom: 3%;
        left: 50%;
        transform: translate(-50%, 0%);
        width: 95%;
        background-color: #fff; */
        position: relative;
        width: 100%;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    .buttons button{
        width: 95%;
        position: relative;
        height: 60px;
        margin-top: 10px;
        border: none;
        background-color: #ffdb00;
        border-radius: 10px;
        color: #333;
        font-weight: 700;
        font-size: 18px;
        letter-spacing: 1px;
        transition: .5s;
        text-align: left;
        padding: 0 40px;
    }

    .buttons button:hover, .buttons button:focus{
        background-color: #ffdd00a2;
    }

    .rdv-btn span{
        padding-left: 70px;
        display: block;
    }
    .rdv-btn .icon{
        height: 45px;
        display: inline-block;
        position: absolute;
        margin-top: -2px;
    }

    .queue-btn span{
        padding-left: 70px;
        display: block;
    }
    .queue-btn .icon{
        height: 55px;
        display: inline-block;
        position: absolute;
        margin-top: -10px;
    }

    .queue-div .closed{
        background-color: #ddd !important;
    }

    .closed-badge{
        position: absolute;
        right: 10%;
        top: 50%;
        transform: translate(0%, -50%);
    }

    .big-title{
        text-transform: uppercase;
        font-size: 25px;
        letter-spacing: 2px;
        text-align: center;
        margin: 20px 0 30px 0;
    }

    .vendor-informations .left-infos{
        padding: 0 10px;
    }

    .vendor-informations .left-infos span{
        display: block;
    }

    .vendor-informations .left-infos .name{
        font-weight: 600;
    }

    .vendor-informations .right-infos{
        display: block;
        text-align: left;
        padding: 0 10px;
    }

    .vendor-informations .right-infos .working-day{
        display: block;
        padding: 5px 20px;
        font-size: 14px;
        letter-spacing: 1px;
    }

    .title{
        font-weight: 600;
    }

    .vendor-informations .right-infos .working-day span{
        float: right;
    }

    .vendor-informations .right-infos .closed{
        color: red;
    }

    .tab{
        height: 40px;
        text-align: left;
        width: 100%;
        box-shadow: 0 0 2px 1px #bbb;
        border-radius: 10px;
        margin-top: 20px;
        padding: 2px;
    }

    .tab span{
        margin-top: 3px;
        transition: .3s;
    }

    .tab span .faCaret{
        float: right;
        margin-top: 3px;
    }

    .active-tab{
        background-color: #ffdb00;
    }

    .name-tab, .days-tab, .map-tab{
        display: none;
        background-color: rgba(221, 221, 221, 0.61);
        border-radius: 0 0 10px 10px;
        padding: 20px;
        margin-top: -5px;
    }

    /*---------------------------------------*/

    .infos-area{
        text-align: center;
        margin-bottom: 20px;
        width: 100%;
    }

    .infos-area .address{
        padding: 10px 40px;
    }

    .infos-area span{
        display: block;
    }

    .vendor-informations .icon{
        width: 18px;
        margin-top: 10px;
    }

    .badge{
        color: #fff;
        padding: 5px;
        font-size: 12px;
        border-radius: 5px;
        display: block;
    }

    .badge-danger{
        background: #dc3545;
    }
    .badge-success{
        background: #28a745;
    }

    .section-loader img{
        position: absolute;
        width: 50px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .services{
        text-align: center;
        display: none;
        margin-top: 20px;
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

    .caret{
        width: 10px;
        float: right;
        margin-top: 5px;
    }
</style>