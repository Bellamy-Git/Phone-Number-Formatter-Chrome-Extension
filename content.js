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
  
  
  
  function formatPhoneNumber(phoneNumber) {
    //old
    //const phoneRegex = /1?(\d{3})(\d{3})(\d{4})/;
    const phoneRegex = /1?(\d{3})(\d{3})(\d{4})|(\d{3})(\d{4})/;
    return phoneNumber.replace(phoneRegex, function(fullMatch, p1, p2, p3, p4, p5) {
      if (p4 && p5) {
        // This is a 7-digit number
        return `${p4}-${p5}`;
      } else {
        // This is a 10/11-digit number
        const hasCountryCode = fullMatch.length === 11;
        return hasCountryCode ? `+1 (${p1}) ${p2}-${p3}` : `(${p1}) ${p2}-${p3}`;
      }
    });
  }


  //EXPERIMENTALLLLLL/////;


  function processTextNode(node) {
    const phoneRegexGlobal = /\b1?\d{10}\b|\b\d{7}\b/g;
    let matches;
    let lastIndex = 0;
    let resultHTML = '';
  
    while ((matches = phoneRegexGlobal.exec(node.nodeValue)) !== null) {
      let match = matches[0];
      resultHTML += node.nodeValue.slice(lastIndex, matches.index);
      //resultHTML += `<span class="clickable-phone-number" data-original-number="${match}" data-is-formatted="false">${match}</span>`;
      resultHTML += `<span class="clickable-phone-number" style="cursor:pointer; text-decoration:underline; padding: 2px; border-radius: 2px" data-original-number="${match}">${match}</span>`;
      lastIndex = matches.index + match.length;
    }
    resultHTML += node.nodeValue.slice(lastIndex);
  
    if (resultHTML !== node.nodeValue) {
      let span = document.createElement('span');
      span.innerHTML = resultHTML;
      node.parentNode.replaceChild(span, node);
    }
}

  function walkTheDOM(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
      walkTheDOM(node, func);
      node = node.nextSibling;
    }
  }
  
  function formatPhoneNumbersOnPage() {
    walkTheDOM(document.body, function(node) {
      if (node.nodeType === 3) { // Node.TEXT_NODE
        processTextNode(node);
      }
    });
  }

//////////////////////////////////



//old
  //   return phoneNumber.replace(phoneRegex, function(fullMatch, p1, p2, p3) {
  //     // Check if the phone number includes the country code
  //     const hasCountryCode = fullMatch.length === 11;
  //     return hasCountryCode ? `+1 (${p1}) ${p2}-${p3}` : `(${p1}) ${p2}-${p3}`;
  //   });
  // }
  
  function wrapPhoneNumbers() {
    document.querySelectorAll('.clickable-phone-number').forEach(function(element) {
      element.addEventListener('click', function() {
        const originalNumber = element.getAttribute('data-original-number');
        const isFormatted = element.getAttribute('data-is-formatted') === 'true';
  
        if (!isFormatted) {
          const confirmFormat = confirm("Do you want to format this phone number?");
          if (confirmFormat) {
            element.textContent = formatPhoneNumber(originalNumber);
            element.setAttribute('data-is-formatted', 'true');
          }
        } else {
          const confirmUnformat = confirm("Would you like to revert this phone number to its original state?");
          if (confirmUnformat) {
            element.textContent = originalNumber;
            element.setAttribute('data-is-formatted', 'false');
          }
        }
      });
    });
}
  
    //document.body.innerHTML = formattedText;
  
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
  
  
  
  
  
  // Initialize the process to wrap phone numbers



  

  formatPhoneNumbersOnPage();
  wrapPhoneNumbers();