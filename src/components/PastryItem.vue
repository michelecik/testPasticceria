<template>
    <div class="pastry" :style="'background-image: url(' + pastry.picture + ')'">

        <div class="actions" v-if="$route.path == '/backoffice'">
            <div class="delete">
                <TrashIcon @click="$emit('delete', pastry.ID)" />
            </div>

            <div class="edit">
                <PencilIcon @click="$emit('edit', pastry.ID)" />
            </div>
        </div>

        <div class="pastry__label">
            <h3>{{ pastry.name }} - Qty. {{ pastry.qty }}</h3>
            <div class="pastry__price">
                {{ calculatedPrice }} $
            </div>
        </div>
    </div>
</template>

<script>
import { onUpdated, ref, watch } from "vue";
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

export default {
    components: {
        PencilIcon,
        TrashIcon
    },
    props: {
        pastry: Object,
    },
    setup(props) {
        const available = ref();

        const calculatedPrice = ref();

        const price = ref(props.pastry.price)

        const daysGoneBy = ref();

        const coeffPriceChange = {
            0: 1,
            1: 0.8,
            2: 0.2,
        };

        const calcCurrentPrice = () => {
            console.log('ricalcolo')
            const today = new Date();
            const difference = today - new Date(props.pastry.dateAdded);
            console.log(props.pastry.dateAdded)
            daysGoneBy.value = Math.floor(difference / (1000 * 3600 * 24));
            if (daysGoneBy.value > 2) {
                calculatedPrice.value = "Not Available";
            } else {
                calculatedPrice.value = parseFloat((
                    parseFloat(props.pastry.price) * coeffPriceChange[daysGoneBy.value]
                ).toFixed(2));
            }
        };

        calcCurrentPrice();

        return {
            calculatedPrice,
            daysGoneBy,
        };
    },
};
</script>

<style lang='scss' scoped>
.wrapper {
    display: flex;
    flex-wrap: wrap;
}

.actions {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;

    & div {
        cursor: pointer;
        margin: 5px;
        display: flex;
        -webkit-box-shadow: 4px 5px 15px 0px rgba(0, 0, 0, 0.32);
        box-shadow: 4px 5px 15px 0px rgba(0, 0, 0, 0.32);
    }

    & div svg {
        width: 20px;
        margin: auto;
        color: #fff;
    }
}

.delete {
    background-color: rgb(227, 46, 46);
    border-radius: 100%;
    width: 30px;
    height: 30px;
}

.edit {
    background-color: rgb(202, 233, 43);
    border-radius: 100%;
    width: 30px;
    height: 30px;
}

.pastry {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 200px;
    height: 200px;
    margin: 10px;
    border-radius: 5px;
    background-size: cover;
    background-position: center center;
    -webkit-box-shadow: 4px 5px 15px 0px rgba(0, 0, 0, 0.32);
    box-shadow: 4px 5px 15px 0px rgba(0, 0, 0, 0.32);

    &__label {
        background: rgba(255, 255, 255, 0.621);
        color: #333;
        padding: 5px 10px;
    }

    &__fullPrice {
        font-weight: bold;
    }
}
</style>
