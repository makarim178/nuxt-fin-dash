<template>
  <div class="w-screen h-screen flex items-center">
        <SideNav />
        <div class="w-full h-full flex flex-col p-4 gap-3">
            <DefaultHeader />
            <slot />
        </div>
    </div>
</template>