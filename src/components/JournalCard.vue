<!-- HTML -->
<template>
    <div class="app-journal-card">
        <!-- :title="title"
                :sub-title="startDate" -->
        <b-card no-body
                bg-variant="custom-dark"
                text-variant="white"
                :img-src="[journal.image == '' ? 'https://firebasestorage.googleapis.com/v0/b/chronicle-firebase11.appspot.com/o/assets%2Fhome-bg1.png?alt=media&token=25b5247f-c5a6-40f8-9988-a5da97694cbc' : journal.image]"
                img-alt="Journal image"
                img-top
                tag="article"
                footer-tag="footer"
                footer="custom-dark"
                class="journal-card"
                style=""
                @click="$router.push({name: 'journal-detail', params : {username: currentUsername, currentJournal: journal.title}})">
            <b-row slot="footer">
                <b-col cols="12">
                    <h4>{{journal.title}}</h4>
                </b-col>
                <b-col cols="8">
                    <h6>{{journal.startDate}}</h6>
                </b-col>
                <b-col>
                    <h6 class="journal-settings"><a @click.stop="showModal()"><fa-icon icon="cog"></fa-icon></a></h6>
                </b-col>
            </b-row>
        </b-card>
        <!-- Journal Settings Modal -->
        <b-modal ref='settingsModal' title="Journal Settings" ok-title="Save" centered @ok="handleOK">
            <p>Picture URL:</p>
            <b-form> 
            <b-form-input v-model="imgURL" required type="url" :placeholder="journal.image"></b-form-input>
            <br>
            <b-form-checkbox id="checkbox1"
                    v-model="status"
                    value="true"
                    unchecked-value="false"
                    checked="checked">
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
  name: "JournalCard",
  // components: {

  // },
  props: {
    currentUsername: String,
    journal: Journal
  },
  data() {
    return {
      imgURL: "",
      status: ""
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
            snapshot.forEach(doc => {
              if (this.imgURL) {
                doc.update({
                  image: this.imgURL
                });
              }
              if (this.status == "true") {
                doc.update({
                  archived: true
                });
              } else if (this.status == "false") {
                doc.update({
                  archived: false
                });
              }
            });
          });
      }
    }
  }
};
</script>

<!-- CSS -->
<style scoped>
.bg-custom-dark {
  background-color: rgb(43, 47, 53);
}
.journal-card {
  cursor: pointer;
}
.journal-card h6,
.journal-card h4 {
  text-align: left;
}
.journal-card h6 {
  color: gray;
}
.journal-card .journal-settings {
  text-align: right;
  color: gray;
  z-index: 100;
}
.card-img-top {
  width: 100%;
  height: 20vw;
  object-fit: cover;
}
</style>