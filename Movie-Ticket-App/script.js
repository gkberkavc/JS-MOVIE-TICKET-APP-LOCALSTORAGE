const count = document.getElementById("count")
const amount = document.getElementById("amount")
const container = document.querySelector(".container")
const select = document.getElementById("movie")
const seats = document.querySelectorAll(".seat:not(.reserved)")

getFromLocalStorage();
calculateTotal();

container.addEventListener("click",function(e){
    if(e.target.classList.contains("seat") && !e.target.classList.contains("reserved") == true)
    {
        e.target.classList.toggle("selected");
        calculateTotal()

    }
})

select.addEventListener("change",function(e){
    calculateTotal()
})

function calculateTotal()
{
    const selectedSeats = container.querySelectorAll(".seat.selected")

    const selectedSeatsArray = [];
    const seatsArray = [];
    
    //seçilen koltuklarıarray içine attık
    selectedSeats.forEach(function(seat){
        selectedSeatsArray.push(seat)
    })
    
    //bütün koltukları array içine attık
    seats.forEach(function(seat){
        seatsArray.push(seat)
    })
    
    //seçilen elemanın indexini getiricek
    let selecedSeatIndexes = selectedSeatsArray.map(function(seat){
        return seatsArray.indexOf(seat)
    })

    console.log(selecedSeatIndexes)
    
    let selectedSeatCount = selectedSeats.length
    count.innerText = selectedSeatCount
    amount.innerText = selectedSeatCount * select.value

    saveToLocalStorage(selecedSeatIndexes)
}

function getFromLocalStorage()
{
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  
  if(selectedSeats != null && selectedSeats.length > 0)
  {
    seats.forEach(function(seat,index){
       if(selectedSeats.indexOf(index) > -1){
        seat.classList.add("selected");
       }
    });
  }


  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if(selectedMovieIndex != null)
  {
    select.selectedIndex = selectedMovieIndex
  }
}

function saveToLocalStorage(indexes)
{
    localStorage.setItem("selectedSeats",JSON.stringify(indexes))
    localStorage.setItem("selectedMovieIndex",select.selectedIndex)
}