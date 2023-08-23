<template>
    <div class="dashboard">
        <h2>Admin Dashboard</h2>
        <AddItem/>

        <div class="items">
            <div v-for="(item, idx) in items" :key="item._id" class="block">
                <span>{{ idx + 1 }}</span>
                <EditItem :item="item"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import AddItem from '../components/AddItem.vue';
import EditItem from '../components/EditItem.vue';
import { storeToRefs } from 'pinia';
import { useItemStore } from '../stores/item'

const { items } = storeToRefs(useItemStore())
const { fetchItems } = useItemStore()

fetchItems()

</script>
<style scoped>
.dashboard {
    text-align: center;
}

.items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  overflow: visible;
  justify-content: space-between;
}

.block {
  min-width: 50px;
  min-height: 50px;
  aspect-ratio: 1;
  border-radius: 3px;
  padding: .5em;
  margin: .5em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-content: center;
  color: #FFF;
  background-color: rgb(63, 63, 63);
  font-size: 8pt;
}

.block-image {
    width: 100px;
    height: 100px;
    display: block;
    margin: auto;
}

.action-buttons {
    display: flex;
    justify-content: space-between;
}

.action-buttons button {
    padding: 20px;
    width: 100%;
}
</style>