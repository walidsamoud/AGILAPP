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

            <div class="section-loader" v-if="true">
                <img src="/images/loader-circle.gif" alt="Agil section loader">
            </div>

            <div class="vendors row" v-else>
                
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
    
    export default({
        data:()=>({
            loader: false
        }),
        methods:{},
        mounted(){},
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