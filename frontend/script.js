const apiBaseUrl = "http://localhost:8080/employees";

// Form Elements
const form = document.getElementById("employeeForm");
const employeeIdInput = document.getElementById("employeeId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const departmentInput = document.getElementById("department");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

// Modal Elements
const confirmModal = document.getElementById("confirmModal");
const confirmDeleteBtn = document.getElementById("confirmDelete");
const cancelDeleteBtn = document.getElementById("cancelDelete");

let currentEmployeeToDelete = null;

// Event Listeners
form.addEventListener("submit", handleEmployeeSubmit);
cancelBtn.addEventListener("click", resetForm);

// Main Submit Handler
async function handleEmployeeSubmit(e) {
    e.preventDefault();
    
    const employeeData = {
        name: nameInput.value,
        email: emailInput.value,
        department: departmentInput.value
    };

    try {
        let response;
        if (employeeIdInput.value) {
            // Update existing employee
            response = await fetch(`${apiBaseUrl}/${employeeIdInput.value}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employeeData)
            });
        } else {
            // Create new employee
            response = await fetch(apiBaseUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employeeData)
            });
        }

        if (response.ok) {
            resetForm();
            loadEmployees();
        } else {
            alert("Failed to save employee");
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to save employee');
    }
}

// Load Employees
async function loadEmployees() {
    try {
        const response = await fetch(apiBaseUrl);
        const employees = await response.json();
        const tableBody = document.getElementById("employeeTableBody");
        tableBody.innerHTML = "";
        
        employees.forEach(emp => {
            const row = `<tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.department}</td>
                <td>
                    <button class="edit-btn" onclick="prepareEdit(${emp.id}, '${emp.name}', '${emp.email}', '${emp.department}')">Edit</button>
                    <button class="delete-btn" onclick="prepareDelete(${emp.id})">Delete</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
        
        // Add download button if not already present
        if (!document.querySelector('.download-btn')) {
            addDownloadButton();
        }
    } catch (error) {
        console.error('Error loading employees:', error);
        alert('Failed to load employees');
    }
}

// Prepare Edit
window.prepareEdit = function(id, name, email, department) {
    employeeIdInput.value = id;
    nameInput.value = name;
    emailInput.value = email;
    departmentInput.value = department;
    
    submitBtn.textContent = "Update Employee";
    cancelBtn.style.display = "block";
}

// Reset Form
function resetForm() {
    form.reset();
    employeeIdInput.value = "";
    submitBtn.textContent = "Add Employee";
    cancelBtn.style.display = "none";
}

// Prepare Delete
window.prepareDelete = function(id) {
    currentEmployeeToDelete = id;
    confirmModal.style.display = "block";
}

// Confirm Delete
confirmDeleteBtn.addEventListener("click", async () => {
    if (currentEmployeeToDelete) {
        try {
            const response = await fetch(`${apiBaseUrl}/${currentEmployeeToDelete}`, {
                method: "DELETE"
            });

            if (response.ok) {
                loadEmployees();
                confirmModal.style.display = "none";
            } else {
                alert("Failed to delete employee");
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to delete employee');
        }
        currentEmployeeToDelete = null;
    }
});

// Cancel Delete
cancelDeleteBtn.addEventListener("click", () => {
    confirmModal.style.display = "none";
    currentEmployeeToDelete = null;
});

// Download Excel Function
async function downloadEmployeesExcel() {
    try {
        const response = await fetch(apiBaseUrl);
        const employees = await response.json();
        
        // Prepare data for Excel
        const worksheetData = employees.map(emp => ({
            ID: emp.id,
            Name: emp.name,
            Email: emp.email,
            Department: emp.department
        }));
        
        // Create workbook and worksheet
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
        
        // Generate Excel file
        XLSX.writeFile(workbook, 'EmployeeList.xlsx', { compression: true });
    } catch (error) {
        console.error('Error downloading employees:', error);
        alert('Failed to download employee list');
    }
}

// Add Download Button
function addDownloadButton() {
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download Excel';
    downloadButton.classList.add('download-btn');
    downloadButton.addEventListener('click', downloadEmployeesExcel);
    
    // Append the button next to the h2
    const h2Element = document.querySelector('h2');
    h2Element.parentNode.insertBefore(downloadButton, h2Element.nextSibling);
}

// Initial load
loadEmployees();