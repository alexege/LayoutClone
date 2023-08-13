<template>
    <div class="dashboard">
        <h2>Admin Dashboard</h2>
        <div class="items">
            <div v-for="(item, idx) in allItems" :key="item._id" class="block">
                <template v-if="editItem">
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
                    <button @click="toggleEdit">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ItemService from '../services/item.service';
export default {
    data() {
        return {
            allItems: null,
            editItem: false,

            item: {
                title: null,
                url: null,
                description: null
            }
        }
    },

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
            let data = {
                _id: item._id,
                title: this.item.title,
                description: this.item.description
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