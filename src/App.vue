<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  setup() {

    let localMerch = window.localStorage['testPasticceria'] ? JSON.parse(window.localStorage['testPasticceria']) : undefined

    const merch = [
    {
        "ID": 1,
        "name": "Croissant",
        "price": 3.50,
        "qty": 4,
        "ingredients": ["flour", "butter", "milk", "sugar", "yeast"],
        "picture": "https://images.unsplash.com/photo-1587912001191-0cd4f14fd89e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        "dateAdded": new Date().toISOString()
    },
    {
        "ID": 2,
        "name": "Baguette",
        "price": 2.75,
        "qty": 4,
        "ingredients": ["flour", "water", "salt", "yeast"],
        "picture": "https://images.unsplash.com/photo-1533782654613-826a072dd6f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80",
        "dateAdded": new Date().toISOString()
    },
    {
        "ID": 3,
        "name": "Chocolate Chip Cookie",
        "price": 1.50,
        "qty": 4,
        "ingredients": ["flour", "butter", "sugar", "eggs", "chocolate chips"],
        "picture": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
        "dateAdded": new Date().toISOString()
    },
    {
        "ID": 4,
        "name": "Blueberry muffin",
        "price": 2.25,
        "qty": 4,
        "ingredients": ["flour", "butter", "milk", "sugar", "blueberries"],
        "picture": "https://images.unsplash.com/photo-1613119719948-d53865658a88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
        "dateAdded": new Date().toISOString()
    },
    {
        "ID": 5,
        "name": "Cheese Danish",
        "price": 3.00,
        "qty": 4,
        "ingredients": ["flour", "butter", "milk", "sugar", "yeast","cheese"],
        "picture": "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80",
        "dateAdded": new Date().toISOString()
    },
    {
        "ID": 6,
        "name": "Strawberry tart",
        "price": 4.00,
        "qty": 4,
        "ingredients": ["flour", "butter", "milk", "sugar", "strawberries","eggs"],
        "picture": "https://images.unsplash.com/photo-1626813701082-b6c7040c4219?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        "dateAdded": new Date().toISOString()
    },
    {
        "ID": 7,
        "name": "Donut",
        "price": 2.00,
        "qty": 4,
        "ingredients": ["flour", "butter", "milk", "sugar", "yeast","chocolate"],
        "picture": "https://images.unsplash.com/photo-1533910534207-90f31029a78e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        "dateAdded": new Date().toISOString()
    },
    {
        "ID": 8,
        "name": "Cupcake",
        "price": 2.50,
        "qty": 4,
        "ingredients": ["flour", "butter", "milk", "sugar","vanilla"],
        "picture": "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        "dateAdded": new Date().toISOString()
    },
    ]

    if(!localMerch) {
      console.log('no localMerch')
      window.localStorage.setItem('testPasticceria', JSON.stringify(merch))
      localMerch = JSON.parse(window.localStorage['testPasticceria'])
    }

    return {
      localMerch
    }
  },
}
</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/backoffice">Back office</RouterLink>
    </nav>
    <header>
      <h1>Pasticceria</h1>
    </header>

    <RouterView />
</template>

<style scoped>



nav {
  display: flex;
  align-content: center;
  justify-content: space-around;
  background-color: #333;
  color: #fff;
  margin-bottom: 25px;
  height: 100px;
}

nav a {
  margin: auto;
}

h1 {
  text-align: center;
  margin: 25px 0
}

</style>