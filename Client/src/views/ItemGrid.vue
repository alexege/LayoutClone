<template>
    <div>
        <!-- <div class="items">
            <div v-for="item in allItems" :key="item.id">
                <div class="block">
                    <img :src="item.url ? item.url : 'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png'" :alt="item.title">
                </div>
            </div>
        </div> -->
        <!-- <pre>{{ drag_source }}</pre>
        <pre>{{ drag_target }}</pre> -->

        <div class="items">
            <div v-for="(item, idx) in allItems" :key="item.id">
                <div class="block-cell" @drop="onDrop($event, item)" @dragover.prevent @dragenter.prevent>
                    <div class="block" draggable @dragstart="onDrag($event, item)">
                        <!-- {{ item._id.slice(-3) }} -->
                        <!-- <pre>{{ idx }} : {{ item.gridPosition }}</pre> -->
                        <img :src="item.url ? item.url : 'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png'" :alt="item.title">
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="items">
            <div v-for="n in 126" :key="n">
                <div class="block">
                    <img src="" alt="">
                </div>
            </div>
        </div> -->
    </div>
</template>
<script setup>

import { ref } from "vue";
import { storeToRefs } from 'pinia';
import { useItemStore } from '../stores/item';

const { fetchItems, updateItem } = useItemStore()
const { allItems } = storeToRefs(useItemStore())

const drag_source = ref(null)
const drag_target = ref(null)
const drag_target_holder = ref(null);
const drag_source_placeholder = ref(null);

fetchItems()

async function onDrag(evt, item) {
    drag_source.value = item;
    drag_source_placeholder.value = item.gridPosition;
    evt.dataTransfer.dropEffect = 'move'
    evt.dataTransfer.effectAllowed = 'move'
    evt.dataTransfer.setData('itemID', item._id)
}

async function onDrop(evt, item) {
    drag_target.value = item;
    drag_target_holder.value = this.drag_target;

    let data_target = {
        _id: this.drag_target._id,
        gridPosition: this.drag_source.gridPosition
    }
    
    let data_source = {
        _id: this.drag_source._id,
        gridPosition: this.drag_target_holder.gridPosition
    }

    try {
        await updateItem(data_target)
        await updateItem(data_source)
    } catch (e) {
        console.log("error:", e)
    }

}

</script>


<!-- <script>
import ItemService from "../services/item.service.js"
// const { updateItem } = useItemStore()
export default {
  data() {
    return {
      allItems: null,
      drag_source: null,
      drag_target: null,
      }
    },

    mounted() {
        this.getAllItems();
    },

    methods:{
        getAllItems() {
            ItemService.findAll()
            .then(res => {
                this.allItems = res.data;
            })
            .catch(err => {
                console.log("getAllItems error: ", err);
            })
        },

        beginDrag(evt, item) {
            console.log("Beginning drag: evt:", evt);
            console.log("Beginning drag: item:", item);
            this.drag_source = item;
            evt.dataTransfer.dropEffect = 'move'
            evt.dataTransfer.effectAllowed = 'move'
            evt.dataTransfer.setData('itemID', item._id)
        },

        onDropping(evt, item) {
            console.log("Dropping: evt:", evt);
            console.log("Dropping: list:", item);
            this.drag_target = item;
            this.drag_target_holder = this.drag_target;
            const itemID = evt.dataTransfer.getData('itemID')
            console.log("id of start point: ", itemID)
            // const item = this.items.find((item) => item.id == itemID)
            // item.list = list

            // //Swap items
    // let data_target = {
    //     _id: this.drag_target._id,
    //     gridPosition: this.drag_source.gridPosition
    // }

    // await updateItem(data_target)
    // .then(res => {
    //     console.log('res:', res);
    // })

    // let data_source = {
    //     _id: this.drag_source._id,
    //     gridPosition: this.drag_target_holder.gridPosition
    // }

    // await updateItem(data_source)
    // .then(res => {
    //     console.log('res:', res);
    // })

        }
    }
}
</script> -->
<style scoped>

.drop-zone {
  background-color: #eee;
  margin-bottom: 10px;
  padding: 10px;
}

.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
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

.block-cell {
  outline: 1px solid yellow;
  min-width: 50px;
  min-height: 50px;
  aspect-ratio: 1;
  border-radius: 3px;
  /* padding: .5em;
  margin: .5em; */
  /* text-align: center; */
  /* display: flex; */
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

.block img {
    aspect-ratio: 1;
}
</style>