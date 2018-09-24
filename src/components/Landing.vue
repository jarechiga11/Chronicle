<!-- HTML -->
<template>
    <div class="app-landing">
        <b-container class="landing-container">
            <!-- Topbar -->
            <b-row class="top-row">
                <b-col class="top-nav">
                    <a href="#">
                       <img class="app-logo" src="https://firebasestorage.googleapis.com/v0/b/chronicle-firebase11.appspot.com/o/assets%2Flogo.png?alt=media&token=9550eecc-3252-4414-9836-057b26de46df" alt="Chronicle Logo"> 
                    </a>
                </b-col>
            </b-row>
            <!-- Quote -->
            <b-row align-v="center" class="center-row">
                <b-col>
                    <h1>A Chronicle of all your adventures, stories, and more</h1>
                </b-col>
            </b-row>
            <!-- Buttons -->
            <b-row>
                <!-- Sign Up -->
                <b-col cols="12">
                    <b-button v-b-modal.register-modal variant="outline-primary shadow-none" class="app-register-btn"><strong>Start Yours Today</strong></b-button>
                    <b-modal id="register-modal" class="landing-modal" centered hide-footer title="Sign Up">
                        <Register/>
                    </b-modal>
                </b-col>
                <!-- Login -->
                <b-col>
                    <b-button v-b-modal.login-modal variant="link" class="app-login-btn"><strong>Login</strong></b-button>
                    <b-modal id="login-modal" class="landing-modal" centered hide-footer title="Login">
                        <Login/>
                    </b-modal>
                </b-col>
            </b-row>
            <!-- Down Arrow -->
            <b-row class="bottom-row">
                <b-col>
                    <fa-icon class="down-icon" icon="chevron-down" size="2x"/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<!-- JavaScript -->
<script>
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

export default {
    name: 'Landing',
    components: {
        Login,
        Register
    },
    // data: {

    // },
    // props: {

    // },
    // methods: {

    // }
}
</script>

<!-- CSS -->
<style scoped>
.app-landing {
    height: 100vh;
    background-image: url('https://firebasestorage.googleapis.com/v0/b/chronicle-firebase11.appspot.com/o/assets%2Fhome-bg1.png?alt=media&token=25b5247f-c5a6-40f8-9988-a5da97694cbc');
    background-size: 100% auto;
    color: white;
}
.landing-container {
    height: 100vh;
}
.top-row {
    height: 8%;
}
.top-nav {
    border-bottom: 1px solid rgba(255, 255, 255, .5);
}
.app-logo {
    padding: 15px 15px 5px 0px;
    height: 100%;
    float: left;
}
.center-row {
    height:60%;
}
.app-register-btn {
    margin: 5px 0;
    color: white;
    border: 4px solid white;
    border-radius: 0;
    background-color: rgba(0, 0, 0, .15);
}
.app-register-btn:hover {
    margin: 5px 0;
    color: rgb(22, 55, 66);
    border: 4px solid white;
    background-color: rgba(255, 255, 255, 1);
}
.app-register-btn:active {
    border: 4px solid rgba(255, 255, 255, 0) !important;
    background-color: rgba(255, 255, 255, .2) !important;
}
.app-login-btn {
    margin: 5px 0;
    color: white;
}
.app-login-btn:hover {
    margin: 5px 0;
    color: white;
}
.landing-modal {
    color: black;
}
.bottom-row {
    margin-top: 70px;
}
@media screen and (max-width: 1050px) {
   .app-landing {
        background-size: auto 100%;
        background-position: center;
    } 
}
@media (max-width: 350px){
    .bottom-row {
        margin-top: 30px;
    }
}
</style>
