//used to handle request for medicalrequest in patient dashboard

document.addEventListener("DOMContentLoaded", function() {

    emailjs.init("NtRm0HmN-VM7U7DAk"); //pub,ic key from emailJS

    const reportBtn = document.getElementById("med-btn");  //fethes the medical report summary
    const toast =document.getElementById("reportToast");

    reportBtn.addEventListener("click", function() {

        const userName ="Patient";  
        const userEmail ="patient@gmail.com";  //hard coded for now, will be changed, use a real email
        const requestDate = new Date().toLocaleString();

        // Show toast    
        toast.classList.add("show");  //displays the pop upto confirm the request
        setTimeout(() => {
            toast.classList.remove("show");  //disappears after 3 secs
        }, 3000);

        // Disabling button to prevent multiple clicks
        reportBtn.disabled = true;

        // Sending email to patient
        emailjs.send("service_n6gcrta", "template_dnsw7i7", {
            user_name: userName,
            user_email: userEmail
        })

        .then(() =>{
            // Send email to admin AFTER patient email succeeds
            return emailjs.send("service_n6gcrta", "template_d1sm629", {
                user_name: userName,
                user_email: userEmail,
                request_date: requestDate
            });
        })

        //only for deebuging
        .then(()=>{
            console.log("Both emails sent successfully");
            reportBtn.disabled = false;
        })

        .catch((error) =>{
            console.log("Email sending failed:", error);
            reportBtn.disabled = false;
        });

    });
    //for handling the hosptical chart data
    const hours = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];
    const visitsPerHour = [3, 5, 6, 6, 4, 8, 9, 7, 4, 1]; //just random data

    //hourly data display
    const data = {
        labels: hours,
        datasets: [{
            label: "Visits per Hour",
            data: visitsPerHour,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            fill: true,
            tension: 0.3,  //controlling curve for data
            pointRadius: 2, //controling the dots on grph
            pointBackgroundColor: "rgba(54, 162, 235, 1)"
        }]
    };
    //creating the graph
    const config ={
        type:'line',
        data:data,
        options:{
            responsive: true,
            scales:{
                x: {title: {display: true, text: 'Hour of Day', font: {size: 14}}},
                y: {beginAtZero: true, title: {display: true, text: 'Number of Visits', font:{size: 14 }}, stepSize: 1}
            }
        }
    };

    const ctx = document.getElementById('visitChart').getContext('2d'); //2d graph drw
    new Chart(ctx, config);

});

document.addEventListener("DOMContentLoaded", function() {

});
