<template>
    <div>
        <div>
            <div class="card">
                <p class="card-title">SidePanel</p>
                <button class="save-button">
                    Save
                </button>
                <button class="add-button">
                    +
                </button>
            </div>
            
            <AddItem/>

            <div class="items">
                <span v-for="item in items" :key="item" class="item">
                    <!-- <img :src="'https://source.unsplash.com/random/20x20?sig=' + item" alt=""> -->
                    <span class="layout-title"> - Layout Name</span>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import AddItem from '../components/AddItem.vue'

export default {
    components: { AddItem },
    data() {
        return {
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            item: {
                title: null,
                description: 'Default description'
            }
        }
    }
}
</script>
<style scoped>
    h2 {
        text-align: center;
    }

    .card {
        background-color: rgb(63, 63, 63);
        border-radius: 5px;
        padding: 5px;
        margin: 5px;
        width: 100%;
        flex-basis: 100%;
        display: flex;
        align-items: center;
        text-align: left;
    }

    .card-title {
        font-size: 1.5em;
        color: white;
        width: 50%;
        margin: 0.25em;
    }

    .save-button {
        width: 25%;
        padding: 1em;
        margin: 0.25em;
    }

    .add-button {
        width: 25%;
        padding: 1em;
        margin: 0.25em;
    }

    .item {
        display: flex;
        padding: 1em;
        margin: 0.25em;
        width: 100%;
        background-color: rgb(63, 63, 63)
    }

    .items {
        display: flex;
        margin: .25em;
        flex-direction: column;
    }

    .layout-title {
        padding: 0.5em;
    }
</style>