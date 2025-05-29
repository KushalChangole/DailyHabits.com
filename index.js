let left_arror = document.getElementById('left-arrow') ;
let right_arror = document.getElementById('right-arrow') ;
const month_change = document.getElementById("month-change");



const months=["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"];
let currentMonthIndex = new Date().getMonth();
let currentyear = new Date().getFullYear();

function updateMonthDisplay(){
    const monthDisplay = document.getElementById("month-display");
    monthDisplay.textContent = months[currentMonthIndex] + " " + currentyear;
}

function getDaysInMonth(year,month){
    return new Date(currentyear,currentMonthIndex+1,0).getDate();
}
updateMonthDisplay();

function getDayName(currentyear, currentMonthIndex,date){
    const dayNames =["S","M","T","W","T","F","S"];
    const day = new Date(Date.UTC(currentyear,currentMonthIndex,date)).getUTCDay();
    return dayNames[day];
}
console.log(getDayName(currentyear, currentMonthIndex,1));

function creatTable(){
    const table = document.createElement("table");
     const chart = document.getElementById("chart");
    chart.innerHTML= "";//clear previous content
    const tr1 = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent="Habits";
    th.setAttribute("rowspan","2");
    // const chart = document.getElementById("chart");
    chart.appendChild(table);
    table.appendChild(tr1);
    tr1.appendChild(th);
     const tr2 = document.createElement("tr");
    table.appendChild(tr2);
    for(let i =1;i<=getDaysInMonth(currentyear,currentMonthIndex);i++){
        const td = document.createElement("td");
        td.textContent =getDayName(currentyear, currentMonthIndex,i);
        tr1.appendChild(td);
        const td2 = document.createElement("td");
        tr2.appendChild(td2);
        td2.textContent = i;
          // Highlight current day
                const today = new Date();
                 if (
                 currentyear === today.getFullYear() &&
                 currentMonthIndex === today.getMonth() &&
                 i === today.getDate())
                {
                    td.classList.add("current-day");
                    td2.classList.add("current-day");
                }
    }
    const totalgoals = document.createElement("th");
    totalgoals.textContent = "Goals";
    totalgoals.setAttribute("rowspan","2");
    tr1.appendChild(totalgoals);
    const achieved = document.createElement("th");
    achieved.textContent = "Achieved";
    achieved.setAttribute("rowspan","2");
    tr1.appendChild(achieved);

    //render saved habits and tasks 

}
//render saved habits and tasks
function renderHabits(){
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    const table = document.querySelector("table");
    habits.forEach(habit => {
        if(habit.month === currentMonthIndex && habit.year === currentyear){
            const newRow = document.createElement("tr");
            const habitnameCell = document.createElement("th");
            habitnameCell.classList.add("habit-name");
            habitnameCell.textContent = habit.name;
            //adding a delete icon
            const deleteIcon = document.createElement("img");
            deleteIcon.src = "delete-icon.png"; 
            deleteIcon.classList.add("delete-icon");
            habitnameCell.appendChild(deleteIcon);
            newRow.appendChild(habitnameCell);
            let achievedCount=0;
            for(let i=1;i<=getDaysInMonth(currentyear,currentMonthIndex);i++){
                const newtd = document.createElement("td");
                newtd.classList.add("habit-day");
                newtd.style.maxWidth= "1rem";
                newtd.dataset.day = i; // Store the day index in the cell
                 // Highlight current day
                const today = new Date();
                 if (
                 currentyear === today.getFullYear() &&
                 currentMonthIndex === today.getMonth() &&
                 i === today.getDate())
                {
                    newtd.classList.add("current-day");
                }
                    // newtd.style.backgroundColor = "rgb(255, 204, 0)"; // Highlight current day
                
                // Mark achieved days
                if (habit.achievedDays && habit.achievedDays.includes(i)) {
                    newtd.classList.add("achieved");
                    newtd.style.backgroundColor = "rgb(121, 214, 121)";
                    newtd.style.fontSize = ".5rem";
                    newtd.textContent = "✔️";
                    achievedCount++;
                }
                newRow.appendChild(newtd); 
            }
            const totalGoalsCell = document.createElement("td");
            totalGoalsCell.textContent = habit.goal;
            newRow.appendChild(totalGoalsCell);
            const achievedCell = document.createElement("td");
            achievedCell.textContent = achievedCount; // Use the count of achieved days
              // Set background color based on achievedCount and goal
            if (achievedCount >= habit.goal) {
                achievedCell.style.backgroundColor = "rgb(36, 119, 36)";
            } else if (achievedCount < habit.goal / 2 && achievedCount > 0) {
                achievedCell.style.backgroundColor = "rgb(235, 89, 89)";
            } else if (achievedCount >= habit.goal / 2 && achievedCount < habit.goal) {
                achievedCell.style.backgroundColor = "rgb(247, 242, 126)";
            } else {
                achievedCell.style.backgroundColor = "white";
            }
            // achievedCell.textContent = habit.achieved;
            newRow.appendChild(achievedCell);
            table.appendChild(newRow);
        }
    });
}
const notes_list = document.getElementById("notes-list");
//Render Notes
function renderNotes() {
    notes_list.innerHTML = ""; // Clear previous notes
     // Always reset visibility when month changes
    document.getElementById("create-note-intruction").classList.remove("hide");
    // document.getElementById("notes-written").classList.remove("hide");
    let allNotes = JSON.parse(localStorage.getItem("notes")) || [];
    let notesForMonth = allNotes.filter(note => note.month === currentMonthIndex && note.year === currentyear);

    if (notesForMonth.length === 0) {
        document.getElementById("notes-written").classList.add("hide");
        return;
    } else {
        document.getElementById("notes-written").classList.remove("hide");
    }

    notesForMonth.forEach(note => {
        const my_note = document.createElement("div");
        my_note.classList.add("my_note");

        const my_note_header = document.createElement("div");
        my_note_header.classList.add("my_note_header");

        const display_date = document.createElement("h4");
        display_date.textContent = note.date;

        my_note_header.appendChild(display_date);
        const note_text = document.createElement("p");

        const delete_icon_notes = document.createElement("img");
        delete_icon_notes.src = "delete-icon.png";
        delete_icon_notes.classList.add("delete-icon-notes");
        my_note_header.appendChild(delete_icon_notes);
        my_note.appendChild(my_note_header);
        note_text.textContent = note.text;
        my_note.appendChild(note_text);
        notes_list.appendChild(my_note);
    });
}
creatTable();
renderHabits();
renderNotes();
// Event delegation for deleting notes
notes_list.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-icon-notes")) {
        // Find the note text and date to identify the note
        const noteDiv = event.target.closest(".my_note");
        const noteText = noteDiv.querySelector("p").textContent;
        const noteDate = noteDiv.querySelector("h4").textContent;

        let allNotes = JSON.parse(localStorage.getItem("notes")) || [];
        // Remove the note with matching text, date, month, and year
        allNotes = allNotes.filter(note =>
            !(note.text === noteText &&
              note.date === noteDate &&
              note.month === currentMonthIndex &&
              note.year === currentyear)
        );
        localStorage.setItem("notes", JSON.stringify(allNotes));
        renderNotes();
    }
});

