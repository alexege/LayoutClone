import { defineStore } from 'pinia'
import axios from "axios"

const API_URL = 'http://localhost:8080/api'

export const useItemStore = defineStore({
  id: 'Item',
  state: () => ({
    items: [],
    item: null,
    loading: false,
    error: null
  }),
  getters: {
    allItems: (state) => {
        return state.items;
    }
  },
//   getters: {
//     getItemsPerAuthor: (state) => {
//       return (authorId) => state.Items.filter((Item) => Item.userId === authorId)
//     }
//   }, 
  actions: {
    async fetchItems() {
        this.items = []
        try {
            let items = axios.get(`${API_URL}/items/all`)
            this.items = (await items).data
        } catch (error) {
            console.log('error:', error)
        } finally {
            console.log("finally firing")
        }
    },

    async addItem(item){
        console.log("item.js - addItem", item)
        const response = await axios.post(`${API_URL}/items/addItem`, item)
        this.items = response.data
        await this.fetchItems()
        .then("this.fetchItems firing")
    }
  }
})