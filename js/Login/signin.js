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

function SavaToCookies() {
    const user = auth.currentUser;
    const databaseRef = ref(database);
    const userRef = child(databaseRef, "users/" + user.uid);
    get(userRef)
    .then((snapshot) => {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const iduser = snapshot.key;
      //Khởi tạo chuỗi giá trị để lưu vào cookies
      const userInfo = {
        id_profile: iduser,
        email_profile: userData.email,
        hoten_profile: userData.hoten,
        password_profile: userData.password,
        sdt_profile: userData.sdt,
        username_profile: userData.username,
        url_profile: userData.urlavatar,
        role: userData.role,
        userstatus: userData.userstatus,
        last_login: userData.last_login,
        last_logout: userData.last_logout,
      };
      const userInfoString = JSON.stringify(userInfo);
      // Lưu chuỗi JSON vào cookie
      Cookies.set('userInfo', userInfoString, { expires: 2, path: '/' });

      // Đọc giá trị từ cookie
      const userInfoStringFromCookie = Cookies.get('userInfo');
      // Chuyển chuỗi JSON thành đối tượng JavaScript
      if (userInfoStringFromCookie) {
        const userInfoFromCookie = JSON.parse(userInfoStringFromCookie);
      } else {
        console.log('No user info found in cookies');
      }
    }
  })  
}

document.getElementById('signin').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  deleteAllCookies();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const lastLoginTime = new Date().toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      // AddLastLogout();
      // Fetch user role from the database
      const userRef = ref(database, '/users/' + user.uid);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            const userRole = userData.role;

            let updates = {};
            updates['/users/' + user.uid + '/last_login'] = lastLoginTime;
            updates['/users/' + user.uid + '/userstatus'] = "online";

            update(ref(database), updates)
              .then(() => {
                console.log('Đã cập nhật thời gian đăng nhập và trạng thái thành công.');

                document.getElementById('loginMessage').innerText = 'Đăng nhập thành công! Vui lòng đợi!';
                document.getElementById('loginMessage').style.color = 'green';
                SavaToCookies();

                if (userRole === 'admin') {
                  AlertSuccessAdmin();
                  setTimeout(() => {
                    window.location.href = 'auth.admin.html';
                  }, 3000);
                } else {
                  AlertSuccess();
                  setTimeout(() => {
                    window.location.href = 'auth.index.html';
                  }, 3000);
                }
              })
              .catch((error) => {
                console.error('Lỗi khi cập nhật dữ liệu:', error);
              });
          } else {
            console.error('Không có dữ liệu người dùng.');
          }
        })
        .catch((error) => {
          console.error('Lỗi khi lấy dữ liệu người dùng:', error);
        });
    })
    .catch((error) => {
      const errorMessage = error.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tài khoản hoặc mật khẩu không đúng!",
      });
      document.getElementById('loginMessage').innerText = 'Tài khoản hoặc mật khẩu không đúng!';
      document.getElementById('loginMessage').style.color = 'red';
      console.error('Lỗi đăng nhập:', errorMessage);
    });
});
//Xoá cookies hiện tại
function deleteAllCookies() {
  Cookies.remove('userInfo', { path: '/' });
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
    title: "Đăng nhập thành công",
    color: "#716add",
  });
}
function AlertSuccessAdmin(){
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
    title: "Chào mừng admin đăng nhập!",
    color: "#716add",
  });
}