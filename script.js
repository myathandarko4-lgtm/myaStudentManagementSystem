let students = [];

let editIndex = null;

function saveData(){
  localStorage.setItem("students", JSON.stringify(students));
}

function renderTable(data = students){
  let table = document.getElementById("table");
  table.innerHTML = "";

  data.forEach((s, index)=>{
    table.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.dob}</td>
        <td>${s.grade}</td>
        <td>${s.subject}</td>
        <td>
          <button class="action-btn edit" onclick="openEdit(${index})">Edit</button>
          <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
  });

  saveData();
}

function addStudent(){
  let name = document.getElementById("name").value;
  let dob = document.getElementById("dob").value;
  let grade = document.getElementById("grade").value;
  let subject = document.getElementById("subject").value;

  if(!name || !dob || !grade || !subject){
    alert("Please fill all fields!");
    return;
  }

  students.push({name, dob, grade, subject});
  clearInputs();
  renderTable();
}

function deleteStudent(index){
  students.splice(index,1);
  renderTable();
}

function openEdit(index){
  editIndex = index;

  document.getElementById("editName").value = students[index].name;
  document.getElementById("editDob").value = students[index].dob;
  document.getElementById("editGrade").value = students[index].grade;
  document.getElementById("editSubject").value = students[index].subject;

  document.getElementById("editBox").style.display = "block";
}

function updateStudent(){
  students[editIndex].name = document.getElementById("editName").value;
  students[editIndex].dob = document.getElementById("editDob").value;
  students[editIndex].grade = document.getElementById("editGrade").value;
  students[editIndex].subject = document.getElementById("editSubject").value;

  closeEdit();
  renderTable();
}

function closeEdit(){
  document.getElementById("editBox").style.display = "none";
}

function clearInputs(){
  document.getElementById("name").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("grade").value = "";
  document.getElementById("subject").value = "";
}

document.getElementById("search").addEventListener("input", function(){
  let value = this.value.toLowerCase();

  let filtered = students.filter(s =>
    s.name.toLowerCase().includes(value) ||
    s.grade.toLowerCase().includes(value) ||
    s.subject.toLowerCase().includes(value)
  );

  renderTable(filtered);
});

renderTable();