<template>
    <div class="flex  justify-center  h-screen my-36 rounded-2xl  ">
     
        
        <div class="  bg-base-300 rounded-xl  card  w-4/12   ">
  
            <p class="text-4xl font-bold mb-6  text-center pt-28  text-primary">
                เข้าสู่ระบบ
            </p>
            <form @submit.prevent="userLogin" class=" px-10 ">
                <div class="mb-4">
  
                    <label for="email" class="block mb-2 pt-8">
                        ชื่อผู้ใช้หรืออีเมล
                    </label>
                    <input type="email" v-model="email" id="email" placeholder="กรุณาป้อนอีเมล"
                        class="w-full px-4 py-2 border rounded-full" 
                    />
                </div>
                <div class="mb-4">
                    <label for="password" class="block mb-2">
                        รหัสผ่าน
                    </label>
                    <input type="password" v-model="password" id="password" placeholder="กรุณาป้อนรหัสผ่าน"
                        class="w-full px-4 py-2 border rounded-full " />
                </div>
  
                <!-- ส่วน checkbox สำหรับนโยบายการใช้งาน -->
                <div class="mb-4 pt-4">
                    <input 
                    type="checkbox" v-model="acceptPolicy" id="acceptPolicy" @change="handlePolicyChange" class=""
                    />
                    <label for="acceptPolicy" class="pl-2">
                        ยอมรับ
                        <RouterLink to="policy" class=" text-primary ">
                            นโยบายการใช้งาน
                        </RouterLink>
                    </label>
                </div>
  
                <button type="submit" class="bg-primary  w-full py-3 font-bold rounded-full text-base-300 ">
                    เข้าสู่ระบบ
                </button>
            </form>
        </div>
  
    </div>
  </template>
  
<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default
    {
        name: 'Login',
        data() {
            return {
                email: '',   // Capture email input
                password: '', // Capture password input
                acceptPolicy: false, // สถานะของ checkbox นโยบายการใช้งาน
            };
        },
        methods: {
            // method สำหรับแสดง popup ทันทีที่กด checkbox
            handlePolicyChange() {
                if (this.acceptPolicy) {
                    Swal.fire({
                        icon: 'info',
                        title: 'คุณยอมรับนโยบายการใช้งานแล้ว',
                        text: 'ขอบคุณที่ยอมรับนโยบายของเรา',
                        confirmButtonText: 'ตกลง'
                    });
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'คุณยังไม่ได้ยอมรับนโยบายการใช้งาน',
                        text: 'โปรดยอมรับนโยบายการใช้งานก่อน',
                        confirmButtonText: 'ตกลง'
                    });
                }
            },

            async userLogin() {
                if (!this.acceptPolicy) {
                    // แสดง Swal แจ้งเตือนถ้าไม่ยอมรับนโยบาย
                    Swal.fire({
                        icon: 'warning',
                        title: 'กรุณายอมรับนโยบายการใช้งาน',
                        confirmButtonText: 'ตกลง'
                    });
                    return;
                }

                try {
                    const response = await axios.post('http://34.201.40.25:5000/users/login', {
                        email: this.email,
                        password: this.password,
                    });
                    console.log(response.data);
                    localStorage.setItem('userToken', response.data.token);
                    localStorage.setItem('userToken', response.data.token);
                    localStorage.setItem('username', response.data.username);
                    localStorage.setItem('role', JSON.stringify(response.data.role));
                    localStorage.setItem('_id', response.data._id);
                    console.log(localStorage.getItem('_id'));

                    const user = JSON.parse(localStorage.getItem('role'));
                    Swal.fire({
                        icon: 'success',
                        title: 'Logged in successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    if (user == 'admin') {
                        this.$router.push({ name: 'ChangeUser' });
                    } else {
                        this.$router.push({ name: 'Home' });
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Invalid email or password',
                        icon: 'error',
                        confirmButtonText: 'OK!'
                    })
                }
            },
        },
    }
</script>
