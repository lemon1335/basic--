// 변수선언
const regex = new RegExp(
  "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
);
const inputEmail = document.getElementById("signup-email");
const inputNickname = document.getElementById("signup-nickname");
const inputPassword = document.getElementById("signup-password");
const checkoutPassword = document.getElementById("checkout-password");
const signupForm = document.getElementById("signup-form");
const validInputs = document.querySelectorAll("[data-valid]");
const btnAbled = document.getElementById("signup-button");

//이메일 값 확인
inputEmail.addEventListener("focusout", (e) => validateEmail(e, "email"));

function validateEmail(e, type) {
  const inputValue = e.target.value;
  const parentElement = e.target.parentElement;
  const validationMessage = parentElement.querySelector(".invalid-text");

  if (type === "email") {
    if (inputValue === "") {
      validationMessage.textContent = "이메일을 입력해주세요.";
      e.target.dataset.valid = false;
      inputEmail.classList.add("invalid-mark");
      return;
    } else if (!regex.test(inputValue)) {
      validationMessage.textContent = "잘못된 이메일 형식입니다.";
      e.target.dataset.valid = false;
      inputEmail.classList.add("invalid-mark");
      return;
    }
    e.target.dataset.valid = true;
    validationMessage.textContent = "";
    inputEmail.classList.remove("invalid-mark");
  }
}

//닉네임 값 확인
inputNickname.addEventListener("focusout", (e) => validateNickname(e, "text"));

function validateNickname(e, type) {
  const inputValue = e.target.value;
  const parentElement = e.target.parentElement;
  const validationMessage = parentElement.querySelector(".invalid-text");
  if (type === "text") {
    if (inputValue === "") {
      validationMessage.textContent = "닉네임을 입력해주세요";
      e.target.dataset.valid = false;
      inputNickname.classList.add("invalid-mark");
      return;
    }
    e.target.dataset.valid = true;
    validationMessage.textContent = "";
    inputNickname.classList.remove("invalid-mark");
  }
}

//비밀번호값 확인
inputPassword.addEventListener("focusout", (e) =>
  validatePassword(e, "password")
);

function validatePassword(e, type) {
  const inputValue = e.target.value;
  const parentElement = e.target.parentElement;
  const validationMessage = parentElement.querySelector(".invalid-text");
  if (type === "password") {
    if (inputValue === "") {
      validationMessage.textContent = "비밀번호를 입력해주세요.";
      e.target.dataset.valid = false;
      inputPassword.classList.add("invalid-mark");
      return;
    } else if (inputValue.length < 8) {
      validationMessage.textContent = "비밀번호를 8자 이상 입력해주세요.";
      e.target.dataset.valid = false;
      inputPassword.classList.add("invalid-mark");
      return;
    }
    e.target.dataset.valid = true;
    validationMessage.textContent = "";
    inputPassword.classList.remove("invalid-mark");
  }
}

//비밀번호 일치 확인
checkoutPassword.addEventListener("focusout", (e) =>
  doubleCheckPassword(e, "password")
);

function doubleCheckPassword(e, type) {
  const inputValue = e.target.value;
  const parentElement = e.target.parentElement;
  const validationMessage = parentElement.querySelector(".invalid-text");
  if (type === "password") {
    if (inputValue !== inputPassword.value) {
      validationMessage.textContent = "비밀번호가 일치하지 않습니다..";
      e.target.dataset.valid = false;
      checkoutPassword.classList.add("invalid-mark");
      return;
    }
    e.target.dataset.valid = true;
    validationMessage.textContent = "";
    checkoutPassword.classList.remove("invalid-mark");
  }
}

//버튼 활성화
signupForm.addEventListener("focusout", (e) => updateButtonState(e));

function updateButtonState(e) {
  const result = Array.from(validInputs).every(
    (e) => e.dataset.valid === "true"
  );
  console.log(result + "completed");

  if (result) {
    btnAbled.disabled = false;
  }
  btnAbled.classList.toggle("active", result);
}
