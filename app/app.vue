<!-- <script setup lang="ts">
// const toasterProp = {
//   position: 'bottom-right'
//  }

</script> -->

<template>
  <div>
    <NuxtRouteAnnouncer/>
    <NuxtLoadingIndicator />
      <NuxtLayout>
        <UApp>
          <NuxtPage />
        </UApp>
      </NuxtLayout>
  </div>
</template>
