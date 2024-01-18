//TO-DO 1/18
//Update regex to include 7-digit phone numbers


/*function formatPhoneNumber(phoneNumber) {
    // Regex to find phone numbers (simplified for this example)
    const phoneRegex = /(\d{3})(\d{3})(\d{4})/;
  
    return phoneNumber.replace(phoneRegex, "($1) $2-$3");
  }
  
  function formatPhoneNumbersOnPage() {
    const bodyText = document.body.innerHTML;
  
    // Find all phone numbers in the page content
    const formattedText = bodyText.replace(/\b\d{10}\b/g, function(match) {
      return formatPhoneNumber(match);
    });
  
    document.body.innerHTML = formattedText;
  }
  
  // Run the formatting function
  formatPhoneNumbersOnPage(); */




  // Inject CSS
const cssLink = document.createElement('link');
cssLink.href = chrome.runtime.getURL('modal.css');
cssLink.rel = 'stylesheet';
cssLink.type = 'text/css';
document.head.appendChild(cssLink);

// Inject Modal HTML
const modalHTML = `
<div id="phoneNumberModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Do you want to format this phone number?</p>
    <button id="formatButton">Format</button>
  </div>
</div>
`;
document.body.insertAdjacentHTML('beforeend', modalHTML);

//Can have different functions for number string length.
//For example: 10 length, or 11 length string, etc.


//backup old
/*
  function formatPhoneNumber(phoneNumber) {
  const phoneRegex = /(\d{3})(\d{3})(\d{4})/;
  return phoneNumber.replace(phoneRegex, "($1) $2-$3");
} 
*/

function formatPhoneNumber(phoneNumber) {
  const phoneRegex = /1?(\d{3})(\d{3})(\d{4})/;
  return phoneNumber.replace(phoneRegex, function(fullMatch, p1, p2, p3) {
    // Check if the phone number includes the country code
    const hasCountryCode = fullMatch.length === 11;
    return hasCountryCode ? `+1 (${p1}) ${p2}-${p3}` : `(${p1}) ${p2}-${p3}`;
  });
}

function wrapPhoneNumbers() {
  const bodyText = document.body.innerHTML;
  //const phoneRegexGlobal = /\b\d{10}\b/g;
  const phoneRegexGlobal = /\b1?\d{10}\b/g;

  // Replace each phone number with a span that can be clicked
  const formattedText = bodyText.replace(phoneRegexGlobal, function(match) {
    //return `<span class="clickable-phone-number" style="color:blue; cursor:pointer; padding: 2px; border-radius: 2px;">${match}</span>`;
    //return `<span class="clickable-phone-number" style="background=color: #ffff00; text-decoration:underline; cursor:pointer">${match}</span>`;
    //return `<span class="clickable-phone-number" style="background-color: #fffdd0; cursor:pointer; padding: 2px; border-radius: 2px">${match}</span>`;
    return `<span class="clickable-phone-number" style="cursor:pointer; text-decoration:underline; padding: 2px; border-radius: 2px" data-original-number="${match}">${match}</span>`;

  });

  document.body.innerHTML = formattedText;

  // Add click listeners to each phone number
  document.querySelectorAll('.clickable-phone-number').forEach(function(element) {
    element.addEventListener('click', function() {
      //testing////////
      //const showFormatAlert = confirm("Format this phone number?");
      //if (showFormatAlert) {
      
    
      const originalNumber = element.getAttribute('data-original-number');
      if (element.textContent === originalNumber) {
        const showFormatAlert = confirm("Format this phone number?");
        // Format the number
        element.textContent = formatPhoneNumber(originalNumber);
      } else {
        // Revert to the original number
        const showUnformatAlert = confirm("Would you like to revert this phone number to its original state?");
        element.textContent = originalNumber;
      }
    });
  });
}
      //originalllllll
//       const shouldFormat = confirm('Format this phone number?');
//       if (shouldFormat) {
//         element.textContent = formatPhoneNumber(element.textContent);
//       }
//     });
//   });
// }

// Run the function to wrap phone numbers
wrapPhoneNumbers();


/* FUNCTIONALITY WITH MODAL BOX
// Function to format phone numbers
function formatPhoneNumber(phoneNumber) {
  const phoneRegex = /(\d{3})(\d{3})(\d{4})/;
  return phoneNumber.replace(phoneRegex, "($1) $2-$3");
}

// Function to wrap phone numbers with clickable spans
function wrapPhoneNumbers() {
  const bodyText = document.body.innerHTML;
  const phoneRegexGlobal = /\b\d{10}\b/g;

  const formattedText = bodyText.replace(phoneRegexGlobal, function(match) {
    return `<span class="clickable-phone-number" style="cursor:pointer; text-decoration:underline; padding: 2px; border-radius: 2px">${match}</span>`;
  });

  document.body.innerHTML = formattedText;

  // Add click listeners to each phone number
  document.querySelectorAll('.clickable-phone-number').forEach(function(element) {
    element.addEventListener('click', function() {
      // Open the modal when a phone number is clicked
      var modal = document.getElementById("phoneNumberModal");
      var formatButton = document.getElementById("formatButton");
      modal.style.display = "block";

      // Format the phone number on button click
      formatButton.onclick = function() {
        element.textContent = formatPhoneNumber(element.textContent);
        modal.style.display = "none";
      };
    });
  });
}

// Inject CSS for the modal
const cssLink = document.createElement('link');
cssLink.href = chrome.runtime.getURL('modal.css');
cssLink.rel = 'stylesheet';
cssLink.type = 'text/css';
document.head.appendChild(cssLink);

// Inject Modal HTML
const modalHTML = `
<div id="phoneNumberModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Do you want to format this phone number?</p>
    <button id="formatButton">Format</button>
  </div>
</div>
`;
document.body.insertAdjacentHTML('beforeend', modalHTML);

// Close modal when the close button (x) is clicked
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  var modal = document.getElementById("phoneNumberModal");
  modal.style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  var modal = document.getElementById("phoneNumberModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Initialize the process to wrap phone numbers
wrapPhoneNumbers();

*/  