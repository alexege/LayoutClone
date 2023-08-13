<template>
    <div>
        <div>
            <input type="text" v-model="item.title">
            <textarea name="description" cols="30" rows="10" v-model="item.description"></textarea>
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
            })
            .catch(err => {
                console.log("AddItem.vue error:", err);
            })
        }
    }
}
</script>