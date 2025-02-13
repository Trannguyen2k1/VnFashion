import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDhQeQAJAvzeM_J0CkGnT7p5vtLKDt02pY",
  authDomain: "vnfashion-72287.firebaseapp.com",
  databaseURL: "https://vnfashion-72287-default-rtdb.firebaseio.com",
  projectId: "vnfashion-72287",
  storageBucket: "vnfashion-72287.appspot.com",
  messagingSenderId: "812106547682",
  appId: "1:812106547682:web:865e61b580c223864979bb",
  measurementId: "G-R8ZN5V2T95"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Ghi thử dữ liệu lên Firebase
const testRef = ref(database, "test_connection");
set(testRef, {
  message: "Website đã kết nối Firebase thành công!"
})
  .then(() => console.log("🔥 Kết nối Firebase thành công!"))
  .catch((error) => console.error("❌ Lỗi kết nối Firebase:", error));

// Đọc thử dữ liệu từ Firebase
const dbRef = ref(database);
get(child(dbRef, "test_connection"))
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log("📌 Dữ liệu Firebase:", snapshot.val());
    } else {
      console.log("⚠️ Không có dữ liệu nào trong Firebase!");
    }
  })
  .catch((error) => console.error("❌ Lỗi khi đọc dữ liệu:", error));
