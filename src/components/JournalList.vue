<!-- HTML -->
<template>
  <div class="app-journal-list-item">
    <b-row>
      <b-col cols="4" sm='3' lg="2">
        <img :src="journalImg" alt="" width="100%" height="100px">
      </b-col>
      <b-col cols="7" sm='8' lg="9">
        <div>
          <h4>{{journal.title}}</h4>
        </div>
        <small >{{journal.startDate}}</small>
      </b-col>
      <b-col cols="1">
        <span class="journal-settings"><a @click.stop="showModal()"><fa-icon icon="cog"></fa-icon></a></span>
      </b-col>
    </b-row>
    <!-- Journal Settings Modal -->
    <b-modal ref='settingsModal' title="Journal Settings" ok-title="Save" centered @ok="handleOK">
      <p>Picture URL:</p>
      <b-form> 
        <b-form-input v-model="imgURL" required type="url" :placeholder="journal.image"></b-form-input>
        <br>
        <b-form-checkbox id="checkbox1"
          v-model="status"
          value="true"
          unchecked-value="false">
          Archive
        </b-form-checkbox>
      </b-form>
    </b-modal>
  </div>
</template>

<!-- JavaScript -->
<script>
import Journal from "@/models/journal.class";
import firebase from "firebase";
import db from "../fbInit";

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
      status: "",
    };
  },
  methods: {
    showModal() { 
      this.$refs.settingsModal.show();
    },

    handleOK(evt) {
      evt.preventDefault();
      if (!this.imgURL && !this.status) {
        alert("Please enter at least one field");
      } else {
        db.collection("journals")
          .where("userID", "==", firebase.auth().currentUser.uid)
          .where("title", "==", this.journal.title)
          .get()
          .then(snapshot => {
            console.log(snapshot)
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
.journal-settings {
  position: absolute;
  bottom: 0;
}
img{
  max-width: 150px;
}
small {
  position: absolute;
  bottom: 0;
}
</style>