
<template>
  <footer>
      <div class="tudo">


  <div class="criadores">
    <h3>
      Desenvolvidos por:
      </h3>
      <ul>
        <li>
          Kauan dos Santos Luciano
        </li>
        <li>
          Milena Kindlein da Rosa
        </li>
      </ul>

  </div>
  <hr>
  <div class="logo">
    <img src="/public/img/Logo.png" alt="logo">
  </div>

   </div>
    <p>
    © 2025 Alguns direitos reservados
  </p>
  </footer>
</template>

<style scoped>

hr {
  border: 1.4px solid black;
}
div.tudo {
  display: flex;
  justify-content: space-between;
}
footer {
  padding: 3vw 0 2vw 0;
  background-color: #6C0A0A;
}
div.criadores h3 {
  font-size: 1.4vw;
}
div.criadores ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 1vw;
}
div.criadores {
  color: white;
  margin: 4vw 0 2vw 25vw;
}
div.logo {
  margin: 0 18.5vw 0 0;
}
.logo img {
  width: 250%;
  height: 100%;
}
p {
  display: flex;
  justify-content: center;
  margin: 2vw 0 0 0;
  color: white;
}
</style>
