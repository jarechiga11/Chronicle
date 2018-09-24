<!-- HTML -->
<template>
    <div class="app-register">
        <h5>*Requried Field</h5>
        <b-form @submit="fbRegister">
            <b-form-input v-model="newFirstname" required type="text" placeholder="*First Name"></b-form-input>
            <br>
            <b-form-input v-model="newLastname" required type="text" placeholder="*Last Name"></b-form-input>
            <br>
            <b-form-input v-model="newUsername" required type="text" placeholder="*Username"></b-form-input>
            <br>
            <b-form-input v-model="newEmail" required type="email" placeholder="*Email"></b-form-input>
            <br>
            <b-form-input v-model="newPassword" required type="password" placeholder="*Password"></b-form-input>
            <br>
            <b-button type="submit">Register</b-button>
        </b-form>
    </div>
</template>

<!-- JavaScript -->
<script>
import firebase from 'firebase'
import db from '../fbInit'
//import User from '@/models/user.class'

export default {
    name: 'Register',
    data() {
        return {
            newEmail: '',
            newPassword: '',
            newUsername: '',
            newFirstname: '',
            newLastname: '',
        }
    },
    // props:{

    // },
    methods: {
        fbRegister() {
            firebase.auth().createUserWithEmailAndPassword(this.newEmail, this.newPassword).then(
                (newUser) => {
                    //adds new user profile into database
                    db.collection('users').add({
                        firstName: this.newFirstname,
                        lastName: this.newLastname,
                        username: this.newUsername,
                        email: this.newEmail,
                        userID: newUser.user.uid,
                    }).then(() => {
                        //changes page to user's homepage
                        alert('Your account has been created!');
                        this.$router.push({name: 'chronicle', params: {username: this.newUsername}})
                    })
                },
                (err) => {
                    alert('Oops ' + err.message)
                }
            );
        },
    }
}
</script>

<!-- CSS -->
<style scoped>
    h5{
        text-align: left;
        font-size: 10pt;
        color: red;
    }
</style>