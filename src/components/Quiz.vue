<template>
    <div>
        <div class="wrapper">
          <!-- <Sidebar :questions="questions"/> -->
          <Sidebar />
          <Content/>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import Sidebar from './Sidebar'
import Content from './Content'
export default {
    name: 'Quiz',
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