<template>
    <div>
        <div class="edit-container">

        <template v-if="editing">
            <input type="text" v-model="updatedItem.title">
            <img :src="'https://source.unsplash.com/random/100x100?sig=' + idx" alt="" class="block-image">
            <input type="text" v-model="updatedItem.url">
            <textarea name="" id="" cols="10" rows="10" v-model="updatedItem.description"></textarea>
        </template>

        <template v-else>
            <h2>{{ updatedItem.title }}</h2>
            <img :src="'https://source.unsplash.com/random/100x100?sig=100'" alt="" class="block-image">
            <p>{{ updatedItem.description }}</p>
        </template>

        <div class="action-buttons">
            <button @click="toggleEdit" v-if="!editing">Edit</button>
            <button @click="updateItem(updatedItem)" v-else>Update</button>

            <button v-if="editing" @click="toggleEdit">Cancel</button>
            <button v-else @click="deleteItem(updatedItem._id)">Delete</button>
        </div>
    </div>

    </div>
</template>

<script>
import ItemService from '../services/item.service';

export default {
    data() {
        return {
            updatedItem: {
                _id: this.item._id,
                title: this.item.title,
                url: this.item.url,
                description: this.item.description
            },
            editing: false,
        }
    },

    props: [ "item" ],

    methods: {

    toggleEdit() {
        this.editing = !this.editing;
    },

    updateItem(item) {
            console.log("item is:", item);
            let data = {
                _id: item._id,
                title: this.updatedItem.title,
                url: this.updatedItem.url,
                description: this.updatedItem.description
            }
            console.log("posting update with values:", data);
            ItemService.update(data)
            .then(res => {
                console.log('update:', res);
            })
            .catch(err => {
                console.log("error:", err);
            })
            .finally(() => {
                this.editing = false;
            })
            console.log("Updating item");
        },

        deleteItem(id){
            console.log("item:", id);
            ItemService.delete(id)
            .then(res => {
                console.log("Deleted item: ", res);
            })
            .catch(err => {
                console.log("error deleteign item: ", err);
            })
        }
    }
}
</script>
<style scoped>
    .edit-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>