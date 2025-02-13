// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
  update,
  child,
  get,
  remove,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
import {
  getAuth,
  deleteUser,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
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
const user = auth.currentUser;

  // Đọc giá trị từ cookie
  const userInfoStringFromCookie = Cookies.get('userInfo');
  // Chuyển chuỗi JSON thành đối tượng JavaScript
  if (userInfoStringFromCookie) {
    const userInfoFromCookie = JSON.parse(userInfoStringFromCookie);
    
    const uidProfile = userInfoFromCookie.id_profile; // ID
    const emailProfile = userInfoFromCookie.email_profile; //Email
    const hotenProfile = userInfoFromCookie.hoten_profile; //Họ tên
    const passwordProfile = userInfoFromCookie.password_profile; //Password
    const sdtProfile = userInfoFromCookie.sdt_profile; //Số điện thoại
    const usernameProfile = userInfoFromCookie.username_profile; //Username
    const URLProfile = userInfoFromCookie.url_profile; //Link ảnh
    const RoleProfile = userInfoFromCookie.role; //Vai trò người dùng
    const Status = userInfoFromCookie.userstatus; //Trạng thái
    const TimeLogin = userInfoFromCookie.last_login; //Time đăng nhập
    const TimeLogout = userInfoFromCookie.last_logout; //Time đăng xuất

    // console.log(userInfoFromCookie);

function UpdateThongtin() {
  var newhoten = document.getElementById("hoten").value;
  var newsdt = document.getElementById("sdt").value;
  var newusername = document.getElementById("username").value;

  const database = getDatabase(app);

  update(ref(database, "users/" + uidProfile), {
    username: newusername,
    hoten: newhoten,
    sdt: newsdt,
  })
  .then(() => {
      AlertSuccess();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    })

  .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    });
}

document.getElementById("update-profile").addEventListener("submit", function (event) {
    event.preventDefault();
    UpdateThongtin();
    UpdateCookies();
  });
function UpdateCookies() {
  var newhoten = document.getElementById("hoten").value;
  var newsdt = document.getElementById("sdt").value;
  var newusername = document.getElementById("username").value;
      //Khởi tạo chuỗi giá trị để lưu vào cookies
      const userInfo = {
        id_profile: uidProfile,
        email_profile: emailProfile,
        hoten_profile: newhoten,
        password_profile: passwordProfile,
        sdt_profile: newsdt,
        username_profile: newusername,
        url_profile: URLProfile,
        role: RoleProfile,
        userstatus: Status,
        last_login: TimeLogin,
        last_logout: TimeLogout,
      };
      const userInfoString = JSON.stringify(userInfo);
      // Lưu chuỗi JSON vào cookie
      Cookies.set('userInfo', userInfoString, { expires: 2, path: '/' });
}
} else {
  console.log('Cookies không tồn tại hoặc đã bị xoá?!');
}
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
    title: "Cập nhật thông tin thành công!",
    color: "#716add",
  });
}