<template>
    <main>
        <div class="pastryWrapper">
            <PastryItem
                v-for="pastry in localMerch"
                v-bind:key="pastry.ID"
                :pastry="pastry"
                @edit="editPastry(pastry.ID)"
                @delete="deletePastry(pastry.ID)"
            />
        </div>
    </main>

    <div v-if="modalIsOpen" @click.self="closeModal" class="backdrop">
        <div class="modal">
            <div class="createPastry">
                <h2 v-if="isNew">New Pastry</h2>
                <h2 v-else>Edit Pastry</h2>
                <label for="name"
                    >Pastry Name
                    <input
                        required
                        v-model="newPastry.name"
                        type="text"
                        name="name"
                    />
                </label>
                <!-- <img :src="newPastry.picture" alt="" style="width: 300px" /> -->
                <label for="image">
                    Picture
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/png, image/jpeg"
                        @change="loadImage"
                    />
                </label>

                <label for="qty"
                    >Quantity
                    <input type="number" v-model="newPastry.qty" />
                </label>

                <label for="price"
                    >Price
                    <input
                        type="number"
                        name="price"
                        v-model="newPastry.price"
                        min="0"
                    />
                </label>

                <label for="ingredients">
                    Ingredients
                    <ul>
                        <li
                            v-for="ingredient in newPastry.ingredients"
                            v-bind:key="ingredient"
                        >
                            {{ ingredient }}
                        </li>
                    </ul>
                </label>

                <input
                    type="text"
                    name="ingredient"
                    id="ingredient"
                    v-model="newIngredient"
                    @keydown.enter="newPastry.ingredients.push(newIngredient)"
                    placeholder="Insert ingredient and press enter to add"
                />
                <button v-if="isNew" @click="addPastry">Add Pastry</button>
                <button v-else @click="confirmEdit(newPastry.ID)">
                    Edit Pastry
                </button>
            </div>

            <p v-if="loading">loading...</p>
        </div>
    </div>

    <div class="newPastry" @click="openModal(true)">
        <PlusIcon />
    </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import PastryItem from "../components/PastryItem.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import Swal from "sweetalert2";

