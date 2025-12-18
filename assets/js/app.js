//login page js start here--
function togglePassword() {
  const passwordInput = document.getElementById("password");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}
//login page js end here--

//dashboard page js start here--

const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleSidebar");
const closeBtn = document.getElementById("closeSidebar");
const overlay = document.getElementById("sidebarOverlay");

/* ===============================
   SIDEBAR TOGGLE (DESKTOP + MOBILE)
================================ */
toggleBtn.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    sidebar.classList.add("show");
  } else {
    sidebar.classList.toggle("collapsed");

    // collapse করলে সব open submenu বন্ধ
    if (sidebar.classList.contains("collapsed")) {
      document
        .querySelectorAll(".has-sub.open")
        .forEach((item) => item.classList.remove("open"));
    }
  }
});

/* ===============================
   CLOSE SIDEBAR (MOBILE)
================================ */
function closeSidebar() {
  sidebar.classList.remove("show");
}

if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
if (overlay) overlay.addEventListener("click", closeSidebar);

/* ===============================
   ACCORDION MENU (ALL LEVELS)
   - one open per level
   - nested submenu supported
================================ */
document.querySelectorAll(".has-sub > a").forEach((menuLink) => {
  menuLink.addEventListener("click", (e) => {
    e.preventDefault();

    // collapsed sidebar হলে click accordion কাজ করবে না
    if (sidebar.classList.contains("collapsed")) return;

    const currentLi = menuLink.parentElement;
    const parentUl = currentLi.parentElement;

    // একই level-এর অন্য submenu close
    parentUl.querySelectorAll(":scope > .has-sub.open").forEach((item) => {
      if (item !== currentLi) {
        item.classList.remove("open");
      }
    });

    currentLi.classList.toggle("open");
  });
});

/* ===============================
   RESPONSIVE RESET ON RESIZE
================================ */
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    sidebar.classList.remove("show");
  }
});


//dashboard page js end here--

//profile modal js start here--
const profileToggle = document.getElementById("profileToggle");
const profileDropdown = document.getElementById("profileDropdown");

/* Toggle on avatar click */
profileToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  profileDropdown.classList.toggle("show");
});

/* Click outside → hide */
document.addEventListener("click", () => {
  profileDropdown.classList.remove("show");
});

/* Prevent inside click from closing */
profileDropdown.addEventListener("click", (e) => {
  e.stopPropagation();
});

/* Scroll → hide */
window.addEventListener("scroll", () => {
  profileDropdown.classList.remove("show");
});

//profile modal js end here--


// FullCalendar Initialization

 document.addEventListener("DOMContentLoaded", function () {
   const calendarEl = document.getElementById("calendar");

   const calendar = new FullCalendar.Calendar(calendarEl, {
     initialView: "dayGridMonth",
     headerToolbar: {
       left: "prev,next today",
       center: "title",
       right: "dayGridMonth,timeGridWeek,timeGridDay",
     },

     events: [
       {
         title: "Exam",
         start: "2025-12-17",
         color: "#ef4444",
       },
       {
         title: "Holiday",
         start: "2025-12-25",
         color: "#16a34a",
       },
     ],
   });

   calendar.render();
 });


