let currentPage = 1;
const limit = 10;
let filteredData = [];

function fetchEmployees() {
  async function fetchData() {
    const url =
      "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10&filterBy=department&filterValue=hr";

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return null;
    }
  }
}

async function fetchData() {
  const url =
    "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10&filterBy=department&filterValue=hr";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
}

async function getDataAndAppend() {
  try {
    const data = await fetchData();
    if (data) {
      console.log(data);
      appendDataToTable(data);
    } else {
      console.log("No data retrieved.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function appendDataToTable(data) {
  const tableBody = document.getElementById("employeeBody");

  tableBody.innerHTML = "";

  data.forEach((employee) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.department}</td>
      <td>${employee.gender}</td>
      <td>${employee.salary}</td>
    `;
    tableBody.appendChild(row);
  });
}

getDataAndAppend();

function filterData() {
  const department = document.getElementById("department").value;
  const gender = document.getElementById("gender").value;
  filteredData = [];

  if (department) {
    filteredData = filteredData.filter(
      (employee) => employee.department === department
    );
  }

  if (gender) {
    filteredData = filteredData.filter(
      (employee) => employee.gender === gender
    );
  }

  const sortBy = document.getElementById("sort").value;
  if (sortBy) {
    filteredData.sort((a, b) => {
      if (sortBy === "asc") {
        return a.salary - b.salary;
      } else {
        return b.salary - a.salary;
      }
    });
  }

  renderEmployees();
}

function renderEmployees() {
  const tableBody = document.getElementById("employeeBody");
  tableBody.innerHTML = "";
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchEmployees();
    updatePaginationButtons();
  }
}

function nextPage() {
  currentPage++;
  fetchEmployees();
  updatePaginationButtons();
}

function updatePaginationButtons() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (currentPage === 1) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }
}

document.getElementById("department").addEventListener("change", filterData);
document.getElementById("gender").addEventListener("change", filterData);
document.getElementById("sort").addEventListener("change", filterData);

fetchEmployees();
