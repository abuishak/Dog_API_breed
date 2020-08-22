'use strict';

let dogBreed = $('input').val().toLowerCase()

function getDogImage(dogBreed) {
   
    console.log(`getDogImage ran`)
    fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`)
        .then(response => response.json())
        .then(responseJson => 
            displayADog(responseJson))
        .catch(error => {
            console.log("There is an error.")
        }) 
}
function displayADog(responseJson) {
      
    console.log('response', responseJson);
    if (responseJson.status === "error") {
        console.log('displayADog(responseJson) if statement ran')

        if (responseJson.message === "Breed not found (master breed does not exist)") {
        
            console.log('Problem with master breed entry')
            $('.results').append(`<h2>Sorry, that didn't work.</h2>
            <h2>For two-word searches, try this format: Retriever/Golden</h2>`)
        }

        else if (responseJson.message === "Breed not found (sub breed does not exist)") {
        
            console.log('Problem with sub-breed entry')
            $('.results').append(`<h2>Sorry, we don't have any photos of that sub-breed. Please
            search for a different dog breed.</h2>`)
        }

        else {console.log('Unknown error')
        
            $('.results').append(`<h2>Sorry, that didn't work.</h2>
            <h2>Either we don't have any photos of that breed or there's something else going on.  
            Please try again.</h2>`)
        }
    }

    else {
    
        console.log('Breed was found!')
        $('.results').append(`<h2>Look at this ${dogBreed}!</h2>`)
        $('.results').append(`<img src = ${responseJson.message} class = "results-img" alt = "dog">`)
    }
}



function submitForm() {
    
    $('.bablu-a-dog').on('click', function() {
        console.log('form was submitted')
        event.preventDefault()
        if (!$("input[name='dog-breed']").val()) {
            alert('Please enter a dog breed.')
        }

        else {
            $('.results').empty()
            dogBreed = $('input').val().toLowerCase()
            getDogImage(dogBreed)
        }
              
        
    })
}

$(function() {

  console.log('App loaded! Waiting for submit!');
  submitForm()
});