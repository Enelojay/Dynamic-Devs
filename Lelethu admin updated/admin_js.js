  //FAKE DATA

 const appointmentsData = [
  {
    patient: "Lelethu Conjwayo",
    doctor: "Dr Smith",
    date: "2026-03-04",
    time: "10:00",
    type: "Consulation",
    status: "Pending",
    birth: "0404040269080",
    gender: "Female",
    contact: "0386611259",
    info: "Active"

    

  },
  {
    patient: "Hlompho Noah",
    doctor: "Dr Smith",
    date: "2026-03-04",
    time: "10:00",
    type: "Checkup",
    status: "Pending",
    birth: "020202068870",
    gender: "Male",
    contact: "076611259",
    info: "Active"
   
  },
   {
    patient: "Pamella Conjwayo",
    doctor: "Dr Smith",
    date: "2026-03-04",
    time: "10:00",
     type: "Checkup",
    status: "Pending",
    birth: "2004-04-04",
    gender: "Female",
    contact: "0736711259",
    info: "Inactive"
    
   
  },
   {
    patient: "Enelo Chavalala",
    doctor: "Dr Xabanisa",
    date: "2026-03-06",
    time: "15:30",
    type: "Follow-up",
    status: "Pending",
    birth: "0101567890214",
    gender: "Male",
    contact: "078611259",
    info: "Active"
   
  },
    {
    patient: "Mufunwa XXX",
    doctor: "Dr Xabanisa",
    date: "2026-03-06",
    time: "16:30",
     type: "Consulation",
    status: "Pending",
    birth: "030305067893451",
    gender: "Female",
    contact: "0836611259",
    info: "Inactive"
   
  }
  
];

docData=[
   {
    name: "Dr Xabanisa",
    specialty: "Surgery",
    license:" XXXXXXX", 
    contact: "041 656 3839",
    status: "OnCall"
   
  },
  {
    name: "Dr Mkona",
    specialty: "Gynaecologist",
    license:" XXXXXXX", 
    contact: "041 656 4899",
    status: "Active"
   
  },
   {
    name: "Dr Smith",
    specialty: "Paediatrics",
    license:" XXXXXXX", 
    contact: "041 656 5679",
    status: "OnCall"
   
  }

]

document.addEventListener("DOMContentLoaded",function() {

  const canvassss= document.getElementById('Chart');
  const button=document.getElementById("menu");
  if (canvassss){
  createChart();
  }

  if(button){
  toggle();
  }
  ///APPTS PAGE
  const apptbody=document.getElementById("appointments-body");
  if(apptbody){
    putappts(appointmentsData);
    filtering_appt();
    clash(appointmentsData);
    
    document.getElementById("search").addEventListener("input",filtering_appt);
    document.getElementById("forstatus").addEventListener("change",filtering_appt);
    }
///PATS PAGE
  const patbody=document.getElementById("pat-body");
  if (patbody){
    registeredpat(appointmentsData);
    filtering_pat();
    document.getElementById("search1").addEventListener("input",filtering_pat);
    document.getElementById("forstatus1").addEventListener("change",filtering_pat);
  }
  const docbody=document.getElementById("doc-body");
   if (docbody){
    registereddoc(docData);
    filtering_doc();
    document.getElementById("search2").addEventListener("input",filtering_doc);
    document.getElementById("forstatus2").addEventListener("change",filtering_doc);
  }

  let db= document.getElementById("apptcount");
  if(db){
    dashboard();
  }

 
 
});
function dashboard(){
  const date_today= new Date().toISOString().split("T")[0];
  
  let count_today=0;
  let count_pending=0;
  let count_pat=0;
  let count_doc=0;

  //For appointmnets count
  for ( let i =0 ;  i<appointmentsData.length;i++){
    if(appointmentsData[i].date===date_today){
      count_today++;
    }
    if(appointmentsData[i].status==="Pending"){
      count_pending++;
    }
  }

  //For the doctors
  for(let j =0; j<docData.length;j++){
    if(docData[j].status==="OnCall"){
      count_doc++;
    }
  }
  
  //FOR patients
  count_pat=appointmentsData.length;

  //For the cards
  document.getElementById("apptcount").innerText=count_today +" " +"appointments today";
  document.getElementById("pendingcount").innerText=count_pending +" "+ "pending appointments";
  document.getElementById("doccount").innerText=count_doc +" " +"doctors on call";
  document.getElementById("patcount").innerText=count_pat +" " +"total registered patients";



}
function toggle(){
     const button=document.getElementById("menu");

     button.addEventListener("click",function() {
            document.body.classList.toggle("sidebar-hidden");
     });
}


function createChart(){
  const ctx=document.getElementById('Chart');
  const mychart = new Chart (ctx,{
        type:'bar',
        data:{
          labels:['Mon','Tue','Wed','Thu','Fri','Sat'],
          datasets:[{
              data:[15,20,3,21,13,16],
              backgroundColor:['lightgreen','lightblue','lightgreen','lightblue','lightgreen','lightblue'],      
          }]
        },
        options:{
          responsive: true,
          plugins:{
            legend:{display:false},
          
          title:{
            display:true,
            text:"Appointments per day"
          }
        },
      
        scales:{
          x:{
            title:{
            display:true,
            text:"Days of the week",
            color: "black"
          }
        },
          y:{
            title:{
            display:true,
            text:"Number of appointments",
            color:"black"
          }
        }
        }
      }

  });
  }
///////////APPOINTMENTS////////

