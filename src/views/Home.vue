<script setup>

</script>

<template>
  <div>
    <h1>Home</h1>
  </div>

  <section>
<div class="texto">
  <h1>
    Seja bem vindo ao StreamPlatform!
  </h1>
  <p>
    Aqui você encontrará uma grande variedade de <br> filmes, além de saber em qual plataforma de <br> streaming cada um está disponível.  <br> Aproveite e descubra seu próximo filme favorito!
  </p>
</div>
<div class="imagem">
 <img src="/public/img/boas-vindas.png" alt="boas/vindas" width="480vw" height="480vw">

</div>

  </section>

  <hr>

</template>

<style scoped>
section {
  display: flex;
  justify-content: space-between;
  align-items: center;

}
.texto {
  text-align: center;
  margin: 4vw 0 0 15vw;

}
.texto h1 {
  font-size: 2.2vw;
}
.texto p {
  font-size: 1.3vw;
  margin-top: 1vw;
}
.imagem {
  margin: 4vw 15vw 0 0;
}
hr {
  margin: 6vw 3vw 0 3vw;
   border: 4.3px solid #1D1D1D;

}
</style>
