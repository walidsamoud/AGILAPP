<template>
<ion-page>
    <ion-content id="ionContent" :fullscreen="true">
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title size="large">Splash screen</ion-title>
            </ion-toolbar>
        </ion-header>

        <div id="Login">
            <div><img src="/images/placeholder.png" class="placeholder" alt="Agil placeholder"></div>
            <Header :showCustomersArea="false"></Header>

            <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-12"></div>
                <div class="col-lg-6 col-md-6 col-sm-12 description">
                    <span class="title">VOTRE RENDEZ-VOUS</span>
                    <span class="topic">
                        Avec AGILAPP, vous pouvez prenez un rendez-vous ou joindre la file d'attente en ligne, 
                        et suivre votre tour via notre application.
                    </span>
                </div>
            </div>

            <div class="section-loader" v-if="!vendors.length">
                <img src="/images/loader-circle.gif" alt="Agil section loader">
            </div>

            <div class="vendors row" v-for="item in vendors" :key="item.id" @click="openVendor(item.hashedid)">
                <div class="col-lg-3 col-md-3 col-sm-12"></div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="vendor">
                        <div class="image">
                            <img src="/images/agil.png" alt="Agil logo">
                        </div>
                        <div class="infos">
                            <span class="name">{{item.name}}</span>
                            <span class="phone">
                                <img src="/images/phone.png" class="icon icon-phone" alt="">
                                {{item.phone}}
                            </span>
                            <span class="desc">
                                <img src="/images/marker.png" class="icon icon-marker" alt="">
                                {{(item.address.length>30)?item.address.substring(0,25)+'...':item.address}}
                            </span>
                        </div>
                        <div class="crowd">
                            <img  v-if="!item.status" src="/images/crowd.png" alt="Agil crowd">
                            <img  v-else-if="item.shortest_waiting_time==0" src="/images/crowd.png" alt="Agil crowd">
                            <img  v-else-if="item.shortest_waiting_time<10" src="/images/crowd1.png" alt="Agil crowd">
                            <img  v-else-if="item.shortest_waiting_time<=30" src="/images/crowd2.png" alt="Agil crowd">
                            <img  v-else-if="item.shortest_waiting_time<=45" src="/images/crowd3.png" alt="Agil crowd">
                            <img  v-else-if="item.shortest_waiting_time<=60" src="/images/crowd4.png" alt="Agil crowd">
                            <img  v-else src="/images/crowd5.png" alt="Agil crowd">

                            <span v-if="item.status" class="badge badge-success">Open</span>
                            <span v-else class="badge badge-danger">Closed</span>
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
    import { vendorsService } from '../../_services'
    import { Geolocation } from '@capacitor/geolocation';

    export default({
        data:()=>({
            vendors: [],
            currentPage: 1,
            totalItems: 0,
            totalPages: 0,
            from: 0,
            to: 0,
            position: {
                lat: 36,
                lng: 10
            },
        }),
        methods:{
            openVendor(index){
                window.location.href= '/vendor/'+index
            },
            getPosition(position) {
                this.position = {lat: position.coords.latitude, lng: position.coords.longitude};
                this.filter(this.currentPage);
                console.log('Current position:', this.position);
            },
            filter(page){
                this.vendors = [];
                let data = {
                    organization : 11,
                    lat: this.position.lat, 
                    lng: this.position.lng,
                    radius: 1600,
                };

                vendorsService.filter(data, page).then(function (data) {
                    console.log(data);

                    this.currentPage = page;
                    this.totalItems = data.data.total;
                    this.maxItems = data.data.per_page;
                    this.totalPages = data.data.last_page;
                    this.from = data.data.from ? data.data.from : 0;
                    this.to = data.data.to ? data.data.to : 0;
                    this.vendors = data.data.data;

                    //CHECK IF TODAY IS IN HOLIDAY
                    // this.vendors = data.data.data.map((vendor) => {
                    //     vendor.open = 
                    //         this.vendor.status ||
                    //         moment( moment().format('YYYY-MM-DD H:m:i') ).isBetween(
                    //             obj.start_date,
                    //             obj.end_date,
                    //             null, // can be year, month .... the granularity of your comaprison
                    //             '[]'
                    //         );
                    //     return vendor;
                    // });
                }.bind(this))
            }
        },
        mounted(){
            // navigator.geolocation.getCurrentPosition(this.getPosition);
            var options = {
                timeout: 20000 //sorry I use this much milliseconds
            }
            Geolocation.getCurrentPosition(options).then(data=>{
                this.position.lng = data.coords.longitude;
                this.position.lat = data.coords.latitude;
                this.filter(this.currentPage);
                console.log(this.position);
            }).catch((err)=>{
                console.log("Error", err);
            });
        },
        components: { Header, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }

    })
</script>

<style scoped>
    #Login{
        width: 100vw;
        height: 100vh;
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

    .vendors{
        padding: 0 20px;
        margin-top: 20px;
    }

    .vendor{
        box-shadow: 0 0 8px 1px #ccc;
        border-radius: 10px;
        padding: 10px;
        transition: .5s;
        position: relative;
        cursor: pointer;
        background: #fff;
    }

    .vendor .image {
        display: inline-block;
        width: 20%;
    }

    .vendor .image img {
        width: 100%;
    }

    .vendor .infos{
        width: 55%;
        display: inline-block;
        position: absolute;
        top: 10px;
        padding: 10px 20px;
    }

    .vendor .name{
        font-weight: 600;
        display: block;
    }

    .vendor .phone{
        display: block;
        font-size: 14px;
        margin-top: 5px;
    }

    .vendor .desc{
        display: block;
        margin-top: 5px;
        font-size: 12px;
    }

    .vendor .crowd{
        display: inline-block;
        text-align: center;
        width: 20%;
        float: right;
        vertical-align: middle !important;
    }

    .vendor .crowd img{
        width: 100%;
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
    }

    .badge-danger{
        background: #dc3545;
    }
    .badge-success{
        background: green;
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
</style>