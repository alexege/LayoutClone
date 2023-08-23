<template>
    <div class="container">
        <div class="item-box">
            <input type="text" v-model="item.title" placeholder="Title">
            <input type="text" v-model="item.url" placeholder="URL">
            <textarea name="description" cols="30" rows="10" v-model="item.description" placeholder="Description"></textarea>
            <button @click="add">Add</button>
        </div>
    </div>
</template>

<script setup>

// import ItemService from '../services/item.service.js';
import { ref } from "vue";
import { useItemStore } from '../stores/item';

// const { fetchItems } = useItemStore()
const { addItem } = useItemStore()

const  item = ref ({
    title: '',
    url: '',
    description: ''
});

async function add() {
    var data = {
        title: item.value.title,
        url: item.value.url,
        description: item.value.description
    }
    console.log("AddItem.vue - add() / addItem(data)", data)
    await addItem(data)
}

// async function addItem() {
//     const itemStore = useItemStore();
//     await itemStore.createItem({ title: item.value.title, url: item.value.url, description: item.value.description })
// }

// async function addItem() {
    
//     var data = {
//             title: item.value.title,
//             url: item.value.url,
//             description: item.value.description
//         };
        
//     await createItem(data)

//         // ItemService.addItem(data)
//         // .then(() => {
//         //     // fetchItems()
//         //     item.value.title = '';
//         //     item.value.url = '';
//         //     item.value.description = '';
//         // })
//         // .catch(err => {
//         //     console.log("AddItem.vue error:", err);
//         // })
// }

</script>
<style>
    .container {
        display: flex;
        justify-content: center;
    }

    .item-box {
        display: flex;
        flex-direction: column;
    }
</style>