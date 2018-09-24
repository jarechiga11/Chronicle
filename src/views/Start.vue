<!-- HTML -->
<template>
  <div class="start">
    <Landing/>
    <!-- <Description/> -->
  </div>
</template>

<!-- JavaScript -->
<script>
// @ is an alias to /src
import Landing from '@/components/Landing.vue'
import Description from '@/components/Description.vue'

export default {
  name: 'start',
  components: {
    Landing,
    Description
  }
}
</script>

<!-- CSS -->
<style scoped>
body {
  font-family: "Nunito Sans";
}
</style>