month_change.addEventListener("click",(event)=>{
    if(event.target.id==="left-arrow"){
        // console.log("left arrow clicked");
        currentMonthIndex = (currentMonthIndex - 1 + months.length) % months.length;
        // It will Ensure the year is updated if we go backwords

        if (currentMonthIndex === 11) {
             currentyear = currentyear - 1;
        } 
        updateMonthDisplay();
        console.log(getDaysInMonth(currentyear, currentMonthIndex));
        chart.replaceChildren();
        creatTable();
        renderHabits();
        renderNotes();
       
    }
    if(event.target.id==="right-arrow"){
        // console.log("right arrow clicked");
        currentMonthIndex = (currentMonthIndex + 1) % months.length;
        //It will ensure the year is updated if we go forwards
        if (currentMonthIndex === 0) {
             currentyear = currentyear + 1;
            }
        updateMonthDisplay();
        console.log(getDaysInMonth(currentyear, currentMonthIndex));
        chart.replaceChildren();
        creatTable();
        renderHabits();
        renderNotes();
    }
})



//Add Task
const addTaskBtn = document.getElementById("add-task");
addTaskBtn.addEventListener("click", () => {
    const habitInputBox = document.getElementById("create-habbit");
    habitInputBox.classList.toggle("hide");
});
document.getElementById("close-btn").addEventListener("click",()=>{
    const habitInputBox = document.getElementById("create-habbit");
    habitInputBox.classList.add("hide");

})

