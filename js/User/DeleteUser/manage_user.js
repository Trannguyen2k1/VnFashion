// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/111.3.1/firebase-analytics.js";
import { getDatabase, set, ref, update, child, get, remove } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
import { getAuth, deleteUser } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
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
    
const deleteButton = document.getElementById('delete_acc');
deleteButton.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của sự kiện click
        Alert();
    });

function confirmDelete() {
    // Hiển thị hộp thoại xác nhận
    if (confirm("Bạn có chắc chắn muốn xóa tài khoản không?")) {
        // Nếu người dùng nhấp vào OK, thực hiện xóa tài khoản
        deleteAccount();
    } else {
        // Nếu người dùng nhấp vào Cancel, không làm gì cả
        console.log("Người dùng đã hủy xóa tài khoản.");
    }
}
    // Thực hiện xóa tài khoản
function deleteAccount() {
    const auth = getAuth();
    const user = auth.currentUser;

    var uid = user.uid;
    var email = user.email;
    deleteUser(user).then(() => {
        // User deleted.
        // console.log("Tài khoản ")
    }).catch((error) => {
        // An error ocurred
        // ...
        console.log("error")
    });
    remove(ref(database, "users/" + uid))
    .then(()=>{
        // alert("ok")
        // alert("Đã xoá tài khoản " + email + " thành công!");
    })
    .catch((error)=>{
        // alert("no")
    })
}
function Alert(){
    Swal.fire({
        title: "Xác nhận?",
        text: "Bạn có chắc chắn xoá tài khoản không :((",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Xoá thành công!",
            text: "Bạn đã xoá tài khoản thành công!",
            icon: "success",
            color: "#716add",
          });
          deleteAccount();
        }
      });
  }