//handles the view appointments page, when user clicks on upcoming, completed and cancelled appointments
document.addEventListener("DOMContentLoaded", function() {

  const upcomingTab = document.getElementById("upcomingTab");
  const completedTab = document.getElementById("completedTab");
  const cancelledTab = document.getElementById("cancelledTab");

  const upcomingContent = document.getElementById("upcomingContent");
  const completedContent = document.getElementById("completedContent");
  const cancelledContent = document.getElementById("cancelledContent");

  function showUpcoming() {
    upcomingContent.style.display = "block";
    completedContent.style.display = "none";
    cancelledContent.style.display = "none";
  }

  function showCompleted() {
    upcomingContent.style.display = "none";
    completedContent.style.display = "block";
    cancelledContent.style.display = "none";
  }

  function showCancelled() {
    upcomingContent.style.display = "none";
    completedContent.style.display = "none";
    cancelledContent.style.display = "block";
  }

  upcomingTab.addEventListener("click", showUpcoming);
  completedTab.addEventListener("click", showCompleted);
  cancelledTab.addEventListener("click", showCancelled);

});
