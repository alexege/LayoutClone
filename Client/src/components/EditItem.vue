<template>
    <div>
        <div class="edit-container">
        <template v-if="editing">
            <input type="text" v-model="updatedItem.title">
            <img :src="'https://source.unsplash.com/random/100x100?sig=100'" alt="" class="block-image">
            <input type="text" v-model="updatedItem.url">
            <textarea name="" id="" cols="10" rows="10" v-model="updatedItem.description"></textarea>
        </template>

        <template v-else>
            <h2>{{ updatedItem.title }}</h2>
            <img :src="'https://source.unsplash.com/random/100x100?sig=100'" alt="" class="block-image">
            <span>{{ updatedItem.url }}</span>
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

<script setup>
import ItemService from '../services/item.service';
import { ref } from "vue";
import { useItemStore } from '../stores/item';

const { fetchItems } = useItemStore()

const updatedItem = ref({
    _id: props.item._id,
    title: props.item.title,
    url: props.item.url,
    description: props.item.description
})

const editing = ref(false);

const props = defineProps(["item"]);

function toggleEdit() {
    editing.value = !editing.value;
}

function updateItem(item) {
    let data = {
        _id: item._id,
        title: updatedItem.value.title,
        url: updatedItem.value.url,
        description: updatedItem.value.description
    }
    ItemService.update(data)
    .catch(err => {
        console.log("error:", err);
    })
    .finally(() => {
        editing.value = false;
    })
}

function deleteItem(id) {
    console.log("item:", id);
    ItemService.delete(id)
    .then(() => {
        fetchItems()
    })
    .catch(err => {
        console.log("error deleting item: ", err);
    })
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