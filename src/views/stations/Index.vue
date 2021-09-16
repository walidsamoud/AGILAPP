<template>
<ion-page>
    <ion-content id="ionContent" :fullscreen="true">
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title size="large">Agil stations</ion-title>
            </ion-toolbar>
        </ion-header>
        <GMapMap
            :center="center"
            :disableDefaultUI="true"
            :zoom="12"
            ref="mapRef"
            id="map_right_listing"
            :options="{
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: true,
                disableDefaultUi: false,
            }"
            map-type-id="terrain"
            style="width: 100vw; height: 95vh"
        >
            <GMapCluster :zoomOnClick="true">
                <GMapMarker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    @click="opened_info_window=m.id"
                    :clickable="true"
                    :icon= '{
                        url: "/images/marker-agil.png",
                        scaledSize: {width: 40, height: 60},
                        labelOrigin: {x: 16, y: -10}
                    }'
                >
                    <GMapInfoWindow
                        :opened="opened_info_window==m.id"
                        style="color: #333 !important;"
                    >
                        <div class="title"> {{m.station.Name}}</div>
                        <div class="address"> 
                            <img src="/images/marker.png" alt="">
                            {{m.station.Localite}} {{m.station.Adresse}}
                        </div>
                        <br>
                        <div :class="(m.station.j2424=='')?'caracteristique-no':''">
                            <b>• Travaille 24/24: </b> 
                            <span  v-if="m.station.j2424!=''">Oui</span>
                            <span  v-else>Non</span>
                        </div>
                        <div :class="(m.station.Cafeteria=='')?'caracteristique-no':''">
                            <b>• Cafeteria: </b> 
                            <span  v-if="m.station.Cafeteria!=''">Oui</span>
                            <span  v-else>Non</span>
                        </div>
                        <div :class="(m.station.Shop=='')?'caracteristique-no':''">
                            <b>• Shop: </b> 
                            <span  v-if="m.station.Shop!=''">Oui</span>
                            <span  v-else>Non</span>
                        </div>
                        <div :class="(m.station.Lavage=='')?'caracteristique-no':''">
                            <b>• Lavage: </b> 
                            <span  v-if="m.station.Lavage!=''">Oui</span>
                            <span  v-else>Non</span>
                        </div>
                        <div :class="(m.station.CartePetroliere=='')?'caracteristique-no':''">
                            <b>• Carte Petroliére: </b> 
                            <span  v-if="m.station.CartePetroliere!=''">Oui</span>
                            <span  v-else>Non</span>
                        </div>
                        <div :class="(m.station.Gasoil50=='')?'caracteristique-no':''">
                            <b>• Gasoil 50: </b> 
                            <span  v-if="m.station.Gasoil50!=''">Oui</span>
                            <span  v-else>Non</span>
                        </div>
                        <div :class="(m.station.PetroleBleu=='')?'caracteristique-no':''">
                            <b>• Petrole bleu: </b> 
                            <span  v-if="m.station.PetroleBleu!=''">Oui</span>
                            <span  v-else>Non</span>
                        </div>
                        <div :class="(m.station.GazBouteille=='')?'caracteristique-no':''">
                            <b>• Gaz bouteille: </b> 
                            <span  v-if="m.station.GazBouteille!=''">Oui</span>
                            <span  v-else>Non</span>
                        </div>
                        <div :class="(m.station.GPL=='')?'caracteristique-no':''">
                            <b>• GPL: </b> 
                            <span  v-if="m.station.GPL!=''">Oui</span>
                            <span  v-else>Non</span>
                        </div>
                        <div :class="(m.station.Vidange=='')?'caracteristique-no':''">
                            <b>• Vidange: </b> 
                            <span  v-if="m.station.Vidange!=''">Oui</span>
                            <span  v-else>Non</span>
                        </div>
                        <div :class="(m.station.Melange2T=='')?'caracteristique-no':''">
                            <b>• Mélange 2T: </b> 
                            <span  v-if="m.station.Melange2T!=''">Oui</span>
                            <span  v-else>Non</span>
                        </div>
                        <div :class="(m.station.gasoil=='')?'caracteristique-no':''">
                            <b>• Gasoil: </b> 
                            <span  v-if="m.station.gasoil!=''">Oui</span>
                            <span  v-else>Non</span>
                        </div>
                        <div :class="(m.station.Lubrifiants=='')?'caracteristique-no':''">
                            <b>• Lubrifiants: </b> 
                            <span  v-if="m.station.Lubrifiants!=''">Oui</span>
                            <span  v-else>Non</span>
                        </div>
                        <div :class="(m.station.Lubrifiants=='')?'caracteristique-no':''">
                            <b>• Lubrifiants: </b> 
                            <span  v-if="m.station.Lubrifiants!=''">Oui</span>
                            <span  v-else>Non</span>
                        </div>
                        <div :class="(m.station.pneumatique=='')?'caracteristique-no':''">
                            <b>• Pneumatique: </b> 
                            <span  v-if="m.station.pneumatique!=''">Oui</span>
                            <span  v-else>Non</span>
                        </div>
                        <div :class="(m.station.diagnostique=='')?'caracteristique-no':''">
                            <b>• Diagnostique: </b> 
                            <span  v-if="m.station.diagnostique!=''">Oui</span>
                            <span  v-else>Non</span>
                        </div>
                    </GMapInfoWindow>
                </GMapMarker>
            </GMapCluster>
        </GMapMap>
    </ion-content>
</ion-page>
</template>

<script >
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
const stations= require('../../stations/stations.json')

export default {
    name: 'QrReader',
    data() {
        return {
            center: {lat: 36.093048, lng: 9.842120},
            markers: [],
            opened_info_window: null
        }
    },
    methods:{
        getPosition(position) {
            this.position = {lat: position.coords.latitude, lng: position.coords.longitude};
            this.center = this.position;
        }
    },
    mounted(){
        navigator.geolocation.getCurrentPosition(this.getPosition);
        
        let i= 1;
        stations.map((station)=>{
            this.markers.push({
                id: i,
                position: {
                    lat: Number(station.Latitude), lng: Number(station.Longitude)
                },
                station
            })
            i++
        });
    },
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>

<style scoped>
    .title{
        font-weight: bold;
        color: #333;
    }
    .address{
        color: #333;
        margin-top: 10px;
    }
    .address img{
        width: 15px;
    }
    .caracteristique-no{
        color: #dc3545;
    }
</style>