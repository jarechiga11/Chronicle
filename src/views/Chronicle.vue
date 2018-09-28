<!-- HTML -->
<template>
  <div class="app-chronicle">
  <!-- Mobile Items -->
    <div class="chr-nav-mobile">
      <!-- Mobile Top Bar -->
      <div class="chr-mobile-top">
        <img class="chr-mobile-logo" src="https://firebasestorage.googleapis.com/v0/b/chronicle-firebase11.appspot.com/o/assets%2Flogo.png?alt=media&token=9550eecc-3252-4414-9836-057b26de46df" alt="Chronicle Logo">
        <b-button class="chr-mobile-add" variant="link" v-b-modal.journalModal><fa-icon icon="plus"></fa-icon></b-button>
      </div>
      <!-- Mobile Bottom Bar -->
      <MobileNav page="home"/>
    </div>
<!-- Main Content -->
    <b-container class="chr-container">
      <b-row class="chr-row">
  <!-- Sidebar -->
        <b-col cols="1" lg="2" class="chr-sidebar-col">
          <Sidebar page="home"/>
        </b-col>
    <!-- User Chronicle = *Journals/Entries -->
        <b-col class="chr-main-col">
        <!-- Mobile Search -->
          <b-row class="top-row-mobile">
            <b-col>
              <b-form-input v-model="searchText" type="text" placeholder="Search or Filter..."></b-form-input>
            </b-col>
          </b-row>
        <!-- Top Bar-->
          <b-row class="top-row" align-h="center">
          <!-- Search/Filter Bar -->
            <b-col cols="10">
              <b-form-input v-model="searchText" type="text" placeholder="Search or Filter..."></b-form-input>
            </b-col>
          <!-- Add Journal button -->
            <b-col cols="1">
              <b-button class="add-journal-btn" variant="dark shadow-none" v-b-modal.journalModal><fa-icon icon="plus"></fa-icon></b-button>
            </b-col>
          </b-row>
        <!-- New Journal Modal Pop Up -->
          <b-modal id="journalModal" ref="jModal" title="New Journal" centered @shown="clearModal" @ok="handleOK">
            <b-form>
              <b-form-input type="text" placeholder="Title of Journal" required  @submit.stop.prevent="newJournal" v-model="newTitle"></b-form-input>
            </b-form>
          </b-modal>
        <!-- List of Journals -->
          <b-row align-h="left"> 
            <b-col class="journal-col" sm="6" md="4" v-for="journal in filteredList" :key="journal.title">
              <JournalCard v-bind:currentUsername="currentUsername" v-bind:journal="journal"/>
            </b-col> 
          </b-row>
          <!-- NEW STUFF TO WORK ON -->
          <b-row>
            <b-list-group flush style="width: 100%; text-align: left;">
              <b-list-group-item v-for="journal in filteredList" :key="journal.title">
                <JournalListItem v-bind:currentUsername="currentUsername" v-bind:journal="journal"/>
              </b-list-group-item>
            </b-list-group>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<!-- JavaScript -->
<script>
import firebase from "firebase"
import Sidebar from "@/components/Sidebar.vue"
import MobileNav from "@/components/MobileNav.vue"
import JournalCard from "@/components/JournalCard.vue"
import JournalListItem from "@/components/JournalList.vue"
import db from "../fbInit"
import Journal from '@/models/journal.class'

