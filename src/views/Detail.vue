<!-- HTML -->
<template>
    <div class="app-journal-detail">
    <!-- Mobile Items -->
        <div class="det-nav-mobile">
            <!-- Mobile Top Bar -->
            <div class="det-mobile-top">
                <b-button class="det-mobile-back" variant="link" @click="$router.go(-1)" ><fa-icon class="det-mobile-icon" icon="angle-left"></fa-icon></b-button>
                <h3 class="det-mobile-title">{{cJournal}}</h3>
                <b-button class="det-mobile-add" variant="link" v-b-modal.journalModal><fa-icon class="det-mobile-icon" icon="plus"></fa-icon></b-button>
            </div>
            <!-- Mobile Bottom Bar -->
            <MobileNav page="home"/>
        </div>
    <!-- Main Content -->
        <b-container class="det-container">
            <b-row class="det-row">
                <!-- Sidebar -->
                <b-col cols="1" lg="2" class="det-sidebar-col">
                <Sidebar page="home"/>
                </b-col>
                <!-- User detonicle = Journals/*Entries -->
                <b-col class="det-main-col">
                    <!-- Mobile Search -->
                    <b-row class="top-row-mobile">
                        <b-col>
                        <b-form-input v-model="searchText" type="text" placeholder="Search or Filter..."></b-form-input>
                        </b-col>
                    </b-row>
                    <!-- Top Bar -->
                    <b-row class="top-row" align-h="center">
                        <!-- Back Button -->
                        <b-col cols="1">
                            <b-button class="back-btn" variant="dark shadow-none" @click="$router.go(-1)" ><fa-icon icon="angle-left"></fa-icon></b-button>
                        </b-col>
                        <!-- SearchBar -->
                        <b-col cols="10">
                            <b-form-input v-model="searchText" type="text" placeholder="Search or Filter..."></b-form-input>
                        </b-col>
                        <!-- Add Button -->
                        <b-col cols="1">
                            <b-button class="add-entry-btn" variant="dark shadow-none" v-b-modal.entryModal><fa-icon icon="plus"></fa-icon></b-button>
                        </b-col>
                    </b-row>
                    <!-- Add Entry Modal Pop Up -->
                    <b-modal id="entryModal" ref="eModal" title="New Entry" ok-title="Done" size="lg" centered @shown="clearModal" @ok="handleOK">
                        <b-form>
                            <b-form-input type="text" placeholder="Title of Entry" required @submit.stop.prevent="newEntry" v-model="nEntry.title"></b-form-input>
                            <br>
                            <b-form-textarea placeholder="Journal Entry..." :rows="4" :max-rows="6" required @submit.stop.prevent="newEntry" v-model="nEntry.text" ></b-form-textarea>
                        </b-form>
                    </b-modal>
                    <!-- Current Journal Title -->
                    <b-row>
                        <b-col>
                            <h2 class="current-journal">{{cJournal}}</h2>
                        </b-col>
                    </b-row>
                    <!-- List of Entries -->
                    <b-row align-h="left" align-v="center"> 
                        <b-col class="entry-col" sm="12" v-for="entry in filteredList" :key="entry.title" >
                            <EntryCard v-bind="entry"/>
                        </b-col> 
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<!-- JavaScript -->
<script>
import firebase from "firebase";
import Sidebar from "@/components/Sidebar.vue";
import MobileNav from "@/components/MobileNav.vue";
import EntryCard from "@/components/EntryCard.vue";
import db from "../fbInit";
import Entry from "@/models/entry.class";
import { Route } from "vue-router";

export default {
  name: "journal-detail",
  components: {
    Sidebar,
    MobileNav,
    EntryCard
  },
  // props:{
  //
  // },
  data() {
    return {
      cJournal: this.$route.params.currentJournal,
      entries: [],
      nEntry: {
        title: "",
        text: ""
      },

      searchText: ""
    };
  },
  mounted() {
    this.getEntries();
  },
  methods: {
    //opens only the modal that corresonds with the correct entry
    modalID(i) {
      return "modal" + i;
    },
    //clears entered info if modal is closed
    clearModal() {
      this.nEntry.title = "";
      this.nEntry.text = "";
    },
    //when modal is completed
    handleOK(evt) {
      evt.preventDefault();
      if (!this.nEntry.title || !this.nEntry.text) {
        alert("Please complete all fields")
      } else {
        var duplicate = false
        for(var i = 0; i < this.entries.length; i++){
            if(this.nEntry.title == this.entries[i].title){
              alert("An Entry with this title already exists. Please enter a different title")
              duplicate = true
            }
        }
        if(duplicate == false){
          this.newEntry()
        }
      }
    },
    //adding a new entry into the firestore database
    newEntry() {
      db.collection("entries").add({
        userID: firebase.auth().currentUser.uid,
        journalID: this.cJournal,
        title: this.nEntry.title,
        text: this.nEntry.text,
        date: firebase.firestore.Timestamp.now(),
        archived: false
      })
      this.entries = []
      this.getEntries()
      this.$refs.eModal.hide()
    },
    //retrieving the entries from the firestore database
    getEntries() {
      db.collection("entries")
        .where("userID", "==", firebase.auth().currentUser.uid)
        .where("journalID", "==", this.cJournal)
        .orderBy("date", "desc")
        .get().then(snapshot => {
          snapshot.forEach(doc => {
            const data = new Entry();
            // console.log(data)
            data.userID = doc.data().userID
            data.journalID = doc.data().journalID
            data.title = doc.data().title
            data.text = doc.data().text
            data.date = doc.data().date.toDate()
            data.archived = false

            this.entries.push(data)
          })
        })
    }
  },
  // Filters entries based on search text
  computed: {
    filteredList() {
      return this.entries.filter(entry => {
        return entry.title
          .toLowerCase()
          .startsWith(this.searchText.toLowerCase())
      });
    }
  }
};
</script>

<!-- CSS -->
<style scoped>
.bg-custom-dark {
  background-color: rgb(43, 47, 53);
}
/* Page Division styling */
.app-journal-detail {
  background-color: rgb(36, 37, 39);
  color: black;
  height: 100vh;
}
/* Mobile styling */
.det-mobile-top {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  max-height: 10%;
  background-color: rgb(43, 47, 53);
  border-bottom: 2px solid rgb(36, 37, 39);
}
.det-mobile-logo {
  float: left;
  padding-left: 15px;
  min-height: 55px;
  max-height: 60px;
  width: auto;
}
.det-mobile-add {
  float: right;
  color: white;
  margin: 15px 15px 10px 0;
}
.det-mobile-back {
  float: left;
  color: white;
  margin: 15px 0 10px 15px;
}
.det-mobile-add:hover, .det-mobile-back:hover {
  color: white;
}
.det-nav-mobile {
  display: none;
}
.top-row-mobile {
    display: none;
}
/* Desktop Styling */
.det-container {
  height: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
}
.det-row {
  height: 100%;
  width: 100%;
  margin: 0 0;
}
.det-sidebar-col {
  height: 100%;
  padding: 0;
  min-width: 87px;
  max-width: 185px;
}
.det-main-col {
  height: 100vh;
  overflow-y: scroll;
}
/* Top Bar styling */
.top-row {
  margin: 25px 0;
}
.view-btn {
  margin: 5px 0 0 0;
  color: white;
  border: 3px solid white;
  border-radius: 0;
  background-color: rgba(0, 0, 0, 0);
}
.view-btn:hover {
  color: rgb(22, 55, 66);
  border: 3px solid white;
  background-color: rgba(255, 255, 255, 1);
}
.view-btn:active {
  border: 3px solid rgba(255, 255, 255, 0) !important;
  background-color: rgba(255, 255, 255, 0.2) !important;
}
.add-entry-btn,
.back-btn {
  width: 100%;
  color: white;
}
/* Additional styling */
.current-journal {
  color: white;
  text-align: left;
  padding: 10px 50px;
}
.entry-col {
  padding: 3px 50px;
}
/* When screen is Small or XS*/
@media (max-width: 767px) {
  .det-sidebar-col{
    display: none;
  }
  .top-row {
    display: none;
  }
  .current-journal {
    display: none;
  }
  .det-container {
    margin: 60px 0 55px;
  }
  .det-nav-mobile {
    display: block;
  }
  .det-mobile-icon {
    min-width: 17px;
  }
  .top-row-mobile {
    display: block;
    padding: 10px 20px;
  }
  .entry-col{
    padding: 5px 30px;
  }
  h3 {
      display: inline-block;
      margin: 15px 0 10px;
      color: white;
  }
}
/* Desktop styling */
@media (min-width: 992px) {
  .det-sidebar-col {
    height: 100%;
    padding-right: 0;
    min-width: 175px;
  }
}
</style>