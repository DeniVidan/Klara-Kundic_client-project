import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import MyWork from "../views/MyWork.vue";
import Contact from "../views/Contact.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import WorkDetail from "@/views/WorkDetail.vue";
import Profile from "@/views/Profile.vue";

import { useCurrentUser, useFirebaseAuth } from "vuefire";
import { onAuthStateChanged } from "firebase/auth";

import { Service, Auth } from "@/../services/service";
import { getCurrentUser } from "@/firebase/init";



const auth = useFirebaseAuth()


/* eslint-disable */
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/mywork",
    name: "mywork",
    component: MyWork,
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: `/mywork/:id`,
    name: "workdetail",
    component: WorkDetail,
    props: true
  },
  {
    path: `/profile`,
    name: "profile",
    component: Profile,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* 
let includesPublicRoute = publicRoutes. */



router.beforeEach(async (to, from, next) => {
  let userRoutes = ["/login", "/register"];
  let adminRoutes = ["/profile"]
  let publicRoutes = [
    "/login",
    "/register",
    "/",
    "/about",
    "/work",
    "contact",
    "/services",
  ];
  let loginRequired = !publicRoutes.includes(to.path);
  let isLoginRoute = userRoutes.includes(to.path);
  let isAdminRoute = adminRoutes.includes(to.path)

  const u = await getCurrentUser();
  //console.log(u)

  /*   console.log("a", publicRoutes.includes(to.path), Auth.state.authenticate) */

  if (u && isLoginRoute) {
    next("/");
  } else if (!u && isAdminRoute) {
    next("/")
  } else next();
});

export default router;
