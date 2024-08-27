export function onAllStudents() {
    let studentsList = document.getElementById("studentsList");

    if (studentsList) studentsList.remove();
    else {
        // Create a new ordered list
        studentsList = document.createElement("ol");
        studentsList.id = "studentsList";

        // Add items to the second list (you can customize this based on the clicked item)
        for (let i = 1; i <= 3; i++) {
            const liElement = document.createElement("li");
            liElement.textContent = "student " + i;
            studentsList.appendChild(liElement);
        }

        // Append the second list to the body
        document.body.appendChild(studentsList);
    }
}

export function onTimeTable() {
    let timeTableList = document.getElementById("timeTableList");

    if (timeTableList) timeTableList.remove();
    else {
        timeTableList = document.createElement("ol");
        timeTableList.id = "timeTableList";

        for (let i = 1; i <= 3; i++) {
            const liElement = document.createElement("li");
            liElement.textContent = "lesson " + i;
            timeTableList.appendChild(liElement);
        }

        document.body.appendChild(timeTableList);
    }
}
