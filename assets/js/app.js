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
const collapsedSubmenuContainer = document.getElementById(
  "collapsedSubmenuContainer"
);
const sidebarStatus = document.getElementById("sidebarStatus");

let hoverTimeout;
let currentHoveredItem = null;

/* ===============================
           SIDEBAR TOGGLE (DESKTOP + MOBILE)
        ================================ */
toggleBtn.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    // Mobile: show sidebar
    sidebar.classList.add("show");
    overlay.classList.add("show");
  } else {
    // Desktop: toggle collapsed state
    sidebar.classList.toggle("collapsed");
    updateSidebarStatus();

    // Collapse করলে সব open submenu বন্ধ
    if (sidebar.classList.contains("collapsed")) {
      document.querySelectorAll(".has-sub.open").forEach((item) => {
        item.classList.remove("open");
      });
      // Hide any visible collapsed submenu
      collapsedSubmenuContainer.classList.remove("show");
    }
  }
});

/* ===============================
           CLOSE SIDEBAR (MOBILE)
        ================================ */
function closeSidebar() {
  sidebar.classList.remove("show");
  overlay.classList.remove("show");
}

if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
if (overlay) overlay.addEventListener("click", closeSidebar);

/* ===============================
           ACCORDION MENU (EXPANDED SIDEBAR)
           - Only works when sidebar is expanded
           - One open submenu per level
        ================================ */
document.querySelectorAll(".has-sub > a").forEach((menuLink) => {
  menuLink.addEventListener("click", (e) => {
    // Collapsed sidebar হলে click accordion কাজ করবে না
    if (sidebar.classList.contains("collapsed")) return;

    // Mobile হলে close করবে না, sidebar close হবে
    if (window.innerWidth <= 768) return;

    e.preventDefault();
    e.stopPropagation();

    const currentLi = menuLink.parentElement;
    const parentUl = currentLi.parentElement;

    // Check if we're at top level or nested
    const isTopLevel = parentUl.classList.contains("menu");

    if (isTopLevel) {
      // Top level: একই level-এর অন্য submenu close
      parentUl.querySelectorAll(":scope > .has-sub.open").forEach((item) => {
        if (item !== currentLi) {
          item.classList.remove("open");
        }
      });
    } else {
      // Nested level: একই parent এর ভিতরে অন্য submenu close
      const parentLi = parentUl.parentElement;
      parentLi
        .querySelectorAll(":scope > .submenu > .has-sub.open")
        .forEach((item) => {
          if (item !== currentLi) {
            item.classList.remove("open");
          }
        });
    }

    currentLi.classList.toggle("open");
  });
});

/* ===============================
           COLLAPSED SIDEBAR HOVER BEHAVIOR
           - Hover over menu items to show submenu
           - Support for nested submenus
        ================================ */
document.querySelectorAll(".menu > .has-sub").forEach((menuItem) => {
  menuItem.addEventListener("mouseenter", function () {
    if (sidebar.classList.contains("collapsed")) {
      clearTimeout(hoverTimeout);
      currentHoveredItem = this;

      const menuText = this.querySelector("span").textContent;
      const submenu = this.querySelector(".submenu");

      if (submenu) {
        buildCollapsedSubmenu(menuText, submenu, this.offsetTop);
        collapsedSubmenuContainer.classList.add("show");
      }
    }
  });

  menuItem.addEventListener("mouseleave", function () {
    if (sidebar.classList.contains("collapsed")) {
      hoverTimeout = setTimeout(() => {
        if (currentHoveredItem === this) {
          collapsedSubmenuContainer.classList.remove("show");
        }
      }, 200);
    }
  });
});

// Keep collapsed submenu visible when hovering over it
collapsedSubmenuContainer.addEventListener("mouseenter", function () {
  clearTimeout(hoverTimeout);
});

collapsedSubmenuContainer.addEventListener("mouseleave", function () {
  this.classList.remove("show");
});

/* ===============================
           BUILD COLLAPSED SUBMENU
           - Creates submenu HTML for collapsed sidebar
           - Supports nested submenus
        ================================ */
