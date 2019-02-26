<style lang="css" scoped>
  .suppliers-container, .supplier-files-container {
    height: 720px;
    overflow-y: auto;
    box-sizing: border-box;
  }

  .suppliers-container {
    padding: 12px 0;
    background-color: #F7CE3E;
  }

  .supplier-files-container {
    padding: 12px;
    background-color: #1A2930;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }

  .supplier-files-container .file {
    width: 72px;
    height: 72px;
    padding: 12px;
  }

  .supplier-files-container .file img {
    width: 48px;
    height: 48px;
  }

  .supplier-card {
    height: 100px;
    width: 278px;
    border: 4px;
    background-color: white;
    margin: 12px auto;
  }

</style>

<template>
  <v-container>
    <v-layout>
      <v-flex xs3>
        <h2 class="headline font-weight-bold mb-3">Suppliers</h2>
        <article class="suppliers-container">
          <section
            class="supplier-card"
            v-for="(i, idx) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
            :key="idx"
          >
            <span>Supplier {{i}}</span>
          </section>
        </article>
      </v-flex>
      <v-flex
        mb-5
        xs9
      >
        <h2 class="headline font-weight-bold mb-3">Supplier's Files</h2>
        <article class="supplier-files-container">
          <section
            class="files-card"
            v-for="(i, idx) in Array.from({length: 100}).map((v, k) => k)"
            :key="idx"
          >
            <div class="file">
              <img alt="file" :src="require('../assets/file.svg')"/>
            </div>
          </section>
        </article>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({})
  };
</script>

