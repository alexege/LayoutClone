<template>
    <div class="dashboard">
        <h2>Admin Dashboard</h2>
        <AddItem/>
        <div class="items">
            <div v-for="item in allItems" :key="item._id" class="block">
                <EditItem :item="item"/>
                <!-- <template v-if="editItem">
                    <input type="text" v-model="item.title">
                    <img :src="'https://source.unsplash.com/random/100x100?sig=' + idx" alt="" class="block-image">
                    <input type="text" v-model="item.url">
                    <textarea name="" id="" cols="10" rows="10" v-model="item.description"></textarea>
                </template>

                <template v-else>
                    <label for="" value="{{ item.title }}">{{ item.title }}</label>
                    <img :src="'https://source.unsplash.com/random/100x100?sig=' + idx" alt="" class="block-image">
                    <p>{{ item.description }}</p>
                </template>

                <div class="action-buttons">
                    <button @click="toggleEdit" v-if="!editItem">Edit</button>
                    <button @click="updateItem(item)" v-else>Update</button>

                    <button v-if="editItem" @click="toggleEdit">Cancel</button>
                    <button v-else @click="deleteItem(item._id)">Delete</button>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import ItemService from '../services/item.service';
import AddItem from '../components/AddItem.vue'
import EditItem from '../components/EditItem.vue'

export default {
    data() {
        return {
            allItems: null,
            editItem: false,

            updatedItem: {
                title: null,
                url: null,
                description: null
            }
        }
    },

    components: { AddItem, EditItem },

    mounted() {
        this.getAllItems();
    },

    methods: {
        getAllItems() {
            ItemService.findAll()
            .then(res => {
                console.log("res:", res);
                this.allItems = res.data.items;
            })
            .catch(err => {
                console.log("getAllItems error: ", err);
            })
        },

        toggleEdit() {
            this.editItem = !this.editItem;
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
                this.editItem = false;
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