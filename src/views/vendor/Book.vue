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
            <Header :showCustomersArea="false" :returnButton="true"></Header>

            <div class="section-loader" v-if="!vendor">
                <img src="/images/loader-circle.gif" alt="Agil section loader">
            </div>

            <div class="vendors row" id="main" style="text-align: center;" v-else>
                <div class="vendor-name">
                    {{vendor.name}}
                </div>
                
                <div class="department" v-if="vendor.departments.length>1">
                    <!-- <label for="departments">Choisir un departement</label> -->
                    <select @change="resetDepartment()" id="departments" class="dep-select select" v-model="selected_department">
                        <option :value="null">Choisir un departement</option>
                        <option :value="department" v-for="department in vendor.departments" :key="department.id"> 
                            {{department.name}}
                        </option>
                    </select>
                </div>

                <div class="members" v-if="selected_department!=null && selected_department.dep_members.length>0">
                    <label for="members">Choisir un agent</label>
                    <div 
                        :class="(selected_member==member.id)?'member selected-member':'member'" 
                        v-for="member in selected_department.dep_members" 
                        :key="member.id" 
                        @click="selectMember(member.id)"
                    >
                        <div class="image">
                            <img :src="member.photo" alt="" v-if="member.photo">
                            <img src="/images/member.jpg" alt="" v-else>
                        </div>
                        <div class="infos">
                            {{member.fname}} {{member.lname}}
                        </div>
                    </div>
                </div>

                <div 
                    class="dates" 
                    v-if="selected_department!=null && (selected_department.dep_members.length==0 || selected_member!=null)"
                >
                    <div 
                        @click="selectDate(date)" 
                        :class="
                            (selected_date==date.date)?'date date-selected':(date.active==0)?'date date-closed':'date'
                            
                        " 
                        v-for="date in available_dates" 
                        :key="date.date"
                    >
                        <img src="/images/calendar.png" alt="">
                        <span>{{date.date}}</span>
                    </div>
                </div>

                <div 
                    class="slots" 
                    v-if="
                        selected_department!=null
                        && (selected_department.dep_members.length==0 || selected_member!=null) 
                        && selected_date!=null
                    "
                >
                    <label>Séléctionner le temps du rendez-vous</label>
                    <div 
                        @click="selectSlot(slot)" 
                        :class="
                            (selected_slot==slot.slot)?'date date-selected':(slot.active==0)?'date date-closed':'date'
                            
                        " 
                        v-for="slot in available_time_slots" 
                        :key="slot.slot"
                    >
                        <span>{{slot.slot}}</span>
                    </div>
                </div>

                <div 
                    class="services"
                    v-if="
                        selected_department!=null
                        && (selected_department.dep_members.length==0 || selected_member!=null) 
                        && selected_date!=null
                        && selected_slot!=null
                    "
                >
                    <label>Choisir vos services</label>
                        <div :class="'service service-'+service.id" v-for="service in services" :key="service.id" @click="selectService(service.id)">
                            <img :class="'dot dot'+service.id" src="/images/dot.png" alt="Agil dot">
                            <img :class="'dot dot-checked dot-checked'+service.id" src="/images/dot-checked.png" alt="Agil dot">
                            <span>{{JSON.parse(service.translations)['fr']}}</span>
                        </div>
                    </div>
                </div>
                <div id="ErrorBookingSteps">
                    <img src="/images/cancel.png" alt="">
                    Veuillez terminer toutes les étapes avant de demander un rendez-vous
                </div>
                <div class="buttons row p-0 m-0">
                    <div class="row p-0 m-0 w-100">
                        <div class="col-lg-3 col-md-3 col-sm-12"></div>
                        <div class="col-lg-6 col-md-6 col-sm-12 inscription-button-div">
                            <button 
                                :class="
                                    (selected_department!=null
                                        && (selected_department.dep_members.length==0 || selected_member!=null) 
                                        && selected_date!=null
                                        && selected_slot!=null
                                        && selected_services.length>0
                                    )?'rdv-btn':'rdv-btn btn-rdv-closed'
                                " 
                                @click="submitBooking()"
                            >
                                <img class="icon" src="/images/calendar.png" alt="">
                                <span>PRISE</span>
                                <span>DE RENDEZ-VOUS</span>
                            </button>
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
    import { vendorsService, bookingService } from '../../_services'
    import $ from 'jquery'
    import moment from 'moment'

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    export default({
        data:()=>({
            loader: false,
            circle_loader: false,
            user_account: JSON.parse(localStorage.getItem('user')),
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
            organization_id: 11,
            selected_department: null,
            selected_member: null,
            selected_date: moment().format('DD-MM-YYYY'),
            available_dates: [],
            available_time_slots: [],
            selected_slot: null,
            services: [],
            selected_services: [],
            duration: 20
        }),
        methods:{
            resetDepartment(){
                this.selected_member=null
                this.selected_slot= null
                this.selected_services= []
                $('#ErrorBookingSteps').slideUp()
                this.getAvailableSlots()
            },
            selectMember(member_id){
                this.services= []
                if(this.selected_member==member_id){
                    this.selected_member= null;
                }else{
                    this.selected_member= member_id;
                }
            },
            selectDate(date){
                if(date.active){
                    this.selected_date= date.date;
                    this.getAvailableSlots()
                }
            },
            getAvailableSlots(){
                this.loader= true
                let data = {
                    business_id: this.vendor.id,
                    //Format date for api
                    date: this.formatDateForAPI(this.selected_date),
                    department: this.selected_department ? this.selected_department.id : null,
                    user: (this.account_info)?this.account_info.id:null
                };

                bookingService
                    .getAvailability(data)
                    .then(
                    function(data) {
                        this.available_time_slots = data.slots;
                        this.loader = false;
                            $("html, body").animate({ scrollTop: 100 }, 1000);
                    }.bind(this)
                    )
                    .catch(function() {
                        this.available_time_slots = [];
                        this.loader = false;
                    }.bind(this));
            },
            formatDateForAPI(date){
                let dates= date.split('-')
                return dates[2]+'-'+dates[1]+'-'+dates[0]
            },
            selectSlot(slot){
                this.services= []
                this.selected_services= []
                if(slot.active){
                    this.selected_slot= slot.slot;
                    if(this.selected_department!=null){
                        if(this.selected_department.services.length){
                            this.services= this.selected_department.services
                        }else{
                            this.services= this.vendor.services
                        }
                    }else{
                        this.services= this.vendor.services
                    }
                }
            },
            selectService(service_id, forceCheck=false){
                if($('.dot'+service_id).is(":visible") || forceCheck){
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
            submitBooking(){
                if(
                    this.selected_department!=null
                    && (this.selected_department.dep_members.length==0 || this.selected_member!=null) 
                    && this.selected_date!=null
                    && this.selected_slot!=null
                    && this.selected_services.length>0
                ){
                    $('#ErrorBookingSteps').slideUp("slow", function(){
                        this.loader= this

                        let date = moment(this.formatDateForAPI(this.selected_slot), "HH:mm").add(this.duration, "minutes").format("HH:mm");
                        let end = moment(this.formatDateForAPI(this.selected_date)).format("YYYY-MM-DD") + " " + date;

                        let data = new FormData();
                        data.append('business_id', this.vendor.id);
                        data.append('services', this.selected_services);
                        data.append('department_id', this.selected_department ? this.selected_department.id : null);
                        data.append('member_id', this.selected_member );
                        data.append('start_datetime', this.formatDateForAPI(this.selected_date)+' '+this.selected_slot);
                        data.append('end_datetime', end);
                        // if(this.vendor!=null &&this.vendor.bookingSettings!=null && this.vendor.bookingSettings.input || this.vendor!=null &&this.vendor.bookingSettings!=null && this.vendor.bookingSettings.map == 1){
                        // data.append('additionalData', JSON.stringify(additionalInputs));
                        // }
                        // if(document.getElementById('attachments_input')){
                        //     let fileInput = document.getElementById('attachments_input').files;
                        //     for(var i=0; i<fileInput.length;i++){
                        //         data.append('attachments_'+i, document.getElementById('attachments_input').files[i]);
                        //     }
                        //     data.append('attachments_total', i);
                        // }
                        data.append('_method', 'PUT');

                        bookingService
                            .createBooking(data)
                            .then(function(data) {
                                this.$router.push('/booking_request/'+data.booking.unique_id)
                            }.bind(this))
                            .finally(function() { this.$loading.hide(); }.bind(this))
                            .catch(function() {
                                $('#ErrorBookingRequest').slideDown()
                            }.bind(this));
                    }.bind(this))
                }else{
                    $('#ErrorBookingSteps').slideDown()
                }
            }
        },
        mounted(){
            vendorsService.getByHashedId(this.$route.params.id, this.organization_id).then(function(data){
                console.log(data)
                this.vendor= data.data
                if(this.vendor.departments.length==1){
                    this.selected_department= this.vendor.departments[0].id
                }
                
                //DEFAULT TO 30 DAYS IF NOT SET
                this.vendor.max_booking_days_before= this.vendor.max_booking_days_before==-1?30:this.vendor.max_booking_days_before;
                let i= 0;
                let searched_day= new Date().getDay()

                while(i < this.vendor.max_booking_days_before){
                    if( this.vendor.booking_days[searched_day].active==0 ){
                        this.vendor.max_booking_days_before++
                        this.available_dates.push({
                            date: moment(new Date().addDays(i)).format('DD-MM-YYYY'),
                            active: 0
                        });
                    }else{
                        this.available_dates.push({
                            date: moment(new Date().addDays(i)).format('DD-MM-YYYY'),
                            active: 1
                        });
                    }
                        i++
                    searched_day= (searched_day == 6 )? 0 : searched_day+1;
                }
                this.getAvailableSlots()
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

    .vendor-name{
        letter-spacing: 2px;
        font-size: 25px;
    }

    .department{
        display: block;
        margin-top: 20px;
    }

    .department label{
        display: block;
    }

    .department select{
        width: 90%;
        height: 40px;
        margin-top: 10px;
        color: #fff !important;
        padding: 0 10px;
        border-radius: 5px;
        outline: none;
    }

    .members{
        width: 100%;
        margin-top: 20px;
        display: block;
        padding: 0px;
    }

    .members label{
        display: block;
    }
    .member{
        width: 45%;
        display: inline-block;
        border: 1px solid #ddd;
        margin-top: 20px;
        border-radius: 5px;
        padding: 0 5px;
        position: relative;
        margin-left: 5px;
        transition: .5s;
    }
    .member .image{
        display: inline-block;
        width: 30%;
        padding: 0;
        margin-top: 5px;
        margin-bottom: 1px;
        float: left;
    }
    .selected-member{
        background: #ffdb00 !important;
    }
    .member .image img{
        width: 100%;
        border-radius: 5px;
    }
    .member .infos{
        display: inline-block;
        width: 70%;
        position: absolute;
        top: 50%;
        transform: translate(0%, -50%);
        left: 30%;
        padding-left: 10px;
    }

    .dates{
        width: 100;
        height: 40px;
        overflow-x: scroll;
        white-space: nowrap;
        margin-top: 20px;
    }
    .dates .date{
        display: inline-block;
        border: 1px solid #ddd;
        margin: 0 10px;
        padding: 5px 10px;
        border-radius: 5px;
        transition: .5s;
        position: relative;
        background: #fff;
    }
    .dates .date img{
        width: 15px;
        position: absolute;
        margin-top: 2px;
    }
    .dates .date span{
        padding-left: 20px;
    }
    .dates .date-selected{
        background: #ffdb00;
    }

    .date-closed{
        background: #888 !important;
        color: #fff !important;
        cursor: not-allowed;
        opacity: .2;
    }

    .slots{
        margin-top: 20px;
    }
    .slots label{
        margin-bottom: 20px;
        display: block;
    }
    .slots .date{
        display: inline-block;
        border: 1px solid #aaa;
        margin: 0 10px;
        margin-bottom: 10px;
        padding: 5px 10px;
        border-radius: 5px;
        transition: .5s;
        background: #fff;
    }
    .slots .date-selected{
        background: #ffdb00;
    }

    .services{
        background-color: #fff;
        text-align: center;
    }

    .services label{
        display: block;
        margin-bottom: 20px;
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

    .dot-checked{
        display: none;
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
        width: 45px;
        display: inline-block;
        position: absolute;
        margin-top: -2px;
    }

    .btn-rdv-closed{
        background: #888 !important;
        color: #fff !important;
    }

    #ErrorBookingSteps{
        background: #dc3545;
        color: #fff;
        padding: 50px 20px 20px 20px;
        margin-top: 25px;
        text-align: center;
        position: relative;
        display: none;
    }

    #ErrorBookingSteps img{
        width: 30px;
        display: block;
        position: absolute;
        left: 50%;
        top: 10px;
        transform: translate(-50%, 0%);
    }
</style>