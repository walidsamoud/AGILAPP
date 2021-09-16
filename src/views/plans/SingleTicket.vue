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
            <Header :showCustomersArea="true"></Header>

            <div class="section-loader" v-if="!ticket">
                <img src="/images/loader-circle.gif" alt="Agil section loader">
            </div>

            <div class="row" v-else>
                <!-- <div class="infos">
                    <p class="name">{{ticket.fname}} {{ticket.lname}}</p>
                    <p class="checkin-date">Arrivé a {{ticket.checkinTime.substr(0,5)}}</p>
                </div> -->

                <div class="ticket-infos">
                    <table>
                        <tr>
                            <td class="rank">
                                <span class="number">#{{ticket.queue_rank}}</span>
                                <span class="topic">Rang</span>
                            </td>
                            <td class="waitingtime" v-if="waiting_time_formatted=='--'">
                                <span class="number"> {{waiting_time_formatted}}</span>
                                <span class="topic">Estimation d'attente</span>
                            </td>
                            <td class="waitingtime" v-else>
                                <b class="topic">C'est votre tour maintenant</b>
                            </td>
                        </tr>
                    </table>
                    <div class="ticket-number">
                        <span class="topic">Numéro de votre ticket</span>
                        <span class="number"> {{ticket.public_identifier}} </span>
                    </div>
                </div>

                <div class="services">
                    <div :class="'service'" v-for="service in ticket.services" :key="service.id">
                        <img :class="'dot'" src="/images/dot-checked.png" alt="Agil dot">
                        <span>{{JSON.parse(service.translations)['fr']}}</span>
                    </div>
                </div>

                <div class="buttons row p-0 m-0">
                    <div class="row p-0 m-0 w-100">
                        <div class="col-lg-3 col-md-3 col-sm-12"></div>
                        <div class="col-lg-6 col-md-6 col-sm-12 queue-div">
                            <button class="pending-btn">
                                <img class="icon" src="/images/pending.png" alt="">
                                <span>Je suis en retard</span>
                                <!-- <span>En attente</span> -->
                            </button>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-12 queue-div">
                            <button class="pending-btn cancel-btn" @click="cancelTicketRequest()">
                                <img class="icon" src="/images/cancel.png" alt="">
                                <span>Annuler la ticket</span>
                                <!-- <span>la demande</span> -->
                            </button>
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
    import { queueService } from '../../_services'
    
    export default({
        data:()=>({
            ticket: null,
            waiting_time_formatted: '--',
            loader: false,
        }),
        methods:{
            cancelTicketRequest(){
                this.loader= true
                queueService.cancelRequest(this.ticket.id).then(function(data){
                    console.log(data)
                    this.$router.push('/home')
                }.bind(this)).finally(function(){
                    this.loader= false
                }.bind(this))
            },
            formatWaitingTime(waiting_seconds){
                if(waiting_seconds>0){
                    let h= Math.floor(waiting_seconds/3600);
                    let m= Math.floor(waiting_seconds/60);
                    let s= Math.floor(waiting_seconds%60);
                    return ((h!=0)?h+'h ':'')+m+'m '+s+'s';
                }else{
                    return '--'
                }
                
            }
            //Late : /business/queue/108590/late
            //Cancel [DELETE] : /user/queue/uid/df8cc3b0d509a863/cancel

        },
        mounted(){
            if(this.$route.params.uid!='0'){

                queueService.getTicketByUId(this.$route.params.uid).then(function(data){
                    this.ticket= data.ticket;
                    if(this.ticket.waiting_time>0){
                        setInterval(function(){
                            this.waiting_time_formatted= this.formatWaitingTime(this.ticket.waiting_time--)
                        }.bind(this),1000)
                    }
                }.bind(this)).catch(function(ex){
                    console.log(ex)
                    this.$router.push('/ticket_404')
                }.bind(this));
            }
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
        color: #000;
        font-weight: 700;
        font-size: 18px;
        letter-spacing: 1px;
        transition: .5s;
        text-align: left;
        padding: 0 40px;
    }

    .buttons .pending-btn:hover, .buttons .pending-btn:focus{
        background-color: #ffdd00a6 ;
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
        margin-top: -5px;
    }
    .cancel-btn{
        background-color: #dc3545 !important;
        color: #fff !important;
    }

    .services{
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

    .ticket-number{
        text-align: center;
        letter-spacing: 2px;
    }

    .ticket-number .topic{
        display: block;
        font-size: 17px;
        color: #666;
        text-transform: uppercase;
    }

    .ticket-number .number{
        font-weight: 900;
        display: block;
        font-size: 40px;
        color: #666;
    }

    .ticket-infos table{
        text-align: center;
        width: 100%;
        color: #666;
    }

    .ticket-infos table .rank{
        padding: 20px;
        text-align: center;
        width: 50%;
    }

    .ticket-infos table .rank .number{
        font-size: 25px;
        display: block;
    }

    .ticket-infos table .waitingtime{
        padding: 20px;
        text-align: center;
        width: 50%;
    }

    .ticket-infos table .waitingtime .number{
        font-size: 25px;
        display: block;
    }
    /* .waitingtime{
        position: relative;
    }
    .waitingtime img{
        width: 25px;
        display: block;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0%);
    } */
</style>