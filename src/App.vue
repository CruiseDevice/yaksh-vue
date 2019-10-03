<template>
  <div>
    <nav class="navbar bg-dark navbar-dark">
      <div class="container-fluid">
          <div class="navbar-header">
              <a class="navbar-brand" href="#">
                  <img src="../static/images/yaksh_banner.png" alt="YAKSH"/>
              </a>
          </div>
      </div>
    </nav>
    <div class="wrapper">
      <!-- <Sidebar :questions="questions"/> -->
      <Sidebar />
      <Content/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Sidebar from './components/Sidebar'
import Content from './components/Content'

export default {
  name: 'App',
  components: {
    Sidebar,
    Content
  }
}
</script>

<style scoped>
.wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
    perspective: 1500px;
}
</style>
