<template>
    <div class="layout-container">
        <img :src="'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png'" alt="">
        <label for="">Layout Name</label>
        <!-- <input type="text" v-model="title"> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: null,
            url: null
        }
    }
}
</script>
<style scoped>
.layout-container {
    width: 100%;
    padding: 15px 5px;
    margin: 0 5px;
    /* border-radius: 0 0 5px 5px; */
    border-top: 2px solid white;
    background-color: rgb(63, 63, 63);
    display: flex;
}

.layout-container img {
    width: 50px;
    height: 50px;
}

.layout-container label {
    margin: 1em;
}
</style>