//this function populates the table
// id id it this way because i wanna mimick the json format that pho will fecth so that when we have to aococunt for it , i dont do much work
//hence why my data i s in this format
function putappts(data){
const apptbody=document.getElementById("appointments-body");
apptbody.innerHTML="";

for ( let i=0; i<data.length;i++){

const appt= data[i];//get apppt
const row=document.createElement("tr");//create the row

row.innerHTML= `
<td>${appt.patient}</td>
<td>${appt.doctor}</td>
<td>${appt.date}</td>
<td>${appt.time}</td>
<td>${appt.type}</td>
  <td>${appt.status}</td>
<td>
  <button>Approve</button>
  <button>Decline</button>
</td>
`;

apptbody.appendChild(row);

const appbt=row.getElementsByTagName("button")[0];
const declbt=row.getElementsByTagName("button")[1];
const stat = row.getElementsByTagName("td")[5];

appbt.addEventListener("click",function(){
  if(clash(appt,data)){
    const ans=confirm("This booking clashes with another. Would you still like to aprove?")
    if ( ans===false){
      return;
    }
  }
  appt.status="Approved";
  stat.innerText="Approved"
  }
)};

declbt.addEventListener("click",function(){
  appt.status="Declined";
  stat.innerText="Declined"
});
}
      
// filter appointments
function filtering_appt(){

  const search_input=document.getElementById("search");
  const statusSelect= document.getElementById("forstatus");
  
  //fetch appointment rows so we can iterate
  const apptbody=document.getElementById("appointments-body")
  const rows= apptbody.getElementsByTagName("tr");

  //The actual values-admin
  const actual_search= search_input.value.toLowerCase();
  const actual_status= statusSelect.value;

  
  // this loop goes thru rows andchecks for matches
  for ( let i =0; i<rows.length;i++){
    const igama= rows[i].getElementsByTagName("td")[0].innerText.toLowerCase();
    const status=  rows[i].getElementsByTagName("td")[5].innerText;
    
    //See if the search and or status matches
    const match_igama= igama.includes(actual_search);
    const match_status=actual_status==="All"|| (actual_status===status);
  
  if (actual_status===status){
    rows[i].style.display="";
  }
    if( match_igama && match_status){
        rows[i].style.display="";
    }
    else{
    rows[i].style.display="none";
    }
  } 
}


  //CLASH
  //detcets whether we hvae  aclass of appointments
function clash(newappt,data){
  for (let i=0; i<data.length;i++){
    const curr = data[i];

    if (curr !==newappt)

    if (
      
      curr.doctor==newappt.doctor &&
      curr.date==newappt.date &&
      curr.time==newappt.time &&
      curr.status==='Approved'
    ){
    return true;
  }
  }return false;
}

//////APPOINTMENTS END
    

 

//////PATIENTS START//////
          
function registeredpat(data){
  const patbody=document.getElementById("pat-body");
  patbody.innerHTML="";

  for ( let i=0; i<data.length;i++){
    
    const pat= data[i];//get apppt
    const row=document.createElement("tr");//create the row

    row.innerHTML= `
        <td>${pat.patient}</td>
        <td>${pat.birth}</td>
        <td>${pat.gender}</td>
        <td>${pat.contact}</td>
        <td>${pat.info}</td>
        `;
      
        patbody.appendChild(row);
        
      }
    }
        

  //FUNCTION FILTERING FOR PATIENTS
 function filtering_pat(){

    const search_input=document.getElementById("search1");
    const statusSelect=document.getElementById("forstatus1");;
    const patbody=document.getElementById("pat-body")
    const rows= patbody.getElementsByTagName("tr");

    const actual_search= search_input.value.toLowerCase();
    const actual_status= statusSelect.value;

    for ( let i =0; i<rows.length;i++){
     const igama= rows[i].getElementsByTagName("td")[0].innerText.toLowerCase();
     const status= rows[i].getElementsByTagName("td")[4].innerText;

     const match_igama=igama.includes(actual_search);
    const match_status=actual_status==="All"|| (actual_status===status);
    
    if (actual_status===status){
      rows[i].style.display="";
    }
     if( match_igama && match_status){
         rows[i].style.display="";
     }
     else{
      rows[i].style.display="none";
     }
    
    } 
  }


////DOCTORS//////
function registereddoc(docData){
  const docbody=document.getElementById("doc-body");
  docbody.innerHTML="";

  for ( let i=0; i<docData.length;i++){
    
    const doc= docData[i];//get apppt
    const row=document.createElement("tr");//create the row

    row.innerHTML= `
        <td>${doc.name}</td>
        <td>${doc.specialty}</td>
        <td>${doc.license}</td>
        <td>${doc.contact}</td>
        <td>${doc.status}</td>
        `;
      
        docbody.appendChild(row);
        
      }
}

function filtering_doc(){

    const search_input=document.getElementById("search2");
    const statusSelect=document.getElementById("forstatus2");;
    const docbody=document.getElementById("doc-body")
    const rows= docbody.getElementsByTagName("tr");

    const actual_search= search_input.value.toLowerCase();
    const actual_status= statusSelect.value;

    for ( let i =0; i<rows.length;i++){
     const igama= rows[i].getElementsByTagName("td")[0].innerText.toLowerCase();
     const status= rows[i].getElementsByTagName("td")[4].innerText;

     const match_igama=igama.includes(actual_search);
    const match_status=actual_status==="All"|| (actual_status===status);
    
    if (actual_status===status){
      rows[i].style.display="";
    }
     if( match_igama && match_status){
         rows[i].style.display="";
     }
     else{
      rows[i].style.display="none";
     }
    
    } 
  }

        

  


  

