<template>
    <div>
        <div class="items">
            <div v-for="n in 126" :key="n">
                <div class="block"></div>
            </div>
        </div>
    </div>
</template>
<script>
import ItemService from "../services/item.service.js"

export default {

    data() {
        return {
            allItems: null
        }
    },

    mounted() {
        this.getAllItems();
    },

    methods:{
        getAllItems() {
            ItemService.findAll()
            .then(res => {
                console.log("res:", res);
                this.allItems = res.data;
            })
            .catch(err => {
                console.log("getAllItems error: ", err);
            })
        }
    }
}
</script>
<style scoped>

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

.block:hover {
    background-color: rgb(102, 102, 102);
    /* transform: rotate(10deg);
    animation: 2s; */
    transition-property: transform;
    transition-duration: .25s;
    transform: scale(105%);
    box-shadow: 1px 1px 20px 5px rgba(255, 255, 255, 0.205);
    /* border-top: 1px solid white;
    border-left: 1px solid white; */
}
</style>