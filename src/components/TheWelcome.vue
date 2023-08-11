<script setup>
import SideNav from "../views/SideNav.vue"
import SidePanel from "../views/SidePanel.vue"
import ItemGrid from "../views/ItemGrid.vue"
</script>

<template>
  <p class="title">Item Layout</p>
  <div class="container">
    <SideNav/>
      <ItemGrid />
    <SidePanel/>
  </div>
</template>

<style scoped>

.title {
  text-align: center;
  color: white;
  font-size: 2em;
  margin: .25em;
  padding: .25em;
}

.container {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  grid-template-rows: auto;
  /* outline: 1px solid red; */
}
</style>
