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
        try {
            let items = axios.get(`${API_URL}/items/all`)
            this.items = (await items).data
        } catch (error) {
            console.log('error:', error)
        }
    },

    async addItem(item){
        await axios.post(`${API_URL}/items/addItem`, item)
        await this.fetchItems()
    }
  }
})