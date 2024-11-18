<script setup>
import { onMounted, onUnmounted, ref, render } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getAuth, signInWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import { userData } from "@/store/store";

defineProps({
  email: {
    type: [String]
  },
  password: {
    type: [String]
  }
});

const router = useRouter();
const route = useRoute();
const auth = useFirebaseAuth()

const email = ref()
const password = ref()


async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    //localStorage.setItem("user", JSON.stringify(userCredential.user))
    router.go("/")
    // ...
  })
  .catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.error(error)
  });
   
}


onMounted(() => {


});

onUnmounted(() => {});
</script>
<template>
  <div class="wrapper">
    
    <div class="login-wrapper">
      LOGIN
      <div class="login-card">
        <input v-model="email" type="email" />
        <input v-model="password" type="password" />
        <button id="button" @click="login(email, password)">LOGIN</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  height: 100vh;
}
.login-wrapper {
  width: 300px;
  margin: 0 auto;
}
.login-card {
    display: flex;
    flex-direction: column;
}
</style>