export default {
    components: {
        PastryItem,
        PlusIcon,
    },
    setup() {
        const API_KEY = "4d714c0f62381ecbdde8cf999abb1b0a";

        let localMerch = ref(
            JSON.parse(window.localStorage["testPasticceria"])
        );

        const isNew = ref(false);
        const modalIsOpen = ref(false);

        const openModal = (isNewPastry) => {
            isNewPastry ? (isNew.value = true) : (isNew.value = false);

            if (isNewPastry) {
                Object.assign(newPastry, initialPastry);
            } else {
                newPastry;
            }

            modalIsOpen.value = true;
        };

        const closeModal = () => {
            modalIsOpen.value = false;
        };

        const newIngredient = ref("");
        const newPicture = ref("");

        const loadImage = (e) => {
            const files = e.target.files;
            if (!files.length) return;

            const reader = new FileReader();
            reader.readAsDataURL(files[0]);

            reader.onload = () => {
                newPicture.value = reader.result.split(",")[1];
            };
        };

        const initialPastry = {
            ID: localMerch.value[localMerch.value.length - 1].ID + 1,
            name: "",
            picture: "",
            qty: 0,
            ingredients: [],
            price: 0,
            dateAdded: new Date().toISOString(),
        };

        const newPastry = reactive({
            ...initialPastry,
        });

        const loading = ref(false);

        const upload = new Promise((res, err) => {});

        const uploadPicture = async (file) => {
            const data = new FormData();
            data.append("image", file);

            loading.value = true;

            const res = await fetch(
                `https://api.imgbb.com/1/upload?expiration=10000&key=${API_KEY}`,
                {
                    method: "POST",
                    body: data,
                }
            )
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    console.log("DONE", res.data.image.url);
                    return res.data.image.url;
                });

            loading.value = false;
            return res;
        };

        const addPastry = () => {
            if (newPicture.value) {
                uploadPicture(newPicture.value).then((res) => {
                    newPastry.picture = res;
                    localMerch.value.push(newPastry);
                    

                    window.localStorage.setItem(
                        "testPasticceria",
                        JSON.stringify(localMerch.value)
                    );

                    newPastry.picture = ""

                    localMerch.value = JSON.parse(
                        window.localStorage['testPasticceria']
                    )
                    
                    newPicture.value = ''
                    loading.value = false;
                    closeModal();
                });
            } else {
                localMerch.value.push(newPastry);

                window.localStorage.setItem(
                    "testPasticceria",
                    JSON.stringify(localMerch.value)
                );
                closeModal();
            }
        };

        const editPastry = (id) => {
            openModal(false);

            newPastry.ID = localMerch.value.find(
                (pastry) => pastry.ID == id
            ).ID;

            newPastry.name = localMerch.value.find(
                (pastry) => pastry.ID == id
            ).name;

            newPastry.picture = localMerch.value.find(
                (pastry) => pastry.ID == id
            ).picture;

            newPastry.qty = localMerch.value.find(
                (pastry) => pastry.ID == id
            ).qty;

            newPastry.ingredients = localMerch.value.find(
                (pastry) => pastry.ID == id
            ).ingredients;

            newPastry.price = localMerch.value.find(
                (pastry) => pastry.ID == id
            ).price;

            newPastry.dateAdded = localMerch.value.find(
                (pastry) => pastry.ID == id
            ).dateAdded;
        };

        const confirmEdit = (id) => {
            let index = localMerch.value.findIndex((pastry) => pastry.ID == id);

            if (newPicture.value) {
                uploadPicture(newPicture.value).then((res) => {
                    newPastry.picture = res;

                    newPicture.value = "";

                    if (index != -1) {
                        localMerch.value[index] = newPastry;
                    }

                    window.localStorage.setItem(
                        "testPasticceria",
                        JSON.stringify(localMerch.value)
                    );

                    localMerch.value = JSON.parse(
                        window.localStorage["testPasticceria"]
                    );

                    loading.value = false;
                    newPastry.picture = "";
                    newPicture.value = ''
                    closeModal();
                });
            } else {
                if (index != -1) {
                    localMerch.value[index] = newPastry;
                }

                window.localStorage.setItem(
                    "testPasticceria",
                    JSON.stringify(localMerch.value)
                );

                localMerch.value = JSON.parse(
                    window.localStorage["testPasticceria"]
                );

                loading.value = false;
                closeModal();
            }
        };

        const deletePastry = (id) => {
            Swal.fire({
                title: "Delete Pastry?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    localMerch.value.splice(
                        localMerch.value.findIndex((pastry) => pastry.ID == id),
                        1
                    );

                    window.localStorage.setItem(
                        "testPasticceria",
                        JSON.stringify(localMerch.value)
                    );

                    Swal.fire(
                        "Deleted!",
                        "Your pastry has been deleted.",
                        "success"
                    );
                }
            });
        };

        return {
            localMerch,
            addPastry,
            newPastry,
            newIngredient,
            newPicture,
            deletePastry,
            editPastry,
            modalIsOpen,
            openModal,
            closeModal,
            loadImage,
            confirmEdit,
            loading,
            isNew,
        };
    },
};
</script>

<style scoped lang='scss'>
.pastryWrapper {
    display: flex;
    flex-wrap: wrap;
}

.wrapper {
    display: flex;
    flex-direction: row;
}

.newPastry {
    width: 100px;
    height: 100px;
    background-color: rgb(45, 235, 58);
    color: #fff;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-items: center;
    position: fixed;
    bottom: 20px;
    right: 20px;
    -webkit-box-shadow: 4px 5px 15px 0px rgba(0, 0, 0, 0.32);
    box-shadow: 4px 5px 15px 0px rgba(0, 0, 0, 0.32);
    z-index: 2;
}

.createPastry {
    display: flex;
    flex-direction: column;
}

.backdrop {
    background-color: rgba(51, 51, 51, 0.391);
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    z-index: 5;
}

.modal {
    background-color: #fff;
    width: 400px;
    padding: 20px;

    &__cover {
        text-align: center;
        background-size: cover;
        background-position: center center;
        width: 100%;
        padding: 30px;
    }
}
</style>