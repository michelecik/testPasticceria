<script>
import { ref } from "@vue/reactivity";
import PastryItem from "../components/PastryItem.vue";

export default {
    components: {
        PastryItem,
    },
    setup() {
        const localMerch = window.localStorage["testPasticceria"]
            ? JSON.parse(window.localStorage["testPasticceria"])
            : undefined;

        console.log(localMerch);

        const currentPastry = ref();

        const modalIsOpen = ref(false);

        const openModal = (id) => {
            currentPastry.value = localMerch.find(
                (element) => element.ID == id
            );

            console.log(currentPastry.value)
            modalIsOpen.value = true;
        };

        const closeModal = () => {
            modalIsOpen.value = false;
        };

        return {
            localMerch,
            openModal,
            closeModal,
            modalIsOpen,
            currentPastry,
        };
    },
};
</script>

<template>
    <main>
        <div class="wrapper">
            <PastryItem
                v-for="pastry in localMerch"
                v-bind:key="pastry.ID"
                :pastry="pastry"
                @click="openModal(pastry.ID)"
            />
        </div>
    </main>

    <div v-if="modalIsOpen" @click.self="closeModal" class="backdrop">
        <div class="modal">
            <div
                class="modal__cover"
                :style="`background-image: url(${currentPastry.picture})`"
            >
                <h1>
                    {{ currentPastry.name }}
                </h1>
            </div>
            <div class="modal__content">
                <h3>Ingredients</h3>
                <ul>
                    <li
                        v-for="ingredient in currentPastry.ingredients"
                        v-bind:key="ingredient"
                    >
                        {{ ingredient }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.wrapper {
    display: flex;
    flex-wrap: wrap;
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
}

.modal {
    background-color: #fff;
    width: 400px;

    &__cover {
        text-align: center;
        background-size: cover;
        background-position: center center;
        width: 100%;
        padding: 30px;
    }

    &__content {
      padding: 20px;
    }
}
</style>

