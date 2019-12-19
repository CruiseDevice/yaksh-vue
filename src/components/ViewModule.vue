<template>
  <div class="wrapper">
    <Sidebar />
    <div id="content">
      <ToggleButton/>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import ToggleButton from './ToggleButton'
import Sidebar from './Sidebar'
export default {
  name: 'ViewModule',
  components: {
    Sidebar,
    ToggleButton
  }
}
</script>
<style>
#content {
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
}
.wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
    perspective: 1500px;
}
</style>
