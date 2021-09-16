<template>
    <div id="PreLoader">
        <img  :src="'/images/agil-loader.gif'" alt="Agil loader"/>
    </div>
</template>

<style scoped>
    #PreLoader{
        position: fixed;
        height: 100%;
        width:100%;
        background-color: #323232bd;
        z-index: 999999999999;
    }
    img{
        z-index: 9999999999999;
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
        width: 40vw;
    }
</style>