// Add Task to the table and create a new row
const save_btn = document.getElementById("save-btn");
save_btn.addEventListener("click", (event) => {
    const habitName = document.getElementById("habbit-name").value
    const goalNumber = document.getElementById("goal").value;
    if(habitName ==="" || goalNumber ===""){
        alert("Please fill in all fields");
        return;
    }
   
    //store in local storage
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    habits.push({
        name: habitName,
        goal:parseInt(goalNumber),
        achieved: [],
        month:currentMonthIndex,
        year: currentyear
    });
    localStorage.setItem("habits", JSON.stringify(habits));

     // Refresh the table
    creatTable();
    renderHabits();
    event.preventDefault()
    const habitInputBox = document.getElementById("create-habbit");
    habitInputBox.classList.add("hide");
});
// Add event listener to each cell to toggle the achieved state
document.getElementById("chart").addEventListener("click", (event) => {
    if (event.target.classList.contains("habit-day")) {
        const cell = event.target;
        const row = cell.parentElement;
        const achievedCell = row.querySelector("td:last-child");
        const totalGoalsCell = row.querySelector("td:nth-last-child(2)");
        const totalGoalsNumber = parseInt(totalGoalsCell.textContent);
        const habitName =row.querySelector(".habit-name").textContent;//<-- Get the habit name from the row -->
        const day = parseInt(cell.dataset.day);// Get the day index from the cell
        //get habits from local storage
        let habits = JSON.parse(localStorage.getItem("habits")) || [];
        let habit = habits.find(h=> h.name === habitName && h.month === currentMonthIndex && h.year === currentyear );
        
        if(!habit.achievedDays) habit.achievedDays =[];

        if (cell.classList.contains("achieved")) {
            cell.classList.remove("achieved");
            cell.style.backgroundColor ="white";
            cell.textContent = "";
            // Remove the day from achievedDays array
            habit.achievedDays = habit.achievedDays.filter(d => d !== day);

            achievedCell.textContent = parseInt(achievedCell.textContent) - 1;
        } else {
            cell.classList.add("achieved");
            cell.style.backgroundColor = "rgb(121, 214, 121)";
            cell.style.fontSize = ".5rem"
            cell.textContent="✔️"
            cell.style.transition="background-color 0.3s ease"
            // Add the day to achievedDays array
            habit.achievedDays.push(day);
            achievedCell.textContent = parseInt(achievedCell.textContent) + 1;
        }
        //save the updated habits to local storage
        localStorage.setItem("habits", JSON.stringify(habits));
        // Check if the achieved count matches the goal
        if (parseInt(achievedCell.textContent)>=totalGoalsNumber) {
           achievedCell.style.backgroundColor = "rgb(36, 119, 36)";
        }
        else if(parseInt(achievedCell.textContent)<totalGoalsNumber/2 && parseInt(achievedCell.textContent)>0){
            achievedCell.style.backgroundColor = "rgb(235, 89, 89)";
        }
        else if(parseInt(achievedCell.textContent)>= totalGoalsNumber/2 && parseInt(achievedCell.textContent)<totalGoalsNumber){
            achievedCell.style.backgroundColor = "rgb(247, 242, 126)";
        }
        else{
            achievedCell.style.backgroundColor="white"
        }
    }
    else if(event.target.classList.contains("delete-icon")) {
        // Handle click on habit name to delete the entire row
        const habitName = event.target.parentElement.childNodes[0].nodeValue.trim();
        let habits = JSON.parse(localStorage.getItem("habits")) || [];
        habits = habits.filter(h => !(h.name === habitName && h.month === currentMonthIndex && h.year === currentyear));
        localStorage.setItem("habits", JSON.stringify(habits));
        
        // Refresh the table
        // chart.replaceChildren();
        creatTable();
        renderHabits();
    }
});

//notes portion
const add_notes_btn = document.getElementById("add-note-btn");
const create_note_box = document.getElementById("create-note");
add_notes_btn.addEventListener("click", () => {
    create_note_box.classList.toggle("hide");
});
const save_notes_btn = document.getElementById("save-note-btn");
save_notes_btn.addEventListener("click",()=>{
    const notes = document.getElementById("new-note").value
    console.log(notes);
    if(notes ===""){
        alert("Please write something in the note");
        return;
    }
     // Get existing notes or empty array
    let allNotes = JSON.parse(localStorage.getItem("notes")) || [];
    // Add new note with month and year
    allNotes.push({
        text: notes,
        date: new Date().toDateString(),
        month: currentMonthIndex,
        year: currentyear
    });
    localStorage.setItem("notes", JSON.stringify(allNotes));

    renderNotes(); // Refresh notes display
   
    
    document.getElementById("create-note-intruction").classList.add("hide");
    document.getElementById("notes-written").classList.add("hide");
    create_note_box.classList.add("hide");
})







document.getElementById("close-btn-create-note").addEventListener("click",()=>{
    create_note_box.classList.add("hide");
})


//Notes delete icon functionality
document.getElementsByClassName("delete-icon-notes").addEventListener("click",()=>{
    
})
 

