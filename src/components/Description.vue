<!-- HTML -->
<template>
    <div class="app-description">
    <!-- Mobile: Carousel -->
        <b-container class="feat-carousel-container">
            <b-row>
                <b-col cols="12">
                    <b-carousel class="features-carousel" indicators v-model="fSlide">
                        <!-- ** replace later with v-for and extract from firebase -->
                        <b-carousel-slide class="features-carousel-item" img-src="https://firebasestorage.googleapis.com/v0/b/chronicle-firebase11.appspot.com/o/Feature-images%2F1b.png?alt=media&token=19e8139c-28c4-4429-8704-147f1ec08632"></b-carousel-slide>
                        <b-carousel-slide class="features-carousel-item phone" img-src="https://firebasestorage.googleapis.com/v0/b/chronicle-firebase11.appspot.com/o/Feature-images%2F2b.png?alt=media&token=ec7d2eea-9b3d-49a1-9556-62d5570f940c"></b-carousel-slide>
                        <b-carousel-slide class="features-carousel-item" img-src="https://firebasestorage.googleapis.com/v0/b/chronicle-firebase11.appspot.com/o/Feature-images%2F3b.png?alt=media&token=a3e625a9-7140-4075-8433-76eb37f6964d"></b-carousel-slide>
                    </b-carousel>
                </b-col>
                <b-col>
                   <div class="features-carousel-description">
                        <h5> {{features[fSlide].fTitle}} </h5>
                        <p> {{features[fSlide].fDescription}} </p>
                    </div> 
                </b-col>
            </b-row>
        </b-container>

    <!-- Desktop: List with Previews -->
        <b-container class="description-container">
            <b-row align-v="center" class="top-row">
                <!-- Feature image selector -->
                <b-col order-lg="2" lg="6" class="features-imgs">
                    <img v-show="features[0].fActive" id="feature-img" class="features-img" src="https://firebasestorage.googleapis.com/v0/b/chronicle-firebase11.appspot.com/o/Feature-images%2F1b.png?alt=media&token=19e8139c-28c4-4429-8704-147f1ec08632" alt="">
                    <img v-show="features[1].fActive" id="feature-img" class="features-img phone" src="https://firebasestorage.googleapis.com/v0/b/chronicle-firebase11.appspot.com/o/Feature-images%2F2b.png?alt=media&token=ec7d2eea-9b3d-49a1-9556-62d5570f940c" alt="">
                    <img v-show="features[2].fActive" id="feature-img" class="features-img" src="https://firebasestorage.googleapis.com/v0/b/chronicle-firebase11.appspot.com/o/Feature-images%2F3b.png?alt=media&token=a3e625a9-7140-4075-8433-76eb37f6964d" alt="">
                </b-col>
                <!-- Feature Descriptions -->
                <b-col lg="6" class="features-list">
                    <ul class="list-unstyled">
                        <li v-for="feature in features" :key="feature.fTitle" :class="['features-item', {shadow:feature.fActive}]" @click="makeCurrent(feature)">
                            <h5> {{feature.fTitle}} </h5>
                            <p> {{feature.fDescription}} </p>
                        </li>
                    </ul>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<!-- JavaScript -->
<script>
export default {
    name: 'Description',
    data() {
        return {
            features: [
                {fActive:false, fID:1, fTitle:"Records for You", fDescription:"Create individual journals for all of life's experiences, and add endless entries within each. Personalize journals with cover images, colored tags, and passwords for extra security."},
                {fActive:false, fID:2, fTitle:"Anytime and Anywhere", fDescription:"Take your Chronicle with you on the go! With the Chronicle mobile app, you can access and update to your Chronicle at your convenience.* Learn more here."},
                {fActive:true, fID:3, fTitle:"Share your Adventures", fDescription:"Took a trip abroad? Or taking one soon? Send a shareable link of a journal to family and friends allowing them to follow your journey and any updates!"}
            ],
            fSlide: 0,
        }
    },
    // props: {
        
    // },
    methods: {
        makeCurrent(feat) {
            this.features.forEach(element => {
                if(element == feat){
                    element.fActive = true;
                }else{
                    element.fActive = false;
                }
                //console.log(element.fTitle + element.fActive);
            });
        },
    }
}
</script>

<!-- CSS -->
<style scoped>
@import "../css/devices.min.css";

.app-description {
    height: 90vh;
}
.description-container {
    height: 100%;
}
.top-row {
    height: 100%;
}
.features-carousel-description {
    text-align: justify;
    margin: 40px 0;
    padding: 10px 10px 5px 10px;
}
.features-list {
    text-align: justify;
    padding-right: 40px;
}
.features-item {
    margin: 50px 0;
    padding: 10px 10px 5px 10px;
    border-radius: 3px;
}
.features-imgs {
    padding-left: 40px;
    padding-right: 0;
}
.features-img {
    width: 90%;
}

/* put this in landing lol...
@media (max-width: 1075px) {
   .app-landing {
        height: 100vh;
        background-image: url('../assets/home-bg1.png');
        background-size: auto 100%;
        background-position: center;
    } 
} */
@media (max-width: 992px){
    .app-description{
        height: 75vh;
    }
    .description-container {
        display: none
    }
    .feat-carousel-container{
        margin-top: 30px;
        padding: 0 30px;
        width: 90%;
        max-height: 100%;
    }
    .feat-ind {
        position: relative !important;
        margin-top: 20px;
    }
    .carousel-indicators li{
        margin-top: 10px !important;
        background-color: rgba(0, 0, 0, 0.3) !important;
    }
    .carousel-indicators .active{
        background-color: black !important;
    }
    .features-carousel > ol {
        bottom: -25px;
    }
}
@media (max-width: 450px){
    .app-description{
        height: 75vh;
        max-height: 550px;
    }
    .feat-carousel-container{
        margin-top: 30px;
        padding: 0 30px;
        width: auto;
        max-height: 100%;
    }
}
@media (min-width: 993px){
    .feat-carousel-container {
        display: none;
    }
}
</style>
