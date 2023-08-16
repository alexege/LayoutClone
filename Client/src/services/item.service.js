// import axios from "axios";
import api from './api';

// const API_URL = "http://localhost:8080/api/item/";

class ItemService {
    findAll() {
        return api.get("/items/all");
    }

    addItem(data) {
        return api.post("/items/addItem", data);
    }

    update(item) {
        return api.post("/items/update/" + item._id, {
            title: item.title,
            url: item.url,
            description: item.description
        })
        .catch(err => {
            console.log('error:', err);
        })
    }

    delete(id) {
        return api.delete("/items/delete/" + id)
        .catch(err => {
            console.log('err:', err);
        })
    }
}

export default new ItemService();