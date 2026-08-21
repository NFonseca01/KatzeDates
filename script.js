document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // CONFIGURACIÓN DE ENDPOINTS DEL WORKER
  // ==========================================
  const API_URL = "/api/citas";
  const LOGIN_URL = "/api/login";

  // ==========================================
  // VARIABLES DE ESTADO
  // ==========================================
  let fechaSeleccionada = "";
  let horaSeleccionada = "";
  let actividadSeleccionada = "";

  // ==========================================
  // REFERENCIAS A PANTALLAS
  // ==========================================
  const screens = {
    inicio: document.getElementById("screen-inicio"),
    fecha: document.getElementById("screen-fecha"),
    horario: document.getElementById("screen-horario"),
    actividad: document.getElementById("screen-actividad"),
    confirmacion: document.getElementById("screen-confirmacion"),
  };

  // ==========================================
  // BOTONES PRINCIPALES
  // ==========================================
  const btnSi = document.getElementById("btn-si");
  const btnNo = document.getElementById("btn-no");
  const btnContinuarFecha = document.getElementById("btn-continuar-fecha");
  const btnContinuarHorario = document.getElementById("btn-continuar-horario");
  const btnConfirmarActividad = document.getElementById("btn-confirmar-actividad");

  // ==========================================
  // BOTONES DE NAVEGACIÓN
  // ==========================================
  const btnVolverFecha = document.getElementById("btn-volver-fecha");
  const btnVolverHorario = document.getElementById("btn-volver-horario");

  // ==========================================
  // INPUTS Y SELECCIONES
  // ==========================================
  const inputFecha = document.getElementById("fecha-cita");
  const timeBtns = document.querySelectorAll(".time-btn");
  const activityBtns = document.querySelectorAll(".activity-btn");

  // ==========================================
  // ALERTAS Y MODALES
  // ==========================================
  const customAlert = document.getElementById("custom-alert");
  const btnCerrarAlert = document.getElementById("btn-cerrar-alert");

  const loveAlert = document.getElementById("love-alert");
  const btnAbrirCarta = document.getElementById("btn-abrir-carta");

  const saveErrorAlert = document.getElementById("save-error-alert");
  const btnCerrarError = document.getElementById("btn-cerrar-error");

  // ==========================================
  // ELEMENTOS DEL EASTER EGG ADMIN
  // ==========================================
  const copyrightTrigger = document.getElementById("copyright-trigger");
  const adminModal = document.getElementById("admin-login-modal");
  const adminPassInput = document.getElementById("admin-pass-input");
  const btnAdminLogin = document.getElementById("btn-admin-login");
  const btnAdminCancel = document.getElementById("btn-admin-cancel");

  // ==========================================
  // FUNCIÓN DE NAVEGACIÓN
  // ==========================================
  function showScreen(screenTarget) {
    Object.values(screens).forEach((screen) => {
      if (screen) {
        screen.classList.remove("active");
      }
    });

    if (screenTarget) {
      screenTarget.classList.add("active");
    }
  }

  // ==========================================
  // FECHA MÍNIMA: HOY
  // ==========================================
  if (inputFecha) {
    const today = new Date().toISOString().split("T")[0];
    inputFecha.setAttribute("min", today);
  }

  // ==========================================
  // PANTALLA 1: BOTÓN "SÍ"
  // ==========================================
  if (btnSi) {
    btnSi.addEventListener("click", () => {
      if (customAlert) {
        customAlert.style.display = "flex";
      }
    });
  }

  // ==========================================
  // CERRAR ALERTA DEL "SÍ"
  // ==========================================
  if (btnCerrarAlert) {
    btnCerrarAlert.addEventListener("click", () => {
      if (customAlert) {
        customAlert.style.display = "none";
      }

      showScreen(screens.fecha);
    });
  }

  // ==========================================
  // BOTÓN "NO" (ESQUIVAR AL ACERCARSE / TOUCH)
  // ==========================================
  if (btnNo) {
    let noAttempts = 0;
    let siScale = 1;
    let noScale = 1;

    const MAX_ATTEMPTS = 3;
    let finalActionExecuted = false;

    const handleNoInteraction = (e) => {
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();

      // PRIMEROS 3 INTENTOS: ESQUIVAR
      if (noAttempts < MAX_ATTEMPTS) {
        noAttempts++;

        const x = (Math.random() - 0.5) * 180;
        const y = (Math.random() - 0.5) * 100;

        btnNo.style.transition = "transform 0.2s ease";
        btnNo.style.transform = `translate(${x}px, ${y}px) scale(${noScale})`;

        return;
      }

      // ACCIÓN FINAL TRAS EL TERCER INTENTO
      if (finalActionExecuted) return;
      finalActionExecuted = true;

      // Volver a posición original
      btnNo.style.transition = "transform 0.3s ease";
      btnNo.style.transform = "translate(0, 0)";

      // Aumentar tamaño del "Sí"
      if (btnSi) {
        siScale += 0.4;
        btnSi.style.transition = "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        btnSi.style.transform = `scale(${siScale})`;
      }

      // Reducir tamaño del "No"
      noScale = Math.max(0.6, noScale - 0.3);
      btnNo.style.transform = `translate(0, 0) scale(${noScale})`;

      // Cambiar texto
      btnNo.innerText = "No 😿";

      // Mostrar alerta tras breve pausa
      setTimeout(() => {
        if (customAlert) {
          customAlert.style.display = "flex";
        }
      }, 350);
    };

    // 1. Esquivar al pasar el cursor por encima (Escritorio)
    btnNo.addEventListener("mouseover", handleNoInteraction);

    // 2. Esquivar al tocar en pantallas táctiles (Móvil)
    btnNo.addEventListener(
      "touchstart",
      (e) => {
        handleNoInteraction(e);
      },
      { passive: false }
    );
  }

  // ==========================================
  // PANTALLA 2: SELECCIÓN DE FECHA
  // ==========================================
  if (inputFecha) {
    inputFecha.addEventListener("change", (e) => {
      fechaSeleccionada = e.target.value;

      if (btnContinuarFecha) {
        btnContinuarFecha.disabled = !fechaSeleccionada;
      }
    });
  }

  if (btnContinuarFecha) {
    btnContinuarFecha.addEventListener("click", () => {
      showScreen(screens.horario);
    });
  }

  // ==========================================
  // PANTALLA 3: SELECCIÓN DE HORARIO
  // ==========================================
  timeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      timeBtns.forEach((b) => {
        b.classList.remove("selected");
      });

      btn.classList.add("selected");
      horaSeleccionada = btn.getAttribute("data-time");

      if (btnContinuarHorario) {
        btnContinuarHorario.disabled = false;
      }
    });
  });

  if (btnContinuarHorario) {
    btnContinuarHorario.addEventListener("click", () => {
      showScreen(screens.actividad);
    });
  }

  if (btnVolverFecha) {
    btnVolverFecha.addEventListener("click", () => {
      showScreen(screens.fecha);
    });
  }

  // ==========================================
  // PANTALLA 4: SELECCIÓN DE ACTIVIDAD
  // ==========================================
  activityBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activityBtns.forEach((b) => {
        b.classList.remove("selected");
      });

      btn.classList.add("selected");
      actividadSeleccionada = btn.getAttribute("data-activity");

      if (btnConfirmarActividad) {
        btnConfirmarActividad.disabled = false;
      }
    });
  });

  if (btnVolverHorario) {
    btnVolverHorario.addEventListener("click", () => {
      showScreen(screens.horario);
    });
  }

  // ==========================================
  // CONFIRMAR ACTIVIDAD Y GUARDAR CITA
  // ==========================================
  if (btnConfirmarActividad) {
    btnConfirmarActividad.addEventListener("click", async () => {
      btnConfirmarActividad.disabled = true;
      btnConfirmarActividad.innerText = "Guardando... ⏳";

      const payload = {
        para: "Mi Cita Especial",
        fecha: fechaSeleccionada,
        hora: horaSeleccionada,
        actividad: actividadSeleccionada,
      };

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const confirmacionFecha = document.getElementById("confirmacion-fecha");
          const confirmacionHora = document.getElementById("confirmacion-hora");
          const confirmacionActividad = document.getElementById("confirmacion-actividad");

          if (confirmacionFecha) {
            confirmacionFecha.innerText = fechaSeleccionada;
          }

          if (confirmacionHora) {
            confirmacionHora.innerText = `${horaSeleccionada} hs`;
          }

          if (confirmacionActividad) {
            confirmacionActividad.innerText = actividadSeleccionada;
          }

          showScreen(screens.confirmacion);

          setTimeout(() => {
            if (loveAlert) {
              loveAlert.style.display = "flex";
            }
          }, 800);
        } else {
          throw new Error("Error al responder el servidor");
        }
      } catch (error) {
        console.error("Error al registrar la cita:", error);

        if (saveErrorAlert) {
          saveErrorAlert.style.display = "flex";
        }
      } finally {
        btnConfirmarActividad.disabled = false;
        btnConfirmarActividad.innerText = "Confirmar reunión 💕";
      }
    });
  }

  // ==========================================
  // CERRAR ERROR DE GUARDADO
  // ==========================================
  if (btnCerrarError) {
    btnCerrarError.addEventListener("click", () => {
      if (saveErrorAlert) {
        saveErrorAlert.style.display = "none";
      }
    });
  }

  // ==========================================
  // ABRIR CARTA DE AMOR
  // ==========================================
  if (btnAbrirCarta) {
    btnAbrirCarta.addEventListener("click", () => {
      if (loveAlert) {
        loveAlert.style.display = "none";
      }

      const loveLetter = document.getElementById("love-letter");

      if (loveLetter) {
        loveLetter.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  }

  // ==========================================
  // EASTER EGG: ACCESO ADMIN
  // ==========================================
  if (copyrightTrigger) {
    copyrightTrigger.addEventListener("click", (e) => {
      e.preventDefault();

      if (adminModal) {
        adminModal.style.display = "flex";

        if (adminPassInput) {
          adminPassInput.value = "";
          adminPassInput.focus();
        }
      }
    });
  }

  // ==========================================
  // CANCELAR LOGIN ADMIN
  // ==========================================
  if (btnAdminCancel) {
    btnAdminCancel.addEventListener("click", () => {
      if (adminModal) {
        adminModal.style.display = "none";
      }
    });
  }

  // ==========================================
  // LOGIN ADMIN
  // ==========================================
  if (btnAdminLogin) {
    btnAdminLogin.addEventListener("click", async () => {
      const password = adminPassInput ? adminPassInput.value.trim() : "";

      if (!password) {
        return;
      }

      try {
        const res = await fetch(LOGIN_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          const isSecure = window.location.protocol === "https:" ? "; Secure" : "";
          document.cookie = `admin_session=${password}; path=/; max-age=86400; SameSite=Lax${isSecure}`;

          window.location.href = "/admin";
        } else {
          alert("Clave incorrecta 😾");
        }
      } catch (err) {
        console.error("Error autenticando:", err);

        alert("Error de conexión con el servidor");
      }
    });
  }
});