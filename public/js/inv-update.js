const form = document.querySelector("#addInventoryForm")
form.addEventListener("change", function () {
   const updateBtn = document.querySelector("#updateBtn")
   updateBtn.removeAttribute("disabled")
})