<template>
<ion-page>
    <ion-content id="ionContent" :fullscreen="true">
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title size="large">Profile</ion-title>
            </ion-toolbar>
        </ion-header>

        <div id="Login">
            <Loader v-if="loader"></Loader>
            <div><img src="/images/placeholder.png" class="placeholder" alt="Agil placeholder"></div>

            <div class="section-loader" v-if="!user_account">
                <img src="/images/loader-circle.gif" alt="Agil section loader">
            </div>

            <div class="vendors row" v-else>
                <div class="header">
                    <label for="fileInput" class="image">
                        <img v-if="user_account.photo" :src="user_account.photo" alt="">
                        <img v-else src="/images/user-placeholder.jpg" alt="">
                    </label>
                        <input type="file" id="fileInput" style="display: none;">
                    <div class="infos">
                        <b>{{user_account.fullname}}</b>
                        <span>membre Agil dépuis</span>
                        <span>{{user_account.created_at.split(' ')[0]}}</span>
                    </div>
                </div>

                <div class="profile">
                    <span class="title">Profile:</span>
                    <hr style="background: #ddd">
                    <div class="input-div">
                        <label for="name">Nom & Prénom</label>
                        <input class="input" type="text" id="name" placeholder="Nom & Prénom" v-model="user_account.fullname">
                    </div>
                    <div class="input-div">
                        <label for="email">Email</label>
                        <input class="input" type="text" id="email" placeholder="Email" v-model="user_account.email">
                    </div>
                    <div class="input-div">
                        <label for="phone">Numéro de téléphone</label>
                        <input class="input" type="text" id="phone" placeholder="Numéro de téléphone" v-model="user_account.phone" disabled style="cursor: not-allowed;background: #ddd;"> 
                    </div>
                </div>

                <div class="buttons row p-0 m-0">
                    <div class="row p-0 m-0 w-100">
                        <div class="col-lg-3 col-md-3 col-sm-12"></div>
                        <div class="col-lg-6 col-md-6 col-sm-12 queue-div">
                            <button class="queue-btn" @click="edit()">
                                <img class="icon" src="/images/edit.png" alt="">
                                <span>MODIFIER</span>
                                <span>MON COMPTE</span>
                            </button>
                        </div>
                    </div>
                    <div class="row p-0 m-0 w-100">
                        <div class="col-lg-3 col-md-3 col-sm-12"></div>
                        <div class="col-lg-6 col-md-6 col-sm-12 inscription-button-div">
                            <button class="btn-danger rdv-btn" @click="logout">
                                <img class="icon" src="/images/logout.png" alt="">
                                <span>DECONNECTER</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <br>
        </div>

        <div class="toasts">
            <ion-toast
                :is-open="error_edit"
                message="Un erreur est survenue! veuillez réessayer plus tard."
                :duration="3000"
                color="danger"
                @didDismiss="error_edit=false"
            >
            </ion-toast>
            <ion-toast
                :is-open="success_edit"
                message="votre compte a été modifié avec succès."
                :duration="3000"
                color="tertiary"
                @didDismiss="error_edit=false"
            >
            </ion-toast>
        </div>
    </ion-content>
</ion-page>
</template>

<script>
    import { IonToast, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
    import Loader from '../../components/loader/Loader.vue'
import { userService } from '../../_services';

    
    export default({
        data:()=>({
            success_edit: false,
            error_edit: false,
            loader: false,
            user_account: JSON.parse(localStorage.getItem('user'))
        }),
        methods:{
            edit(){
                this.loader= true
                let data = new FormData();

                data.append('fullname', this.user_account.fullname);
                data.append('email', this.user_account.email);
                data.append('_method', 'PUT');
                if(document.getElementById("fileInput").files[0]){
                    data.append('photo', document.getElementById("fileInput").files[0]);
                }

                userService.update(data).then(function (data) {
                    this.success_edit= true

                    let actualUser = JSON.parse(localStorage.getItem('user'));
                    actualUser.fullname = data.user.fullname;
                    actualUser.email = data.user.email;
                    actualUser.photo = data.user.photo;
                    localStorage.setItem('user', JSON.stringify(actualUser));
                    this.user_account = actualUser;
                }.bind(this)).catch(function () {
                    this.edit_error= true
                }.bind(this)).finally(function () { 
                    this.loader= false
                }.bind(this));
            },
            logout(){
                this.loader= true
                userService.logout().catch(function(){
                    localStorage.removeItem('user');
                }).finally(function(){
                    this.loader= false
                    this.$router.push('/login')
                }.bind(this))
            }
        },
        mounted(){},
        components: { IonToast, Loader, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }

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
    .header{
        max-height: 300px;
        padding: 20px;
        background-image: linear-gradient(#ffdb00, #f7e576);
        text-align: center;
        border-radius: 0 0 20px 20px;
    }
    .header .image{
        width: 100%;
    }
    .header .image img{
        width: 100px;
        height: 100px;
        border-radius: 100%;
    }
    .header b{
        display: block;
        letter-spacing: 2px;
        margin-bottom: 10px;
    }
    .header span{
        display: block;
        margin-bottom: 5px;
    }
    .profile{
        padding: 20px;
        width: 100%;
    }
    .title{
        color: #333;
    }
    .input-div{
        width: 100%;
        margin-top: 10px;
    }
    .input-div label{
        display: block;
        color: #666;
        font-size: 12px;
    }
    .input{
        width: 100%;
        background: #fff;
        border: 1px solid #aaa;
        height: 30px;
        border-radius: 5px;
        padding: 5px 10px;
        color: #333;
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
        width: 45px;
        display: inline-block;
        position: absolute;
        margin-top: -13px;
    }

    .queue-btn span{
        padding-left: 70px;
        display: block;
    }
    .queue-btn .icon{
        width: 45px;
        display: inline-block;
        position: absolute;
        margin-top: -5px;
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
    .btn-danger{
        background: linear-gradient(to left,#db5260, #dc3545) !important;
        color: #fff !important;
    }
</style>