// Load students from local storage on page load
document.addEventListener("DOMContentLoaded", loadStudents);

function addStudent() {
    let name = document.getElementById("name").value.trim();
    let studentId = document.getElementById("studentId").value.trim();
    let email = document.getElementById("email").value.trim();
    let contactNo = document.getElementById("contactNo").value.trim();

    if (!name || !studentId || !email || !contactNo) {
        alert("All fields are required!");
        return;
    }

    if (isNaN(studentId)) {
        alert("Student ID must be a number.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Invalid email format!");
        return;
    }

    if (!validateContactNo(contactNo)) {
        alert("Contact No. must be 10 digits.");
        return;
    }

    let student = { name, studentId, email, contactNo };
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));

    loadStudents();
}

// Email validation function
function validateEmail(email) {
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Contact number validation function
function validateContactNo(contactNo) {
    return /^\d{10}$/.test(contactNo);
}

function loadStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((student, index) => {
        let row = table.insertRow();
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contactNo}</td>
            <td>
                <button class="btn reset" onclick="resetStudent(${index})">Reset</button>
                <button class="btn delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
    });
}

function resetStudent(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("email").value = student.email;
    document.getElementById("contactNo").value = student.contactNo;
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));

    loadStudents();
}
