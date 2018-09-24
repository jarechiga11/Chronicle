<!-- HTML -->
<template>
    <div class="app-mobile-nav">
        <div class="nav-mobile">
            <b-container>
                <b-row>
                <!-- Navigation Options -->
                    <b-col class="mnav-col">
                        <router-link :to="{name: 'chronicle', params: {username: user.username}}"><fa-icon class="mn-icon" icon="home" :class="[page == 'home' ? 'active-icon' : '']" ></fa-icon></router-link>
                    </b-col>
                    <b-col class="mnav-col">
                        <!-- <router-link :to="{name: 'calendar', params: {username: user.username}}"><fa-icon class="mn-icon" icon="calendar" :class="[page == 'calendar' ? 'active-icon' : '']"></fa-icon></router-link> -->
                    </b-col>
                    <b-col class="mnav-col">
                        <router-link :to="{name: 'profile', params: {username: user.username}}"><fa-icon class="mn-icon" icon="user" :class="[page == 'profile' ? 'active-icon' : '']"></fa-icon></router-link>
                    </b-col>
                    <b-col class="mnav-col">
                        <a href="#" @click="fbLogout()"><fa-icon class="mn-icon" icon="sign-out-alt"></fa-icon></a>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div> 
</template>

<!-- JavaScript -->
<script>
import firebase from 'firebase'
import db from '../fbInit'
import User from '@/models/user.class'

export default {
    name: 'MobileNav',
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
.nav-mobile {
    bottom: 0;
    position: fixed;
    z-index: 10;
    width: 100%;
    background-color: rgb(43, 47, 53);
    border-top: 2px solid rgb(36, 37, 39);
}
.nav-mobile a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    text-decoration: none;
    width: 100%;
    padding: 15px 10px;
    font-size: 17px;
}
.mn-icon {
    color: gray;
}
.active-icon {
    color: white;
}
</style>
