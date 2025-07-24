<!-- <script setup lang="ts">
// const toasterProp = {
//   position: 'bottom-right'
//  }

</script> -->

<template>
  <div>
    <NuxtRouteAnnouncer/>
    <NuxtLoadingIndicator />
    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
