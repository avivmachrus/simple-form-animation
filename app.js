function enterForm(inputId, arrowClass) {
  const formName = document.querySelector(inputId);
  formName.addEventListener("keyup", (e) => {
    // number 13 is enter key on keyboard
    if (e.keyCode === 13) {
      e.preventDefault();
      document.querySelector(arrowClass).click();
    }
  });
}

function animatedForm() {
  const arrows = document.querySelectorAll(".fa-arrow-down");

  arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      // take value from recent input form
      const input = arrow.previousElementSibling;
      // arrow parent Element
      const parent = arrow.parentElement;
      // next element of parent's arrow (div)
      const nextForm = parent.nextElementSibling;

      // check for validation
      if (input.type === "text" && validateUser(input)) {
        nextSlide(parent, nextForm);
        addAutoFocus("#email-enter");
      } else if (input.type === "email" && validateEmail(input)) {
        nextSlide(parent, nextForm);
        addAutoFocus("#password-enter");
      } else if (input.type === "password" && validateUser(input)) {
        nextSlide(parent, nextForm);
      } else {
        parent.style.animation = "shake 0.5s ease";
      }
      // get rid of animation
      parent.addEventListener("animationend", () => {
        parent.style.animation = "";
      });
    });
  });

  enterForm("#username-enter", ".username-enter");
  enterForm("#email-enter", ".email-enter");
  enterForm("#password-enter", ".password-enter");
}

function validateUser(user) {
  if (user.value.length < 6) {
    console.log("not enough characters");
    error("rgb(189, 87, 87)");
  } else {
    error("rgb(87, 189, 130)");
    return true;
  }
}

function validateEmail(email) {
  // regular expression (RegEx) for email validation
  const valdiation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (valdiation.test(email.value)) {
    error("rgb(87, 189, 130)");
    return true;
  } else {
    error("rgb(189, 87, 87)");
  }
}

function addAutoFocus(className) {
  document.querySelector(className).focus();
}

function nextSlide(parent, nextForm) {
  parent.classList.add("innactive");
  parent.classList.remove("active");
  nextForm.classList.add("active");
}

function error(color) {
  document.body.style.backgroundColor = color;
}

animatedForm();
