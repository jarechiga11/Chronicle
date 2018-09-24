<!-- HTML -->
<template>
    <div class="app-entry-card">
        <b-card bg-variant="custom-dark"
                text-variant="white"
                style="max-width: 100%;"
                class="entry-card"
                v-b-modal="'modal' + title">
            <b-row align-v="center">
                <b-col class="entry-date" cols="6" order="2" sm="2" order-sm="1">
                    <h4>{{date.toDateString().substring(4,10)}}</h4>
                </b-col>
                <b-col class="entry-title" cols="12" order="1" sm="8" order-sm="2">
                    <h3>{{title}}</h3>
                </b-col>
                <b-col class="entry-time" cols="6" order="3" sm="2" order-sm="3">
                    <h6>{{date.getHours() == 0 ? '12' : date.getHours() > 12 ? (date.getHours()-12) : date.getHours()}}:{{date.getMinutes()}} {{date.getHours() >= 12 ? 'PM': 'AM'}}</h6>
                </b-col>
            </b-row>
        </b-card>
        <b-modal :id="'modal' + title" ref="dModal" :title="title" centered hide-footer>
            <p class="entry-text">{{ text }}</p>
        </b-modal>
    </div>
</template>

<!-- JavaScript -->
<script>
export default {
    name: 'EntryCard',
    components: {

    },
    props:{
        title: String,
        date: Date,
        text: String
    },
    data() {
        return {
                
        }
    },
    // methods: {

    // }
}
</script>

<!-- CSS -->
<style scoped>
.bg-custom-dark {
    background-color: rgb(43, 47, 53);
}
.entry-card {
    cursor: pointer;
}
.entry-date > h4 {
    text-align: left;
    margin-bottom: 0;
    min-width: 45px;
    /* max-width: 115px; */
    color: gray;
}
.entry-title > h3 {
    text-align:left; 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0;
}
.entry-time > h6 {
    text-align: right;
    margin-bottom: 0;
    min-width: 71px;
    color: gray;
}
.entry-text {
    text-align: left;
}
@media(max-width: 575px){
    .entry-title {
        margin-bottom: 10px;    
    }
}
</style>