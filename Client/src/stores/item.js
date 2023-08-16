import { defineStore } from 'pinia'

export const useItemStore = defineStore({
  id: 'Item',
  state: () => ({
    Items: [],
    Item: null,
    loading: false,
    error: null
  }),
  getters: {
    getItemsPerAuthor: (state) => {
      return (authorId) => state.Items.filter((Item) => Item.userId === authorId)
    }
  }, 
  actions: {
    async fetchItems() {
      this.Items = []
      this.loading = true
      try {
        this.Items = await fetch('http://127.0.0.1:8081/api/items/all')
        .then((response) => response.json()) 
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    // async fetchItem(id) {
    //   this.Item = null
    //   this.loading = true
    //   try {
    //     this.Item = await fetch(`https://jsonplaceholder.typicode.com/Items/${id}`)
    //     .then((response) => response.json())
    //   } catch (error) {
    //     this.error = error
    //   } finally {
    //     this.loading = false
    //   }
    // }
  }
})