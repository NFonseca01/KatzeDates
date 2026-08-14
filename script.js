"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     ELEMENTOS
     ===================================================== */

  const mainCard = document.getElementById("main-card");

  const btnSi = document.getElementById("btn-si");
  const btnNo = document.getElementById("btn-no");
  const catGif = document.getElementById("cat-gif");

  const customAlert = document.getElementById("custom-alert");
  const alertTitle = document.getElementById("alert-title");
  const alertMessage = document.getElementById("alert-message");
  const btnCerrarAlert = document.getElementById("btn-cerrar-alert");

  const loveAlert = document.getElementById("love-alert");
  const btnAbrirCarta = document.getElementById("btn-abrir-carta");

  const loveLetter = document.getElementById("love-letter");

  const saveErrorAlert = document.getElementById("save-error-alert");
  const btnCerrarError = document.getElementById("btn-cerrar-error");

  /* Pantallas */

  const screenInicio = document.getElementById("screen-inicio");
  const screenFecha = document.getElementById("screen-fecha");
  const screenHorario = document.getElementById("screen-horario");
  const screenActividad = document.getElementById("screen-actividad");
  const screenConfirmacion = document.getElementById("screen-confirmacion");

  /* Fecha */

  const fechaCita = document.getElementById("fecha-cita");
  const btnContinuarFecha = document.getElementById("btn-continuar-fecha");
  const btnVolverFecha = document.getElementById("btn-volver-fecha");

  /* Horarios */

  const timeButtons = document.querySelectorAll(".time-btn");
  const btnContinuarHorario = document.getElementById("btn-continuar-horario");
  const btnVolverHorario = document.getElementById("btn-volver-horario");

  /* Actividades */

  const activityButtons = document.querySelectorAll(".activity-btn");
  const btnConfirmarActividad =
    document.getElementById("btn-confirmar-actividad");

  /* Confirmación */

  const confirmacionFecha =
    document.getElementById("confirmacion-fecha");

  const confirmacionHora =
    document.getElementById("confirmacion-hora");

  const confirmacionActividad =
    document.getElementById("confirmacion-actividad");


  /* =====================================================
     COMPROBACIÓN BÁSICA
     ===================================================== */

  console.log("✅ script.js cargado correctamente");


  /* =====================================================
     GIFS
     ===================================================== */

  const gifsGatosTristes = [
    "gato-triste-1.gif",
    "gato-triste-2.gif",
    "gato-triste-3.gif"
  ];

  const gifGatoFeliz = "gato-feliz.gif";


  /* =====================================================
     MENSAJES DEL NO
     ===================================================== */

  const mensajesNo = [
    "¿Segura? El gatito se va a poner triste... 😿",
    "Piénsalo bien, ¡mira esa carita! 🐾",
    "Ese botón de Sí se ve cada vez más tentador... 👀",
    "¡Epa! El gatito está negociando contigo 😼",
    "Ese botón de No está desapareciendo... 🤏😹",
    "Creo que el universo quiere que pulses Sí 😂",
    "Última oportunidad para salvar al gatito 😿❤️"
  ];


  /* =====================================================
     ESTADO
     ===================================================== */

  let contadorNo = 0;

  let siFontSize = 18;
  let siPaddingV = 12;
  let siPaddingH = 28;

  let noFontSize = 18;
  let noPaddingV = 12;
  let noPaddingH = 28;

  let aceptoLaCita = false;

  let cita = {
    fecha: null,
    hora: null,
    actividad: null
  };


  /* =====================================================
     FECHA MÍNIMA
     ===================================================== */

  const hoy = new Date();

  const year = hoy.getFullYear();

  const month = String(hoy.getMonth() + 1).padStart(2, "0");

  const day = String(hoy.getDate()).padStart(2, "0");

  fechaCita.min = `${year}-${month}-${day}`;


  /* =====================================================
     CAMBIAR PANTALLA
     ===================================================== */

  function mostrarPantalla(pantalla) {

    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active");
    });

    pantalla.classList.add("active");

    mainCard.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }


  /* =====================================================
     ALERTA
     ===================================================== */

  function mostrarAlerta(titulo, mensaje) {

    alertTitle.textContent = titulo;
    alertMessage.textContent = mensaje;

    customAlert.classList.add("show");
  }


  function cerrarAlerta() {
    customAlert.classList.remove("show");
  }


  /* =====================================================
     CORAZONES
     ===================================================== */

  function lanzarCorazones() {

    const cantidad = 30;

    for (let i = 0; i < cantidad; i++) {

      const heart = document.createElement("span");

      heart.textContent =
        ["❤️", "💕", "💗", "💖"][Math.floor(Math.random() * 4)];

      heart.style.position = "fixed";
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.top = `${60 + Math.random() * 15}vh`;
      heart.style.fontSize = `${18 + Math.random() * 20}px`;
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "2000";

      document.body.appendChild(heart);

      const duration = 1200 + Math.random() * 1200;
      const distance = 150 + Math.random() * 300;

      heart.animate(
        [
          {
            transform: "translateY(0) scale(0.8)",
            opacity: 1
          },
          {
            transform: `translateY(-${distance}px) scale(1.2)`,
            opacity: 0
          }
        ],
        {
          duration: duration,
          easing: "ease-out",
          fill: "forwards"
        }
      );

      setTimeout(() => {
        heart.remove();
      }, duration + 100);
    }
  }


  /* =====================================================
     BOTÓN NO
     ===================================================== */

  btnNo.addEventListener("click", () => {

    console.log("❌ Se pulsó NO");

    /* Cambiar GIF */

    catGif.src =
      gifsGatosTristes[
        contadorNo % gifsGatosTristes.length
      ];

    /* Crecer SÍ */

    siFontSize += 20;
    siPaddingV += 10;
    siPaddingH += 15;

    btnSi.style.fontSize = `${siFontSize}px`;

    btnSi.style.padding =
      `${siPaddingV}px ${siPaddingH}px`;


    /* Encoger NO */

    noFontSize = Math.max(4, noFontSize - 10);
    noPaddingV = Math.max(2, noPaddingV - 3);
    noPaddingH = Math.max(5, noPaddingH - 5);

    btnNo.style.fontSize = `${noFontSize}px`;

    btnNo.style.padding =
      `${noPaddingV}px ${noPaddingH}px`;


    /* Mensaje */

    mostrarAlerta(
      "😿 ¡Gatito triste!",
      mensajesNo[
        contadorNo % mensajesNo.length
      ]
    );

    contadorNo++;

  });


  /* =====================================================
     BOTÓN SÍ
     ===================================================== */

  btnSi.addEventListener("click", () => {

    console.log("✅ Se pulsó SÍ");

    aceptoLaCita = true;

    catGif.src = gifGatoFeliz;

    lanzarCorazones();

    mainCard.style.transform = "scale(0.96)";

    setTimeout(() => {
      mainCard.style.transform = "scale(1)";
    }, 180);

    mostrarAlerta(
      "❤️ ¡Al cabo que ni quería! ❤️",
      "Espera... ¿le dio a Sí? 😳 Waos, esto se está poniendo serio 😏💕"
    );

  });


  /* =====================================================
     CERRAR ALERTA
     ===================================================== */

  btnCerrarAlert.addEventListener("click", () => {

    console.log("🔘 Se cerró la alerta");

    cerrarAlerta();

    if (aceptoLaCita) {

      mostrarPantalla(screenFecha);

    }

  });


  /* =====================================================
     CERRAR ALERTA HACIENDO CLICK FUERA
     ===================================================== */

  customAlert.addEventListener("click", (event) => {

    if (event.target === customAlert) {

      cerrarAlerta();

    }

  });


  /* =====================================================
     FECHA
     ===================================================== */

  fechaCita.addEventListener("change", () => {

    cita.fecha = fechaCita.value;

    btnContinuarFecha.disabled =
      !cita.fecha;

    console.log("📅 Fecha:", cita.fecha);

  });


  /* =====================================================
     CONTINUAR FECHA
     ===================================================== */

  btnContinuarFecha.addEventListener("click", () => {

    if (!cita.fecha) {

      mostrarAlerta(
        "📅 Falta la fecha",
        "Primero tienes que elegir qué día nos vemos 💕"
      );

      return;
    }

    mostrarPantalla(screenHorario);

  });


  /* =====================================================
     VOLVER A FECHA
     ===================================================== */

  btnVolverFecha.addEventListener("click", () => {

    mostrarPantalla(screenFecha);

  });


  /* =====================================================
     HORARIOS
     ===================================================== */

  timeButtons.forEach((button) => {

    button.addEventListener("click", () => {

      console.log(
        "🕐 Horario:",
        button.dataset.time
      );

      timeButtons.forEach((item) => {
        item.classList.remove("selected");
      });

      button.classList.add("selected");

      cita.hora = button.dataset.time;

      btnContinuarHorario.disabled = false;

    });

  });


  /* =====================================================
     CONTINUAR HORARIO
     ===================================================== */

  btnContinuarHorario.addEventListener("click", () => {

    if (!cita.hora) {

      mostrarAlerta(
        "🕐 Falta la hora",
        "Elige un horario para continuar 💕"
      );

      return;
    }

    mostrarPantalla(screenActividad);

  });


  /* =====================================================
     VOLVER AL HORARIO
     ===================================================== */

  btnVolverHorario.addEventListener("click", () => {

    mostrarPantalla(screenHorario);

  });


  /* =====================================================
     ACTIVIDADES
     ===================================================== */

  activityButtons.forEach((button) => {

    button.addEventListener("click", () => {

      console.log(
        "🎯 Actividad:",
        button.dataset.activity
      );

      activityButtons.forEach((item) => {
        item.classList.remove("selected");
      });

      button.classList.add("selected");

      cita.actividad =
        button.dataset.activity;

      btnConfirmarActividad.disabled = false;

    });

  });


  /* =====================================================
     CONFIRMAR CITA
     ===================================================== */

  btnConfirmarActividad.addEventListener("click", async () => {

    console.log("💌 Confirmando cita...");

    if (
      !cita.fecha ||
      !cita.hora ||
      !cita.actividad
    ) {

      return;
    }


    btnConfirmarActividad.disabled = true;


    /*
     * Mostramos los datos.
     */

    confirmacionFecha.textContent =
      formatearFecha(cita.fecha);

    confirmacionHora.textContent =
      cita.hora;

    confirmacionActividad.textContent =
      cita.actividad;


    /*
     * Guardado temporal.
     *
     * Lo sustituiremos por Cloudflare Worker + D1.
     */

    const guardado =
      await guardarCita(cita);


    if (!guardado) {

      saveErrorAlert.classList.add("show");

      btnConfirmarActividad.disabled = false;

      return;
    }


    mostrarPantalla(screenConfirmacion);

    lanzarCorazones();


    setTimeout(() => {

      loveAlert.classList.add("show");

    }, 1200);

  });


  /* =====================================================
     FORMATEAR FECHA
     ===================================================== */

  function formatearFecha(fechaISO) {

    const fecha =
      new Date(`${fechaISO}T12:00:00`);

    return new Intl.DateTimeFormat(
      "es-ES",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    ).format(fecha);

  }


  /* =====================================================
     GUARDAR CITA
     ===================================================== */

  async function guardarCita(datos) {

    try {

      /*
       * Por ahora únicamente guardamos localmente.
       *
       * Más adelante:
       *
       * fetch("/api/citas", ...)
       *
       * hacia Cloudflare Worker.
       */

      localStorage.setItem(
        "ultimaCita",
        JSON.stringify({
          fecha: datos.fecha,
          hora: datos.hora,
          actividad: datos.actividad,
          creadoEn: new Date().toISOString()
        })
      );

      return true;

    } catch (error) {

      console.error(
        "Error guardando la cita:",
        error
      );

      return false;
    }

  }


  /* =====================================================
     ABRIR CARTA
     ===================================================== */

  btnAbrirCarta.addEventListener("click", () => {

    loveAlert.classList.remove("show");

    loveLetter.classList.add("show");

    setTimeout(() => {

      loveLetter.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      lanzarCorazones();

    }, 150);

  });


  /* =====================================================
     CERRAR ALERTA DE ERROR
     ===================================================== */

  btnCerrarError.addEventListener("click", () => {

    saveErrorAlert.classList.remove("show");

  });


  /* =====================================================
     ESC
     ===================================================== */

  document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
      return;
    }

    customAlert.classList.remove("show");
    loveAlert.classList.remove("show");
    saveErrorAlert.classList.remove("show");

  });


  /* =====================================================
     FIN
     ===================================================== */

  console.log("❤️ Aplicación inicializada correctamente");

});