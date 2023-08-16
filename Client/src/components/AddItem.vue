<template>
    <div class="container">
        <div class="item-box">
            <input type="text" v-model="item.title" placeholder="Title">
            <input type="text" v-model="item.url" placeholder="URL">
            <textarea name="description" cols="30" rows="10" v-model="item.description" placeholder="Description"></textarea>
            <button @click="addItem">Add</button>
        </div>
    </div>
</template>

<script setup>
import ItemService from '../services/item.service.js';
import { ref } from "vue";

const  item = ref ({
                title: '',
                url: '',
                description: ''
            });

function addItem() {
    var data = {
                title: item.value.title,
                description: item.value.description
            };

            ItemService.addItem(data)
            .then(res => {
                item.value.title = '';
                item.value.url = '';
                item.value.description = '';
                console.log("result of addItem: ", res);
            })
            .catch(err => {
                console.log("AddItem.vue error:", err);
            })
}

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