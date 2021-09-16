<template>
    <div id="Header">
        <div class="left-side">
            <a @click="$router.go(-1)" v-if="returnButton">
                <img :src="'/images/return-outlined.png'" class="tab return" alt="Agil return">
                <img :src="'/images/return-outlined-hover.png'" class="tab return-hover" alt="Agil return">
            </a>
            <a href="/" v-else>
                <img :src="'/images/tab.png'" class="tab" alt="Agil tabs">
            </a>
        </div>
        <div class="logo">
            <a href="/">
                <img :src="'/images/agil.png'" class="logo-img" alt="Agil logo">
            </a>
             <div v-if="showCustomersArea" class="customers-area" :style="(haveCode)?'margin-top: -80px':''">
                <img src="/images/customers.png" class="customers-logo" alt="Agil customers">
                <span class="espace">Espace</span>
                <span class="clients">Clients</span>
            </div>
        </div>
        <div class="right-side">
            <span class="fname">{{user_account.fullname[0]}}</span>
            <span class="lname">{{user_account.fullname[1]?user_account.fullname[1]:''}}</span>
            <span class="disconnect" @click="logout()">Déconnexion</span>
        </div>
    </div>
</template>

<script>
import { Storage } from '@capacitor/storage';

export default ({
    props:{
        haveCode: Boolean,
        showCustomersArea: Boolean,
        returnButton: Boolean
    },
    data:()=>({
        user_account: {
            fullname: '--- --'
        }
    }),
    methods:{
        logout(){
            localStorage.removeItem('user')
            window.location.href= '/login'
        },
        isMobile() {
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                alert(1)
                return 1
            } else {
                alert(0)
                return 0
            }
        }
    },
    mounted(){
        if( !this.isMobile() ){
            if(JSON.parse(localStorage.getItem('user'))==null || JSON.parse(localStorage.getItem('user'))==undefined || !JSON.parse(localStorage.getItem('user'))){
                window.location.href= '/login'
            }else{
                this.user_account= JSON.parse(localStorage.getItem('user'));
                this.user_account.fullname= this.user_account.fullname.split(' ');
            }
        }else{
            Storage.set({
                key: 'name',
                value: 'Walid',
            });

            let { value } =  Storage.get({ key: 'name' });
            alert(`Hello ${value}!`);
            window.location.href= '/login'
        }
    }
})
</script>

<style scoped>
    #Header{
        position: relative;
    }

    .logo{
        text-align: center;
        width: 100%;
        margin-top: 10px;
    }

    .logo-img{
        width: 15vh !important;    
    }

    .left-side{
        text-align: left;
        position: absolute;
        left: 20px;
        top: 10px;
    }

    .tab{
        width: 50px;
        height: 40px;
        transition: .3s;
    }

    .right-side{
        text-align: right;
        position: absolute;
        right: 20px;
        top: 10px;
    }

    .fname{
        display: block;
        font-weight: 600;
    }

    .lname{
        display: block;
        margin-top: 5px;
        font-weight: 400;
    }

    .disconnect{
        display: block;
        font-weight: 400;
        margin-top: 20px;
    }

    .customers-area{
        text-align: center;
        z-index: 1;
    }

    .customers-logo{
        height: 10vh;
        margin-top: 20px;
    }

    .espace{
        font-weight: 700;
        display: block;
        font-size: 20px;
        color: #888;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-top: -25px;
    }

    .clients{
        font-weight: 750;
        display: block;
        font-size: 25px;
        margin-top: -7px;
        color: #888;
        letter-spacing: 3px;
        text-transform: uppercase;
    }

    .return-hover{
        display: none;
        transition: .3s;
    }

    .return:hover{
        display: none;
    }

    .return:hover ~ .return-hover{
        display: block;
    }
</style>