function buildCollapsedSubmenu(title, submenuElement, topPosition) {
  let html = `<div class="collapsed-submenu-header">${title}</div>`;
  html += '<ul class="collapsed-submenu">';

  // Process each item in the submenu
  submenuElement.querySelectorAll(":scope > li").forEach((item) => {
    const link = item.querySelector("a");
    const linkText =
      link.querySelector("span")?.textContent || link.textContent;
    const isHasSub = item.classList.contains("has-sub");

    if (isHasSub) {
      html += `
                        <li class="has-sub" data-hassub="true">
                            <a href="#" class="collapsed-submenu-toggle">
                                ${linkText}
                            </a>
                            ${buildNestedCollapsedSubmenu(
                              item.querySelector(".submenu")
                            )}
                        </li>
                    `;
    } else {
      html += `
                        <li>
                            <a href="#">${linkText}</a>
                        </li>
                    `;
    }
  });

  html += "</ul>";
  collapsedSubmenuContainer.innerHTML = html;
  collapsedSubmenuContainer.style.top = topPosition + "px";

  // Add click events for nested submenus in collapsed mode
  collapsedSubmenuContainer
    .querySelectorAll(".collapsed-submenu-toggle")
    .forEach((toggle) => {
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const parentLi = this.parentElement;
        parentLi.classList.toggle("open");
      });
    });

  // Add click events for regular links
  collapsedSubmenuContainer
    .querySelectorAll(".collapsed-submenu a:not(.collapsed-submenu-toggle)")
    .forEach((link) => {
      link.addEventListener("click", function () {
        // In a real app, you would navigate here
        console.log("Navigating to:", this.textContent);
        collapsedSubmenuContainer.classList.remove("show");

        // Update active state in sidebar
        document.querySelectorAll(".menu li.active").forEach((item) => {
          item.classList.remove("active");
        });

        // Find and activate corresponding item in sidebar
        const sidebarItems = document.querySelectorAll(".menu li a span");
        for (let item of sidebarItems) {
          if (item.textContent.trim() === this.textContent.trim()) {
            item.parentElement.parentElement.classList.add("active");
            break;
          }
        }
      });
    });
}

function buildNestedCollapsedSubmenu(nestedSubmenu) {
  if (!nestedSubmenu) return "";

  let html = '<ul class="submenu">';
  nestedSubmenu.querySelectorAll(":scope > li").forEach((item) => {
    const link = item.querySelector("a");
    const linkText =
      link.querySelector("span")?.textContent || link.textContent;
    html += `<li><a href="#">${linkText}</a></li>`;
  });
  html += "</ul>";

  return html;
}

/* ===============================
           UPDATE SIDEBAR STATUS DISPLAY
        ================================ */
function updateSidebarStatus() {
  if (sidebar.classList.contains("collapsed")) {
    sidebarStatus.textContent = "Collapsed";
    sidebarStatus.className = "badge-status bg-secondary";
  } else {
    sidebarStatus.textContent = "Expanded";
    sidebarStatus.className = "badge-status bg-primary";
  }
}

/* ===============================
           ACTIVE MENU ITEM CLICK
        ================================ */
document.querySelectorAll(".menu li a").forEach((link) => {
  link.addEventListener("click", function (e) {
    // Only for non-submenu toggle links
    if (
      !this.parentElement.classList.contains("has-sub") ||
      (sidebar.classList.contains("collapsed") && window.innerWidth > 768)
    ) {
      // Remove active class from all
      document.querySelectorAll(".menu li.active").forEach((item) => {
        item.classList.remove("active");
      });

      // Add to clicked item
      this.parentElement.classList.add("active");

      // Close mobile sidebar if open
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
    }
  });
});

/* ===============================
           RESPONSIVE BEHAVIOR
        ================================ */
function handleResponsive() {
  if (window.innerWidth <= 768) {
    // On mobile, ensure sidebar is not collapsed
    sidebar.classList.remove("collapsed");
    updateSidebarStatus();
  }
}

// Initial call
handleResponsive();
window.addEventListener("resize", handleResponsive);

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


// student form js start here--

  const enrollment = document.getElementById("enrollmentForm");
  const toggleIcon = document.getElementById("toggleIcon");

  enrollment.addEventListener("shown.bs.collapse", () => {
    toggleIcon.textContent = "−";
  });

  enrollment.addEventListener("hidden.bs.collapse", () => {
    toggleIcon.textContent = "+";
  });

  const section = document.getElementById("basicInfo");
  const icon = document.getElementById("toggleIcon");

  section.addEventListener("shown.bs.collapse", () => (icon.textContent = "−"));
  section.addEventListener(
    "hidden.bs.collapse",
    () => (icon.textContent = "+")
);
  
const adminInfo = document.getElementById("adminInfo");
const adminIcon = document.getElementById("adminIcon");

adminInfo.addEventListener(
  "shown.bs.collapse",
  () => (adminIcon.textContent = "−")
);
adminInfo.addEventListener(
  "hidden.bs.collapse",
  () => (adminIcon.textContent = "+")
);

 const fatherInfo = document.getElementById("fatherInfo");
 const fatherIcon = document.getElementById("fatherIcon");

 fatherInfo.addEventListener(
   "shown.bs.collapse",
   () => (fatherIcon.textContent = "−")
 );
 fatherInfo.addEventListener(
   "hidden.bs.collapse",
   () => (fatherIcon.textContent = "+")
 );
