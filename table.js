// Table 1: Sort functionality
document.querySelectorAll(".table-header-content i.fa-sort").forEach((icon) => {
  icon.addEventListener("click", function () {
    const th = this.closest("th");
    const columnIndex = Array.from(th.parentNode.children).indexOf(th);
    const table = th.closest("table");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    // Toggle sort direction
    const isAscending = !this.classList.contains("fa-sort-up");
    this.classList.toggle("fa-sort-up", isAscending);
    this.classList.toggle("fa-sort-down", !isAscending);

    // Reset other sort icons
    table
      .querySelectorAll(".fa-sort-up, .fa-sort-down")
      .forEach((otherIcon) => {
        if (otherIcon !== this) {
          otherIcon.classList.remove("fa-sort-up", "fa-sort-down");
          otherIcon.classList.add("fa-sort");
        }
      });

    // Sort rows
    rows.sort((a, b) => {
      const aText = a.children[columnIndex].textContent.trim();
      const bText = b.children[columnIndex].textContent.trim();

      // Try to parse as number
      const aNum = parseFloat(aText.replace(/[^0-9.-]+/g, ""));
      const bNum = parseFloat(bText.replace(/[^0-9.-]+/g, ""));

      if (!isNaN(aNum) && !isNaN(bNum)) {
        return isAscending ? aNum - bNum : bNum - aNum;
      }

      // Otherwise sort as text
      return isAscending
        ? aText.localeCompare(bText)
        : bText.localeCompare(aText);
    });

    // Reorder rows in DOM
    rows.forEach((row) => tbody.appendChild(row));
  });
});

// Table 2: Search functionality
const searchInput = document.querySelector(".search-box input");
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const rows = document.querySelectorAll(".modern-table tbody tr");
    const mobileCards = document.querySelectorAll(".product-card");

    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(searchTerm) ? "" : "none";
    });

    mobileCards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(searchTerm) ? "" : "none";
    });
  });
}

// Table 2: Category filter
const categorySelect = document.querySelector(".table-controls select");
if (categorySelect) {
  categorySelect.addEventListener("change", function () {
    const selectedCategory = this.value;
    const rows = document.querySelectorAll(".modern-table tbody tr");
    const mobileCards = document.querySelectorAll(".product-card");

    if (selectedCategory === "All Categories") {
      rows.forEach((row) => (row.style.display = ""));
      mobileCards.forEach((card) => (card.style.display = ""));
      return;
    }

    rows.forEach((row) => {
      const categoryCell = row.querySelector("td:nth-child(3)");
      if (categoryCell && categoryCell.textContent === selectedCategory) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });

    mobileCards.forEach((card) => {
      const categoryText = card.querySelector(
        ".product-details small"
      ).textContent;
      if (categoryText.includes(selectedCategory)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// Action button handlers
document.querySelectorAll(".btn-action").forEach((button) => {
  button.addEventListener("click", function (e) {
    if (
      this.textContent.includes("Export") ||
      this.textContent.includes("Download")
    ) {
      e.preventDefault();
      alert("Export functionality would be implemented here.");
      return;
    }

    if (
      this.textContent.includes("Add") ||
      this.textContent.includes("Create")
    ) {
      e.preventDefault();
      alert("Add new item functionality would be implemented here.");
      return;
    }
  });
});

// Delete button confirmation
document.querySelectorAll(".btn-icon.delete").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this item?")) {
      const row = this.closest("tr");
      if (row) {
        row.style.opacity = "0.5";
        setTimeout(() => {
          row.remove();
          // In a real application, you would make an API call here
          alert("Item deleted successfully!");
        }, 300);
      }
    }
  });
});

// View details button
document.querySelectorAll(".btn-action.small").forEach((button) => {
  if (button.textContent.includes("View")) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const row = this.closest("tr");
      if (row) {
        const orderId = row.querySelector("td:first-child strong").textContent;
        const customer = row.querySelector(".customer-info strong").textContent;
        const amount = row.querySelector("td:nth-child(4) strong").textContent;
        const status = row.querySelector(".order-status").textContent;

        alert(
          `Order Details:\n\nID: ${orderId}\nCustomer: ${customer}\nAmount: ${amount}\nStatus: ${status}`
        );
      }
    });
  }
});

// Pagination
document.querySelectorAll(".page-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    if (
      !this.closest(".page-item").classList.contains("disabled") &&
      !this.closest(".page-item").classList.contains("active")
    ) {
      e.preventDefault();

      // Update active state
      this.closest(".pagination")
        .querySelectorAll(".page-item")
        .forEach((item) => {
          item.classList.remove("active");
        });
      this.closest(".page-item").classList.add("active");

      // In a real application, you would load new data here
      console.log("Loading page...");
    }
  });
});

// Date filter functionality
const dateFilter = document.querySelector(".date-filter");
if (dateFilter) {
  dateFilter.addEventListener("click", function () {
    alert("Date picker would open here. Showing last 30 days by default.");
  });
}

// Responsive table enhancements
function enhanceTableResponsiveness() {
  // Add responsive class to tables on small screens
  if (window.innerWidth < 768) {
    document.querySelectorAll(".modern-table").forEach((table) => {
      if (!table.classList.contains("table-stacked")) {
        table.classList.add("mobile-responsive");

        // Add data-label attributes for mobile view
        const headers = Array.from(table.querySelectorAll("thead th"));
        table.querySelectorAll("tbody tr").forEach((row) => {
          Array.from(row.children).forEach((cell, index) => {
            if (index < headers.length) {
              cell.setAttribute("data-label", headers[index].textContent);
            }
          });
        });
      }
    });
  }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", function () {
  enhanceTableResponsiveness();

  // Update on resize
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(enhanceTableResponsiveness, 250);
  });
});

// Print functionality
document.addEventListener("keydown", function (e) {
  // Ctrl/Cmd + P for print
  if ((e.ctrlKey || e.metaKey) && e.key === "p") {
    e.preventDefault();
    alert(
      "Print functionality is enabled. The print view will hide interactive elements."
    );
    window.print();
  }
});

// Export to CSV functionality (simplified)
function exportTableToCSV(tableId, filename) {
  const table = document.getElementById(tableId);
  if (!table) return;

  let csv = [];
  const rows = table.querySelectorAll("tr");

  for (let i = 0; i < rows.length; i++) {
    const row = [],
      cols = rows[i].querySelectorAll("td, th");

    for (let j = 0; j < cols.length; j++) {
      // Clean data
      let data = cols[j].innerText
        .replace(/(\r\n|\n|\r)/gm, "")
        .replace(/(\s\s)/gm, " ")
        .replace(/"/g, '""');
      data = `"${data}"`;
      row.push(data);
    }

    csv.push(row.join(","));
  }

  // Download CSV file
  const csvString = csv.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Add export buttons dynamically
document.querySelectorAll(".table-card").forEach((card, index) => {
  const footer = card.querySelector(".table-footer");
  if (footer && !card.querySelector(".export-btn")) {
    const exportBtn = document.createElement("button");
    exportBtn.className = "btn-action outline";
    exportBtn.innerHTML = '<i class="fas fa-file-export"></i> Export CSV';
    exportBtn.style.marginLeft = "auto";
    exportBtn.onclick = () =>
      exportTableToCSV(`table-${index + 1}`, `table-${index + 1}.csv`);
    footer.appendChild(exportBtn);

    // Add ID to table for export
    const table = card.querySelector("table");
    if (table) {
      table.id = `table-${index + 1}`;
    }
  }
});
