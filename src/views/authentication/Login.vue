<template>
<ion-page>
    <ion-content id="ionContent" :fullscreen="true">
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title size="large">Login</ion-title>
            </ion-toolbar>
        </ion-header>
        
        <Loader v-if="loader"></Loader>

        <div id="Login">
            <div><img src="/images/placeholder.png" class="placeholder" alt="Agil placeholder"></div>
            <div class="logo">
                <img :src="'/images/agil.png'" class="logo-img" alt="Agil logo">
            </div>

            <div class="customers-area" :style="(user.have_code)?'margin-top: -80px':''">
                <img src="/images/customers.png" class="customers-logo" alt="Agil customers">
                <span class="espace">Espace</span>
                <span class="clients">Clients</span>
            </div>

            <div class="buttons row p-0 m-0">
                <div class="row p-0 m-0 w-100">
                    <div class="col-lg-3"></div>
                    {{yourValue}}
                    <div class="col-lg-6 col-md-12 loginForm">
                        <div style="text-align: center;">
                            <small class="valid" v-if="valid.account_created">Compte créé avec succès, veuillez saisir le code de validation envoyé à votre numéro de téléphone</small>
                        </div>
                        <input type="tel" placeholder="N° Téléphone.." class="inputAuth phone" v-model="user.phone">
                        <small class="error" v-if="errors.phone">Numéro de téléphone est invalide</small>
                        <div class="code-div">
                            <input id="haveCode" type="checkbox" class="have-code" v-model="user.have_code">
                            <label for="haveCode">J'ai déja un code de vérification</label>
                        </div>
                        <input type="tel" placeholder="CODE" class="inputAuth code" maxlength="6" v-model="user.code" v-if="user.have_code">
                        <small class="error" v-if="errors.code">Code de vérification est invalide</small>
                    </div>

                    <div class="col-lg-6 col-md-12 inscriptionForm">
                        <div style="text-align: center;">
                            <small class="error" v-if="errors.should_register">Vous devez créer un compte avec ce numéro de téléphone d'abord</small>
                            <small class="error" v-if="errors.register_failed">Une erreur s'est produite ou le numéro de téléphone est déjà utilisé, veuillez réessayer avec un autre</small>
                        </div>
                        
                        <input type="tel" placeholder="N° Téléphone.." class="inputAuth phone" v-model="user.phone">
                            <small class="error" v-if="errors.phone">Vous devez entrer un numéro de téléphone valide</small>
                        <input type="text" placeholder="Prénom.." class="inputAuth prenom" v-model="user.prenom">
                            <small class="error" v-if="errors.prenom">Merci d'entrer un prénom valide</small>
                        <input type="text" placeholder="Nom de famille.." class="inputAuth nom" v-model="user.nom">
                            <small class="error" v-if="errors.nom">Merci d'entrer un nom valide</small>
                        <input type="email" placeholder="Email.." class="inputAuth email" v-model="user.email">
                    </div>
                </div>
                <div class="row p-0 m-0 w-100">
                    <div class="col-lg-3"></div>
                    <div class="col-md-12 col-lg-6 login-button-div">
                        <button class="log" @click="showLogin()">LOGIN</button>
                    </div>
                </div>
                <div class="row p-0 m-0 w-100">
                    <div class="col-lg-3"></div>
                    <div class="col-md-12 col-lg-6 inscription-button-div">
                        <button class="insc" @click="showRegister()">INSCRIPTION</button>
                    </div>
                </div>
            </div>
        </div>
    </ion-content>
</ion-page>
</template>

