<style>
  body {
    background-color: #C5C1C0;
  }

  .theme--light .v-toolbar {
    background-color: #0A1612;
  }

  .text-color-white {
    color: white;
  }
</style>
<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-color-white text-uppercase">
        <span class="font-weight-bold">FILE HUB</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
  import Home from './components/Home';

  export default {
    name: 'App',
    components: {
      Home
    },
    data() {
      return {
        //
      };
    }
  };
</script>
