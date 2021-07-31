<template>
  <v-app>
    <template v-if="userModule.isLoggedIn">
      <v-navigation-drawer
        v-model="drawer"
        dark
        app
      >
        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="v in views"
            :key="v.title"
            :link="true"
            :to="v.url"
          >
            <v-list-item-icon>
              <v-icon>{{v.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{v.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </template>

    <v-app-bar
      app
      dark
    >
      <template v-if="userModule.isLoggedIn">
        <v-app-bar-nav-icon v-on:click="drawer = !drawer"/>
      </template>
      <v-btn class="text-h6" elevation="0" to="/" plain>
        <span>Todo Lists</span>
      </v-btn>
      <v-spacer></v-spacer>
      <template v-if="!userModule.isLoggedIn">
        <v-btn class="mr-2" elevation="0" to="/login">
          <span>Log in</span>
        </v-btn>
        <v-btn elevation="0" to="/signup">
          <span>Sign up</span>
        </v-btn>
      </template>
      <template v-else>
        <v-btn elevation="0" to="/signup">
          <span>Log out</span>
        </v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator"
import { getModule } from 'vuex-module-decorators';
import UserModule from '@/store/UserModule';

@Component
export default class App extends Vue {
  drawer: boolean | null = null;
  views!:Array<object>;
  userModule:UserModule = getModule(UserModule);

  created()
  {
    this.views = [
      {title: "Todo list", icon: "mdi-format-list-checks", url: "/todo-list"},
      //{title: "Calendar", icon: "mdi-calendar-clock-outline", url: "/calendar"},
      {title: "History", icon: "mdi-history", url: "/history"},
    ]
  }
}

</script>
