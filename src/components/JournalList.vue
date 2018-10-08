<!-- HTML -->
<template>
  <div class="app-journal-list-item">
    <b-row class="journal-item" @click="$router.push({name: 'journal-detail', params : {username: currentUsername, currentJournal: journal.title}})">
      <b-col cols="4" sm='3' lg="2">
        <img :src="journalImg" alt="" width="100%" height="100px">
      </b-col>
      <b-col cols="8" sm='9' lg="10">
        <b-row class="journal-title-row">
          <b-col>
            <h4>{{journal.title}}</h4>
          </b-col>
        </b-row>
        <b-row class="journal-sub-row">
          <b-col cols="10">
            <small >{{journal.startDate}}</small>
          </b-col>
          <b-col class="journal-settings-col" cols="2">
            <span><a @click.stop="showModal()"><fa-icon icon="cog"></fa-icon></a></span>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!-- Journal Settings Modal -->
    <b-modal class="journal-settings-modal" ref='settingsModal' title="Journal Settings" ok-title="Save" centered @ok="handleOK">
      <p>Picture URL:</p>
      <b-form> 
        <b-form-input v-model="imgURL" required type="url" :placeholder="journal.image"></b-form-input>
        <br>
        <b-form-checkbox v-model="status" value="true" unchecked-value="false">
          Archive <strong>{{status}} - {{journal.archived}}</strong>
        </b-form-checkbox>
      </b-form>
    </b-modal>
  </div>
</template>

<!-- JavaScript -->
<script>
import Journal from "@/models/journal.class"
import firebase from "firebase"
import db from "../fbInit"

export default {
  name: "JournalListItem",
  // components: {

  // },
  props: {
    currentUsername: String,
    journal: Journal
  },
  data() {
    return {
      imgURL: "",
      status: this.journal.archived,
    };
  },
  methods: {
    showModal() { 
      this.$refs.settingsModal.show();
    },

    updateJournal() {
      db.collection("journals")
        .where("userID", "==", firebase.auth().currentUser.uid)
        .where("title", "==", this.journal.title)
        .get().then(snapshot => {
          snapshot.forEach(doc => {
            if (this.imgURL) {
              db.collection("journals").doc(doc.id).update({
                image: this.imgURL
              });
            }
            if (this.status == "true") {
              db.collection("journals").doc(doc.id).update({
                archived: true
              });
            } else if (this.status == "false") {
              db.collection("journals").doc(doc.id).update({
                archived: false
              });
            }
          });
        });
      
      return new Promise (function(resolve, reject){
        resolve("updated journal!")
      })
    },

    handleOK(evt) {
      evt.preventDefault();
      if (!this.imgURL && !this.status) {
        alert("Please enter at least one field");
      } else {
        this.updateJournal().then(this.$parent.refreshJournals())
        this.$refs.settingsModal.hide()
      }
    }
  },
  computed: {
    journalImg() {
        let image = ''
        if (this.journal.image == ''){
            image = 'https://firebasestorage.googleapis.com/v0/b/chronicle-firebase11.appspot.com/o/assets%2Fhome-bg1.png?alt=media&token=25b5247f-c5a6-40f8-9988-a5da97694cbc'
        }else{
            image = this.journal.image
        }
        return image
    }
  },
};
</script>

<!-- CSS -->
<style scoped>
.app-journal-list-item {
  color: white;
}
.bg-custom-dark {
  background-color: rgb(43, 47, 53);
}
img{
  max-width: 150px;
}
.journal-item {
  cursor: pointer;
}
.journal-title-row {
  height: 80%;
}
.journal-sub-row{
  color: gray;
}
.journal-settings-col {
  text-align: center;
}
.journal-settings-modal {
  color: black;
}
</style>