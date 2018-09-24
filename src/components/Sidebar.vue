<!-- HTML -->
<template>
    <div class="app-sidebar">
    <!-- DESKTOP -->
        <div class="sb-full">
        <!-- Logo -->
            <img class="sb-logo" src="../assets/logo.png" alt="" width="80%" height="auto">
        <!-- Menu -->
            <ul class="fa-ul">
                <li style="width:100%" class="sb-home">
                    <span class="fa-li"><fa-icon icon="home"></fa-icon></span>
                    <router-link :to="{name: 'chronicle', params: {username: user.username}}"> Home</router-link>
                    <span class="sb-indicator" v-show="page == 'home'"></span>
                </li>
                <!-- <li style="width:100%" class="sb-calendar">
                    <span class="fa-li"><fa-icon icon="calendar"></fa-icon></span> 
                    <router-link to="/c"> Calendar</router-link>
                    <span class="sb-indicator" v-show="page == 'calendar'"></span>
                </li> -->
                <br>
                <li style="width:100%" class="sb-profile">
                    <span class="fa-li"><fa-icon icon="user"></fa-icon></span>
                    <router-link :to="{name: 'profile', params: {username: user.username}}"> Profile</router-link>
                    <span class="sb-indicator" v-show="page == 'profile'"></span>
                </li>
                <li style="width:100%" class="sb-logout">
                    <span class="fa-li"><fa-icon icon="sign-out-alt"></fa-icon></span> 
                    <a href="#" @click="fbLogout()"> Logout</a>
                </li>
            </ul>
        </div>
    <!-- MOBILE -->
        <div class="sb-mini">
        <!-- Logo -->
            <img class="sb-icon" src="../assets/icon.png" alt="" width="80%" height="auto">
        <!-- Menu -->
            <ul class="fa-ul">
                <li class="sb-home">
                    <router-link to="/h"><fa-icon icon="home"></fa-icon></router-link>
                    <span class="sb-indicator" v-show="page == 'home'"></span>
                </li>
                <!-- <li class="sb-calendar">
                    <router-link to="/c"><fa-icon icon="calendar"></fa-icon></router-link>
                    <span class="sb-indicator" v-show="page == 'calendar'"></span>
                </li> -->
                <br>
                <li class="sb-profile">
                    <router-link to="/p"><fa-icon icon="user"></fa-icon></router-link>
                    <span class="sb-indicator" v-show="page == 'profile'"></span>
                </li>
                <li class="sb-logout">
                    <a href="#" @click="fbLogout()"><fa-icon icon="sign-out-alt"></fa-icon></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<!-- JavaScript -->
<script>
import firebase from 'firebase'
import db from '../fbInit'
import User from '@/models/user.class'

export default {
    name: 'Sidebar',
    props: {
        page: String,
    },
    data() {
        return {
            user: new User(),
        }
    },
    created() {
        // Grabs current user information
        db.collection('users').where('userID', '==', firebase.auth().currentUser.uid).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                // console.log(doc.data()) //Shows that correct user is pulled
                const data = new User()

                data.userID = firebase.auth().currentUser.uid
                data.email = doc.data().email
                data.firstname = doc.data().firstName
                data.lastname = doc.data().lastName
                data.username = doc.data().username                
                //adds data to the user array. although only 1 result, its good practice
                this.user = data
                //console.log(this.user)
            })
        })
    },
    methods: {
        // Logs out the current User
        fbLogout() {
            firebase.auth().signOut().then(() => {
                alert('You are now logged off');
                this.$router.replace('/');
            });
        },
    }
}
</script>

<!-- CSS -->
<style scoped>
.app-sidebar {
    background-color:  rgb(43, 47, 53);
    height: 100%;
    width: 100%;
    max-width: 185px;
    color: white;
    font-size: 1.3em;
}
/* Mini sidebar hidden by default */
.sb-mini {
    display: none;
}
.fa-ul {
    margin-left:3em;
}
.sb-logo, .sb-icon {
    margin: 20px 0 70px 0;
}
.sb-indicator{
    position: absolute;
    left: -65px;
    height: 75%;
    width: 10px;
    background-color: white;
}
.sb-logout {
    position: absolute;
    bottom: 50px;
    width: 100%;
}
li {
    text-align: left;
    padding: 5px 0;
}
a, a:hover {
    color: white;
}
/* When screen is less than Large */
@media (max-width: 991px) {
    .sb-full {
        display: none;
    }
    .sb-mini {
        display: block;
    }
    .fa-ul {
        margin-left: 0.2em;
    }
    .sb-indicator{
        left: -5px;
        width: 8px;
    }
    .sb-logout {
        width: 80%;
    }
    li {
        text-align: center;
    }
}
/* When screen is less than Medium */
@media (max-width: 767px) {
    .sb-mobile {
        display: block;
    }
    .sb-full {
        display: none;
    }
    .sb-mini {
        display: none;
    }
}
</style>