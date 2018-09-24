<!-- HTML -->
<template>
    <div class="app-profile">
        <div class="chr-nav-mobile">
            <MobileNav page="profile"/>
        </div>
        <b-container class="chr-container">
            <b-row class="chr-row">
            <!-- Sidebar -->
                <b-col cols="1" lg="2" class="chr-sidebar-col">
                    <Sidebar page="profile"/>
                </b-col>
             <!-- User Chronicle = Journals/Entries -->
                <b-col class="chr-main-col">
                    This is the Profile Page
                    <div v-for="u in user" :key="u.email" >
                        <p> {{u.firstname}} </p>
                        <p> {{u.lastname}} </p>
                        <p> {{u.username}} </p>
                        <p> {{u.email}} </p>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<!-- JavaScript -->
<script>
import firebase from 'firebase'
import Sidebar from '@/components/Sidebar.vue'
import MobileNav from '@/components/MobileNav.vue'
import  db  from '../fbInit'

export default {
    name: 'profile',
    components: {
        Sidebar,
        MobileNav
    },
    data() {
        return {
            user: [],
        }
    },
    created() {
        //queries and returns the user profile data matching the userID of the currently logged-in user
        db.collection("users").where('userID', '==', firebase.auth().currentUser.uid).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                // console.log(doc.data()) //Shows that correct user is pulled
                const data = {
                    'firstname': doc.data().firstName,
                    'lastname': doc.data().lastName,
                    'username': doc.data().username,
                    'email': doc.data().email,
                }
                //adds data to the user array. although only 1 result, its good practice
                this.user.push(data)
            })
        })

    },
    // props:{

    // },
    // methods: {

    // }
}
</script>

<!-- CSS -->
<style scoped>
.app-profile {
    color: black;
    height: 100vh;
}
.chr-container {
    height: 100%;
    max-width: 100% !important;
    margin: 0;
    padding: 0;
}
.chr-row {
    height: 100%;
    width: 100%;
    margin: 0 0;
}
.chr-nav-mobile {
    display: block;
}
.chr-sidebar-col {
    height: 100%;
    padding: 0;
    min-width: 87px;
    max-width: 185px;
}
.chr-main-col {
    height: 100vh;
    overflow-y: scroll;
}
/* When screen is Small or XS*/
@media (max-width: 767px) {
  .chr-sidebar-col{
    display: none;
  }
  .chr-nav-mobile {
    display: block;
  }
}
@media (min-width: 992px) {
    .chr-sidebar-col {
        height: 100%;
        padding-right: 0;
        min-width: 175px;
    }
}
</style>