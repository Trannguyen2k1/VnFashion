  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
  import { getDatabase, set, ref, get, child, update,remove } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhQeQAJAvzeM_J0CkGnT7p5vtLKDt02pY",
  authDomain: "vnfashion-72287.firebaseapp.com",
  databaseURL: "https://vnfashion-72287-default-rtdb.firebaseio.com",
  projectId: "vnfashion-72287",
  storageBucket: "vnfashion-72287.firebasestorage.app",
  messagingSenderId: "812106547682",
  appId: "1:812106547682:web:865e61b580c223864979bb",
  measurementId: "G-R8ZN5V2T95"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase(app);
  const auth = getAuth();


document.getElementById('signup').addEventListener('submit', function(event) {
    event.preventDefault();

    var hoten = document.getElementById("signup-hoten").value;
    var sdt = document.getElementById("signup-sdt").value;
    var username = document.getElementById("signup-username").value;
    var email = document.getElementById("signup-email").value;
    var password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;

    set(ref(database, 'users/' + user.uid),{
        username : username,
        email: email,
        password: password,
        hoten: hoten,
        sdt: sdt,
        last_login: "",
        last_logout: "",
        urlavatar: "",
        role: "user",
        userstatus: "signup"
    })
    // alert('Đăng ký thành công!');

    document.getElementById('signupMessage').innerText = 'Đăng ký thành công! Vui lòng đăng nhập!';
    signupMessage.style.color = 'green';
    AlertSuccess()
    setTimeout(function() {
      window.location.href = 'login.html';
            // window.location.reload();
    }, 3000);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    // alert('Đăng ký thất bại Email đã được sử dụng!');
    AlertError();
    document.getElementById('signupMessage').innerText = 'Email chưa chính xác hoặc đã được sử dụng!';
    signupMessage.style.color = 'red';
  });
});
function AlertSuccess(){
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "success",
    title: "Đăng ký thành công!"
  });
}
function AlertError(){
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
    // footer: '<a href="#">Why do I have this issue?</a>'
  });
}