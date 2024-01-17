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

  function formatPhoneNumber(phoneNumber) {
  const phoneRegex = /(\d{3})(\d{3})(\d{4})/;
  return phoneNumber.replace(phoneRegex, "($1) $2-$3");
}

function wrapPhoneNumbers() {
  const bodyText = document.body.innerHTML;
  const phoneRegexGlobal = /\b\d{10}\b/g;

  // Replace each phone number with a span that can be clicked
  const formattedText = bodyText.replace(phoneRegexGlobal, function(match) {
    //return `<span class="clickable-phone-number" style="color:blue; cursor:pointer; padding: 2px; border-radius: 2px;">${match}</span>`;
    //return `<span class="clickable-phone-number" style="background=color: #ffff00; text-decoration:underline; cursor:pointer">${match}</span>`;
    //return `<span class="clickable-phone-number" style="background-color: #fffdd0; cursor:pointer; padding: 2px; border-radius: 2px">${match}</span>`;
    return `<span class="clickable-phone-number" style="cursor:pointer; text-decoration:underline; padding: 2px; border-radius: 2px">${match}</span>`;

  });

  document.body.innerHTML = formattedText;

  // Add click listeners to each phone number
  document.querySelectorAll('.clickable-phone-number').forEach(function(element) {
    element.addEventListener('click', function() {
      const shouldFormat = confirm('Format this phone number?');
      if (shouldFormat) {
        element.textContent = formatPhoneNumber(element.textContent);
      }
    });
  });
}

// Run the function to wrap phone numbers
wrapPhoneNumbers();

  