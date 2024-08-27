// menu items
const menu = ["Barcha talabalar", "Dars jadvali"];
const dotenv = require("dotenv");

// Function to handle click events
function onAllStudents(item) {
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

function onTimeTable(item) {
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

// Get the ordered list element from the HTML document
const olElement = document.createElement("ol");

// Loop through the array and create list items
for (let i = 0; i < menu.length; i++) {
    const liElement = document.createElement("li");
    liElement.textContent = menu[i];

    // Add a click event listener to each list item
    liElement.addEventListener(
        "click",
        (function (index) {
            return function () {
                if (index === 0) onAllStudents(liElement.textContent);
                else onTimeTable(liElement.textContent);
            };
        })(i)
    );

    olElement.appendChild(liElement);
}

// Append the ordered list to the body of the HTML document
document.body.appendChild(olElement);
