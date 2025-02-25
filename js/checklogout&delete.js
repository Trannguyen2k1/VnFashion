// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
import {getDatabase,update,ref} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
import {getAuth,signOut,} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
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

//Xoá cookies hiện tại
function deleteAllCookies() {
  Cookies.remove('userInfo', { path: '/' });
}
//In cookies ra xem còn cookies không
function printAllCookies() {
  // Đọc giá trị từ cookie
  const userInfoStringFromCookie = Cookies.get('userInfo');
  // Chuyển chuỗi JSON thành đối tượng JavaScript
  if (userInfoStringFromCookie) {
    const userInfoFromCookie = JSON.parse(userInfoStringFromCookie);
    console.log(userInfoFromCookie); // {name: "Đào Văn Đôi", age: 30, email: "daovandoi@example.com"}
    console.log(userInfoFromCookie.email_profile);
    console.log(userInfoFromCookie.sdt_profile);
    console.log(userInfoFromCookie.hoten_profile);
    console.log(userInfoFromCookie.password_profile);
    console.log(userInfoFromCookie.id_profile);
    console.log(userInfoFromCookie.username_profile);
    console.log(userInfoFromCookie.url_profile);
    console.log(userInfoFromCookie.role);
    console.log(userInfoFromCookie.userstatus);
    console.log(userInfoFromCookie.last_login);
    console.log(userInfoFromCookie.last_logout);
  } else {
    console.log('Cookies không tồn tại hoặc đã bị xoá?!');
  }
}
//Đăng xuất
function Logout() {
  signOut(auth)
    .then(() => {
      window.location.href = 'login.html';
    })
    .catch((error) => {
      console.error("Lỗi khi đăng xuất:", error);
    });
}
//Thêm thời gian đăng xuất và cập nhập trạng thái offline
function AddLastLogout() {
  let last_logout_time = new Date();
  let formattedDateTime = last_logout_time.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const user = auth.currentUser;
  update(ref(database, "users/" + user.uid), {
    last_logout: formattedDateTime,
  });
    update(ref(database, "users/" + user.uid), {
    userstatus: "offline",
  });

}
//Thông báo đăng xuất thành công
function AlertSuccess(){
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      // toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "success",
    title: "Đăng xuất thành công!",
    color: "#716add",
  });
}
//Hỏi người dùng có xác nhận đăng xuất không
function AlertConfirm(){
  Swal.fire({
    title: "Bạn chắc không?",
    text: "Bạn sẽ đăng xuất bây giờ!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes!"
  }).then((result) => {
    if (result.isConfirmed) {
      printAllCookies();
      deleteAllCookies();
      AddLastLogout();
      printAllCookies();
      AlertSuccess();
      setTimeout(function() {
        Logout();
      }, 3000); 
    }
  });
}
//Sự kiện khi bấm đăng xuất
document.getElementById("logout").addEventListener("click", function (event) {
  event.preventDefault();
  AlertConfirm();
});
