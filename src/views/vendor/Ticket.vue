<template>
<ion-page>
    <ion-content id="ionContent" :fullscreen="true">
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title size="large">Splash screen</ion-title>
            </ion-toolbar>
        </ion-header>
        
        <div id="Ticket">
            <Loader v-if="loader"></Loader>
            <div><img src="/images/placeholder.png" class="placeholder" alt="Agil placeholder"></div>
            <Header :showCustomersArea="false" :returnButton="true"></Header>

            <div v-if="vendor==null" class="section-loader">
                <img src="/images/loader-circle.gif" alt="">
            </div>

            <div v-else>
                <div class="big-title">
                    <span>Agil Tunis </span>
                </div>

                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-12"></div>
                    <div class="col-lg-6 col-md-6 col-sm-12 description">
                        <span class="title">Choisir une file d'attente</span>
                    </div>
                </div>

                <div class="row vendor-informations p-0 m-0 mt-4">
                    <div class="col-lg-3 col-md-3 col-sm-12"></div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-12 right-infos">
                        <div :class="'tab btn queue-section queue-'+queue.id" v-for="queue in vendor.queues" :key="queue.id">
                            <div class="div" @click="clickQueue(queue.id)">
                                <span class="title">
                                    <br>
                                    {{ queue.title }}
                                    <!-- <font-awesome-icon class="faCaret" :icon="['fas', 'caret-up']" v-else/>  -->
                                </span>
                                <hr style="background: #ddd;">
                                <div class="status row">
                                    <div class="col-6 in-status left">
                                        <div class="icon">
                                            <img class="icon-clock" src="/images/clock-yellow.png" alt="Clock agil">
                                        </div>
                                        <span><b>{{queue.totalWaiting}}</b> <span style="display: block;"> en attente </span></span>
                                    </div>
                                    <div class="col-6 in-status right">
                                        <div class="icon">
                                            <img class="icon-clock" src="/images/clock-yellow.png" alt="Clock agil">
                                        </div>
                                        <span><b>{{queue.waitingTime}}</b> <span style="display: block;"> Temps d'attente </span></span>
                                    </div>
                                </div>
                                <br>
                            </div>
                        </div>
                        <div class="services">
                            <div :class="'service service-'+service.id" v-for="service in services" :key="service.id" @click="selectService(service.id)">
                                <img :class="'dot dot'+service.id" src="/images/dot.png" alt="Agil dot">
                                <img :class="'dot dot-checked dot-checked'+service.id" src="/images/dot-checked.png" alt="Agil dot">
                                <span>{{JSON.parse(service.translations)['fr']}}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="buttons row p-0 m-0">
                    <div class="row p-0 m-0 w-100">
                        <div class="col-lg-3 col-md-3 col-sm-12"></div>
                        <div class="col-lg-6 col-md-6 col-sm-12 queue-div">
                            <button :class="(vendor.status && selected_queue!=null && selected_services.length>0)?'queue-btn':'queue-btn closed'" @click="getTicket()">
                                <img class="icon" src="/images/tickets.png" alt="">
                                <span>PRENDRE</span>
                                <span>UN TICKET</span>
                                <small v-if="!vendor.status" class="badge badge-danger closed-badge">Closed</small>
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
    import Loader from '../../components/loader/Loader.vue'
    import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
    import $ from 'jquery'
    import { vendorsService, queueService} from '../../_services'

    export default({
        data:()=>({
            loader: false,
            queue_checked: {
                status: false,
            },
            vendor: null,
            selected_queue: null,
            services: [],
            selected_services: [],
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
                this.tabs.map.active= !this.tabs.map.active;
            },
            clickQueue(index){
                this.loader= true

                queueService.getQueueById(index).then(function(data){
                    console.log(data)
                    this.selected_queue= data.queue
                    this.services= data.services

                    $('.queue-'+index).toggleClass('queue-active')
                    //Queue Checked
                    $('.queue-section:not(.queue-'+index+')').slideToggle("slow")
                    $('.services').slideToggle("slow")
                }.bind(this)).finally(function(){
                    this.loader= false
                }.bind(this))
            },
            selectService(service_id){
                if($('.dot'+service_id).is(":visible")){
                    $('.dot'+service_id).fadeOut(200, function(){
                        $('.dot-checked'+service_id).fadeIn(100)
                    })
                    this.selected_services.push(service_id)
                }else{
                    $('.dot-checked'+service_id).fadeOut(200, function(){
                        $('.dot'+service_id).fadeIn(100)
                    })
                    this.selected_services.splice(this.selected_services.indexOf(service_id) ,1);
                }
            },
            getTicket(){
                if(this.vendor.status && this.selected_queue!=null && this.selected_services.length>0){
                    this.loader= true;
                    let payload = { 
                        services: this.selected_services.join(','), 
                        business_id: this.vendor.id
                    };

                    queueService.createTicket(this.selected_queue.id, payload).then(function(data) {
                        console.log(data)
                        this.$router.push('/ticket_request/'+data.request.id)
                    }.bind(this)).catch(function(ex){
                        console.log(ex)
                    }.bind(this)).finally(function(){
                        this.loader= false
                    }.bind(this))
                }
            }
        },
        mounted(){
            vendorsService.getByHashedId(this.$route.params.id, this.organization_id).then(function(data){
                console.log(data)
                this.vendor= data.data
            }.bind(this))
        },
        components: { Loader, Header, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }

    })
</script>

<style scoped>
    #Ticket{
        width: 100vw;
        overflow-x: hidden;
        font-family: Andale Mono, monospace, sans-serif;
        scroll-behavior: smooth;
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
        /* position: absolute; */
        /* bottom: 3%; */
        /* left: 50%; */
        /* transform: translate(-50%, 0%); */
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
        color: #666;
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
    }

    .title{
        font-weight: 600;
        text-transform: uppercase;
    }

    .vendor-informations .right-infos .working-day span{
        float: right;
    }

    .vendor-informations .right-infos .closed{
        color: red;
    }

    .tab{
        text-align: center;
        width: 100%;
        box-shadow: 0 0 8px 1px #bbb;
        border-radius: 10px;
        margin-bottom: 20px;
    }

    .tab .status{
        text-align: center;
    }

    .tab .status .icon{
        width: 100%;
        text-align: center;
    }
    .tab .icon-clock{
            width: 30px;
        margin-bottom: 5px;
        color: #ffdb00;
    }

    .tab .in-status{
        text-align: center;
    }

    .active-tab{
        background-color: #ffdb00;
    }

    .queue-tab{
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
    }

    .infos-area span{
        display: block;
    }

    .description{
        text-align: center;
        padding: 5px 40px;
        margin-top: -10px;
        margin-bottom: 20px;
    }

    .description .title{
        display: block;
        font-size: 17px;
        letter-spacing: 1px;
        color: #666;
    }

    .description .topic{
        display: block;
        color: #666;
        margin-top: 5px;
    }

    .queue-div{
        transition: .3s;
    }

    .queue-active{
        background-color: #ffdb00;
    }

    .queue-active .faClock{
        color: #333;
    }

    .services{
        background-color: #fff;
        text-align: center;
        display: none;
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

    .dot-checked{
        display: none;
    }

    .status .left{
        width: 50%;
        display: inline-block;
    }
    .status .right{
        width: 50%;
        display: inline-block;
    }

    .section-loader img{
        position: absolute;
        width: 50px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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
</style>