<script>
    import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
    import Loader from '../../components/loader/Loader.vue'
    import $ from 'jquery'
    
    import { userService } from '../../_services'

    export default({
        data:()=>({
            user: {
                phone: '',
                have_code: false,
                code: '',
                prenom: '',
                nom: '',
                email: ''
            },
            country: {
                dialCode: '216',
                iso2: 'TN'
            },
            errors:{
                phone: false,
                code: false,
                should_register: false,
                prenom: false,
                nom: false,
                email: false,
                register_failed: false
            },
            valid: {
                account_created: false
            },
            yourValue: "",
            ready_to_login: false,
            ready_to_register: false,
            loader: false
        }),
        methods:{
            showLogin(){
                if(!this.ready_to_login){
                    $('.inscription-button-div').slideUp('slow', function(){
                        $('.loginForm').slideDown(function(){
                            $('.login-button-div > .log').html('Envoyer un code de vérification')
                            $('.login-button-div > .log').css('font-size', '15px')
                        });
                    })
                    this.ready_to_login= true;
                }else{
                    if(this.user.have_code==true && this.user.code.length>0 ){
                        this.verifyLoginCode();
                    }else{
                        this.submitLogin();
                    }
                }
            },
            showRegister(){
                if(!this.ready_to_register){
                    $('.login-button-div').slideUp('slow', function(){
                        $('.inscriptionForm').slideDown(function(){
                            $('.customers-area').fadeOut()
                        });
                    })
                    this.ready_to_register= true;
                }else{
                    this.submitRegister()
                }
            },
            submitLogin(){
                this.loader= true;
                    if(this.validateLoginForm()){
                        let data = {
                            phone: this.user.phone.toString().replace(/ /g, ""),
                            phone_prefix: "+" + this.country.dialCode,
                        };
                        userService.login(data.phone, data.phone_prefix)
                            .then(
                            function () {
                                this.user.have_code = true;
                                $('#haveCode').prop('disabled', true);
                                $('.login-button-div > .log').html('Se connecter')
                            }.bind(this)
                            )
                            .catch(
                            function (ex) {
                                console.log(ex)
                                if(
                                    ex=='Please sign up! No account associated to the phone number.'
                                    || ex=="Inscrivez vous s'il vous plait! Aucun compte associé au numéro de téléphone."
                                ){
                                    this.switchLoginToRegister()
                                }else{
                                    this.errors.phone= true;
                                }
                            }.bind(this)
                            )
                            .finally(
                            function () {
                                this.loader= false;
                            }.bind(this)
                            );
                    }else{
                        this.loader= false;
                    }
            },
            verifyLoginCode(){
                this.loader= true;
                let user = {
                    phone: this.user.phone.toString().replace(/ /g, ""),
                    phone_prefix: "+" + this.country.dialCode,
                    code: this.user.code
                };
                userService.verify(user).then(function(data){

                    async () => {
                        await Storage.set({
                            key: 'user',
                            value: data,
                        });
                    }

                    async () => {
                        const { value } = await Storage.get({ key: 'user' });
                        alert(`Hello ${value}!`);
                    };
                    
                    this.$router.push('/home');
                }.bind(this)).catch(function(){
                    this.errors.code= true;
                }.bind(this)).finally(function(){
                    this.loader= false;
                }.bind(this))
            },
            submitRegister(){
                this.loader= true;
                if(this.validateRegisterForm()){
                    let data = {
                        phone: this.user.phone.toString().replace(/ /g, ""),
                        phone_prefix: "+" + this.country.dialCode,
                        fullname: this.user.prenom + " " + this.user.nom,
                        email: this.user.email,
                        country: this.country.iso2,
                    };

                    userService.register(data)
                        .then(
                        function () {
                            this.user.have_code = true;
                            this.switchRegisterToLogin();
                            this.ready_to_login = true;
                            $(".code").trigger("click");
                        }.bind(this)
                        )
                        .finally(
                        function () {
                            this.loader= false;
                        }.bind(this)
                        )
                        .catch(
                        function () {
                            this.errors.should_register = false;
                            this.errors.register_failed = true;
                        }.bind(this)
                        );
                }else{
                    this.loader= false;
                }
            },
            validateLoginForm(){
                this.errors.phone =  (this.user.phone.length==0);
                return !this.errors.phone;
            },
            validateRegisterForm(){
                this.errors.phone =  (this.user.phone.length<5) || (this.user.phone.length>20);
                this.errors.prenom =  (this.user.prenom.length<3) || (this.user.phone.length>20);
                this.errors.nom =  (this.user.nom.length<3) || (this.user.phone.length>20);

                return !this.errors.phone && !this.errors.prenom && !this.errors.nom;
            },
            switchLoginToRegister(){
                $('.loginForm').slideUp('slow')

                $('.login-button-div').slideUp('slow', function(){
                    $('.inscriptionForm').slideDown(function(){
                        $('.customers-area').fadeOut()
                        $('.inscription-button-div').slideDown('slow')
                    });
                })
                this.errors.should_register= true
            },
            switchRegisterToLogin(){
                $('.inscriptionForm').slideUp('slow')

                $('.inscription-button-div').slideUp('slow', function(){
                    $('.loginForm').slideDown(function(){
                        $('.customers-area').fadeIn()
                        $('.login-button-div').slideDown('slow')
                    });
                })
                this.valid.account_created= true
            }
        },
        mounted(){
            $('#ionTabBar').hide()
            if( localStorage.getItem('user') ){
                this.$router.push('/home');
            }

        async () => {
            await Storage.set({
                key: 'name',
                value: 'Walid',
            });
        }

        async () => {
            const { value } = await Storage.get({ key: 'name' });
            alert(`Hello ${value}!`);
        };
        },
        components: { Loader, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
    })
</script>

<style scoped>
    #Login{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
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

    .logo{
        text-align: center;
        width: 100%;
        margin-top: 10px;
    }

    .logo-img{
        width: 15vh !important;    
    }

    .customers-area{
        position: absolute;
        top:55%;
        left:50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .customers-logo{
        height: 15vh;
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
        margin-top: -5px;
        color: #888;
        letter-spacing: 3px;
        text-transform: uppercase;
    }

    .buttons{
        position: absolute;
        bottom: 3%;
        left: 50%;
        transform: translate(-50%, 0%);
        width: 100%;
        padding: 0 10px;
    }

    .buttons button{
        width: 100%;
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
    }

    .buttons button:hover, .buttons button:focus{
        background-color: #ffdd00c5;
    }

    .loginForm, .inscriptionForm{
        display: none;
    }

    .inputAuth{
        margin-top: 10px;
        height: 60px;
        width: 100%;
        border: none;
        background-color: #fff;
        color: #888;
        letter-spacing: 2px;
        outline: none;
        padding: 0 10px;
        box-shadow: 0 0 8px 2px  #ddd;
        border-radius: 10px;
    }

    .code-div{
        margin-top: 10px;
        margin-left: 10px;
    }

    .code-div label{
        margin-left: 10px;
        letter-spacing: 1px;
    }

    .code{
        letter-spacing: 10px;
        text-align: center;
    }

    .error{
        color: red;
    }

    .valid{
        color: green;
    }
</style>