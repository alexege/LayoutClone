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
  actions: {
    async fetchItems() {
        this.items = []
        const response = await axios.get(`${API_URL}/items/all`)
        this.items = response.data;
        // try {
        //     let items = axios.get(`${API_URL}/items/all`)
        //     this.items = (await items).data
        // } catch (error) {
        //     console.log('error:', error)
        // }
    },

    async addItem(item){
        await axios.post(`${API_URL}/items/addItem`, item)
        await this.fetchItems()
    },

    async updateItem(item) {
      console.log("updating an item: ", item);
      const items = await axios.patch(`${API_URL}/items/update/${item._id}`, item)
      console.log("items:", items);
      try {
        const all_items = await this.fetchItems()
        console.log("all:", all_items);
      } catch (e) {
        console.log("e:", e);
      }
      // this.items = all_items.data;
    },

    async update(item) {
      console.log("updating an item: ", item);
      const res = await axios.patch(`${API_URL}/items/update/${item._id}`)
      console.log("res:", res);
      const all_items = await this.fetchItems()
      console.log("all_items:", all_items);
      // this.items = all_items.data;
    }
  }
})