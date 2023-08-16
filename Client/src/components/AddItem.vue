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
<script>
import ItemService from '../services/item.service.js'

export default {
    data() {
        return {
            item: {
                title: '',
                url: '',
                description: ''
            }
        }
    },

    methods: {
        addItem() {
            var data = {
                title: this.item.title,
                description: this.item.description
            };

            ItemService.addItem(data)
            .then(res => {
                console.log("res: ", res);
                this.item.title = '';
                this.item.url = '';
                this.item.description = '';
            })
            .catch(err => {
                console.log("AddItem.vue error:", err);
            })
        }
    }
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