export default {
  name: "Chronicle",
  components: {
    Sidebar,
    MobileNav,
    JournalCard,
    JournalListItem
  },
  // props:{

  // },
  data() {
    return {
      journals: [], // Stores all of the user's journals retrieved from Cloud Firestore
      searchText: '', // Reactively updates when user is typing into the Search Bar
      newTitle: '', // Variable to store the Title of a newly created Journal
      currentUsername: '', // Keeps track of the current user and their username
    };
  },

  mounted() { // Mounted runs when page is first loaded
    this.getUser()
    this.getJournals()
  },

  methods: {

    /** Clears the New Journal Modal of any previous input. */
    clearModal() {
      this.newTitle = ''
    },

    /** 
    * Determines what happens when a user submits a new Journal.
    * Triggers newJournal method if no error.
    * @param {event} evt : the submit event
    * @returns {error} alert: if a journal with inputted title already exists.
    */
    handleOK(evt) {
      evt.preventDefault()
      if(!this.newTitle){
        alert("Please enter a title")
      }else{
        var duplicate = false
        for(var i = 0; i < this.journals.length; i++){
            if(this.newTitle == this.journals[i].title){
              alert("A Journal with this title already exists. Please enter a different title")
              duplicate = true
            }
        }
        if(duplicate == false){
          this.newJournal()
        }
      }
    },

    /** Adds a new journal to Cloud Firestore. Refreshes list of journals. */
    newJournal() {
      db.collection('journals').add({
        userID: firebase.auth().currentUser.uid,
        title: this.newTitle,
        startDate: firebase.firestore.Timestamp.now(),
        color: '',
        image: '',
        password: '',
        shareLink: '',
        archived: false,
      })
      this.journals = []
      this.getJournals()
      this.$refs.jModal.hide()
    },

    /** 
     * Retrieves all journals associated with current User.
     * Stores retrieved journals into journals array. 
     */
    getJournals(){
      db.collection("journals").where("userID", "==", firebase.auth().currentUser.uid).orderBy('startDate', 'desc').get().then(snapshot => {
        snapshot.forEach(doc => {
          const data = new Journal()
          // console.log(data)
          data.userID = doc.data().userID
          data.title = doc.data().title
          data.startDate = doc.data().startDate.toDate().toDateString()
          data.color = doc.data().color
          data.image = doc.data().image
          data.password = doc.data().password
          data.shareLink = doc.data().shareLink
          data.archived = false
          
          this.journals.push(data);
        })
      })
    },

    /** Retrieves the username of the current User. */
    getUser(){
      db.collection("users").where("userID", "==", firebase.auth().currentUser.uid).get().then(snapshot => {
        snapshot.forEach(doc => {
          this.currentUsername = doc.data().username
        })
      })
    },
  }, 

  // Filters journals based on search text
  computed: {
    filteredList() {
      return this.journals.filter(journal => {
        return journal.title.toLowerCase().includes(this.searchText.toLowerCase())
      })
    }
  }, 
}
</script>

<!-- CSS -->
<style scoped>
.app-chronicle {
  font-family: 'Avenir';
  font-family: 'Nunito Sans';
}
.bg-custom-dark {
  background-color: rgb(43, 47, 53);
}
.app-chronicle {
  color: black;
  background-color: rgb(36, 37, 39);
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
.chr-mobile-top {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  max-height: 10%;
  background-color: rgb(43, 47, 53);
  border-bottom: 2px solid rgb(36, 37, 39);
}
.chr-mobile-logo {
  float: left;
  padding-left: 15px;
  min-height: 55px;
  max-height: 60px;
  width: auto;
}
.chr-mobile-add {
  float: right;
  color: white;
  margin: 15px 15px 10px 0;
}
.chr-mobile-add:hover {
  color: white;
}
.chr-nav-mobile {
  display: none;
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
.top-row-mobile {
  display: none;
}
.top-row {
  margin: 25px 0;
}
.view-btn {
  text-align: center;
  margin: 5px 0 0 0;
  border: 3px solid white;
  border-radius: 0;
  background-color: rgba(0, 0, 0, 0);
}
.view-btn > a {
  color: white;
}
.view-btn > a:hover {
  color: rgb(43, 47, 53);
}
.view-btn:hover {
  border: 3px solid white;
  background-color: rgba(255, 255, 255, 1);
}
.view-btn:active {
  border: 3px solid rgba(255, 255, 255, 0) !important;
  background-color: rgba(255, 255, 255, 0.2) !important;
}
.add-journal-btn {
  width: 100%;
  color: white;
  position: absolute;
  float:right;
}
.journal-col {
  padding: 15px;
}
.list-group-item {
  background-color: rgb(36, 37, 39);
  border: 0;
  border-bottom: 2px solid rgb(43, 47, 53);
}
/* When screen is Small or XS*/
@media (max-width: 767px) {
  .chr-container {
    margin: 60px 0 55px;
  }
  .chr-sidebar-col{
    display: none;
  }
  .chr-nav-mobile {
    display: block;
  }
  .top-row {
    display: none;
  }
  .top-row-mobile {
    display: block;
    padding: 10px 20px 0;
  }
  
  .journal-col{
    padding: 15px 30px;
  }
}
/* When screen is Medium or larger */
@media (min-width: 992px) {
  .chr-sidebar-col {
    height: 100%;
    padding-right: 0;
    min-width: 175px;
  }
}
</style>