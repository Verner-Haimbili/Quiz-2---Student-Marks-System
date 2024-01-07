// Array of students
const students = [{
        //Hard-coded Student objects
        studentNumber: "20128971",
        fullName: "Tonata",
        caMark: "",
        examMark: "",
        finalMark: "",
        grade: "",
    },
    {
        studentNumber: "20120881",
        fullName: "Ton-ton",
        caMark: "",
        examMark: "",
        finalMark: "",
        grade: "",
    },
    {
        studentNumber: "21982717",
        fullName: "Richard",
        caMark: "",
        examMark: "",
        finalMark: "",
        grade: "",
    },
    {
        studentNumber: "201603896",
        fullName: "Verner",
        caMark: "",
        examMark: "",
        finalMark: "",
        grade: "",
    },
    {
        studentNumber: "221035686",
        fullName: "Douglas",
        caMark: "",
        examMark: "",
        finalMark: "",
        grade: "",
    },
];

// Update the table with student data
function updateStudentTable() {
    const tableBody = document.getElementById("studentTableBody");
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
                    <td>${student.studentNumber}</td>
                    <td>${student.fullName}</td>
                    <td><input type="number" id="caMark${index}" value="${
      student.caMark
    }"></td>
                    <td><input type="number" id="examMark${index}" value="${
      student.examMark
    }"></td>
                    <td>${Math.round(student.finalMark)}</td>
                    <td>${student.grade}</td>
                `;
        tableBody.appendChild(newRow);

        const caMarkInput = document.getElementById(`caMark${index}`);
        const examMarkInput = document.getElementById(`examMark${index}`);

        // Addig events
        caMarkInput.addEventListener("blur", () => {
            updateFinalMark(index, "caMark");
        });

        caMarkInput.addEventListener("keydown", (event) => {
            if (event.key === "Tab") {
                event.preventDefault();
                updateFinalMark(index, "caMark");
                examMarkInput.focus();
            }
        });

        examMarkInput.addEventListener("blur", () => {
            updateFinalMark(index, "examMark");
        });

        examMarkInput.addEventListener("keydown", (event) => {
            if (event.key === "Tab") {
                event.preventDefault();
                updateFinalMark(index, "examMark");
                document.getElementById(`caMark${index + 1}`).focus();
            }
        });
    });
}

// Calculate the final mark and grade
function updateFinalMark(index, markType) {
    const caMarkInput = document.getElementById(`caMark${index}`);
    const examMarkInput = document.getElementById(`examMark${index}`);

    let caMark = parseFloat(caMarkInput.value);
    let examMark = parseFloat(examMarkInput.value);

    if (caMark >= 0 && caMark <= 100) {
        if (caMark >= 40 || isNaN(examMark)) {
            students[index].caMark = caMark;
            students[index].examMark = examMark;
            students[index].finalMark = Math.round(caMark * 0.5 + examMark * 0.5);

            if (examMark < 40) {
                students[index].grade = "FAIL";
            } else {
                students[index].grade = getGrade(students[index].finalMark);
            }

            caMarkInput.value = caMark;
            examMarkInput.value = examMark;
        } else {
            alert(
                "Student did not qualify for exam (low CA mark, below 40)."
            );
            caMarkInput.value = "";
            students[index].caMark = "";
            students[index].examMark = "";
            students[index].finalMark = "";
            students[index].grade = "";
        }
    } else {
        alert("CA mark must be between 0 and 100.");
        caMarkInput.value = "";
        students[index].caMark = "";
        students[index].examMark = "";
        students[index].finalMark = "";
        students[index].grade = "";
    }

    localStorage.setItem("studentsData", JSON.stringify(students));

    updateStudentTable();
}

// Get the grade based on the final mark
function getGrade(finalMark) {
    if (finalMark >= 80) return "A";
    else if (finalMark >= 70) return "B";
    else if (finalMark >= 60) return "C";
    else if (finalMark >= 50) return "D";
    else return "FAIL";
}

window.onload = function() {
    const storedData = localStorage.getItem("studentsData");
    if (storedData) {
        const parsedData = JSON.parse(storedData);
        students.forEach((student, index) => {
            student.caMark = parsedData[index].caMark;
            student.examMark = parsedData[index].examMark;
            student.finalMark = parsedData[index].finalMark;
            student.grade = parsedData[index].grade;
        });
    }

    updateStudentTable();
};