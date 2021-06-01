<template>
  <v-app id="inspire">
    <v-navigation-drawer dark
      color="#332E60"
      v-model="isMenuOpen"
      app
    >
      <v-list dense nav>
        <v-list-item v-for="item in menuEntries" link :key="item.path" @click="goToRoute(item.path)">
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#682BF2" dark>
      <v-app-bar-nav-icon @click="isMenuOpen = !isMenuOpen"></v-app-bar-nav-icon>

      <v-toolbar-title>{{this.$route.name}}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <error-dialog></error-dialog>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import ErrorDialog from '@/components/dialogs/ErrorDialog'
export default {
  name: 'App',

  components: {
    ErrorDialog
  },

  data: () => ({
    isMenuOpen: true,
    menuEntries: [
      { title: 'Pedidos', path: '/' },
      { title: 'Ordens de Transporte', path: '/transportorders' },
      { title: 'Relatório de Venda', path: '/salesreport' }
    ]
  }),
  methods: {
    goToRoute (route) {
      if (route != null) {
        this.$router.push(route)
      }
    }
  }
}
</script>
