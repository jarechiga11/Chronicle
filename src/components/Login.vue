<!-- HTML -->
<template>
    <div class="app-login">
        <b-form @submit="fbLogin"> 
            <b-form-input v-model="userEmail" required type="email" placeholder="Email"></b-form-input>
            <br>
            <b-form-input v-model="userPassword" required type="password" placeholder="Password"></b-form-input>
            <br>
            <b-button type="submit">Login</b-button>
        </b-form>
    </div>
</template>

<!-- JavaScript -->
<script>
import firebase from 'firebase'
import db from '../fbInit'

export default {
    name: 'Login',
    data() {
        return {
            userEmail: '',
            userPassword: '',
            username: '',
        }
    },
    // props:{
    //    
    // },
    methods: {
        fbLogin(){
            //user will stay logged in until tab/window is closed
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
                firebase.auth().signInWithEmailAndPassword(this.userEmail, this.userPassword).then(
                    (User) => {
                        //gets username of user that just logged in
                        db.collection("users").where("userID", "==", User.user.uid).get().then(snapshot => {
                            snapshot.forEach(doc => {
                                this.username = doc.data().username
                            })
                        }).then(() => {
                            //changes page to user's homepage
                            alert('You are now connected!')
                            this.$router.push({name: 'chronicle', params: {username: this.username}})
                        })
                    },
                    (err) => {
                        alert('Oops ' + err.message)
                    }
                )
            })
        },
    }
}
</script>

<!-- CSS -->
<style scoped>

</style>
