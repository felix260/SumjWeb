<template>
    <el-container class="login_Container">
        <el-header>
            我是头部
        </el-header>
        <el-main>
            <div class="login_box">
                <el-tabs class="login_tabs" value="weiXinDengLu" :stretch="true" type="border-card">
                    <el-tab-pane name="weiXinDengLu" label="微信登录">
                        <div class="qrcode_image"><img src="../assets/images/login_qrcode.png"></div>
                        <div class="qrcode_tip">请使用微信扫描二维码登录</div>
                    </el-tab-pane>
                    <el-tab-pane name="zhangHuDengLu" label="账户登录">
                        <el-input class="login_input" v-model="username" placeholder="请输入帐号" prefix-icon="el-icon-user"></el-input>
                        <el-input class="login_input" v-model="pwd" prefix-icon="el-icon-lock" show-password placeholder="请输入密码"></el-input>
                        <el-row type="flex" justify="end" class="login_input">
                            <el-button type="primary">登录</el-button>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane name="shouJiDengLu" label="手机登录">
                        <el-input class="login_input" v-model="username" placeholder="请输入手机号码" prefix-icon="el-icon-mobile-phone"></el-input>
                        <el-row class="login_input">
                            <el-col>
                                <el-input v-model="pwd" prefix-icon="el-icon-chat-dot-round" placeholder="请输入验证码">
                                    <el-button slot="append" @click="getYanZhengMa" style="width:100px;">{{yanZhengShengYu}}</el-button>
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row type="flex" justify="end" class="login_input">
                            <el-button type="primary">登录</el-button>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-main>
        <el-footer>我是footer</el-footer>
    </el-container>
</template> 
<script >
export default {
    name: "Login",
    data() {
        return {
            username: "",
            pwd: "",
            yanZhengShengYu: "获取验证码",
            int_YanZhengShengYu: 60,
            test: "",
        };
    },
    methods: {
        getYanZhengMa: function () {
            if (this.yanZhengShengYu == "获取验证码") {
                this.yanZhengShengYu = this.int_YanZhengShengYu.toString();
                var login_Interval = setInterval(() => {
                    this.yanZhengShengYu = (--this
                        .int_YanZhengShengYu).toString();
                    if (this.int_YanZhengShengYu <= 0) {
                        this.yanZhengShengYu == "获取验证码";
                        this.int_YanZhengShengYu = 60;
                        console.log(this.yanZhengShengYu);
                        console.log(this.int_YanZhengShengYu);
                        clearInterval(login_Interval);
                    }
                }, 100);
            }
        },
    },
};
</script>
<style scoped>
.login_Container {
    height: 100%;
    background-color: #2b4b6b;
}
.login_box {
    width: 350px;
    height: 350px;
    background-color: white;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.login_form {
    height: 100%;
}
.login_tabs {
    height: 100%;
}
.qrcode_tip {
    text-align: center;
    font-size: 10px;
}
.qrcode_image {
    text-align: center;
}
.login_input {
    margin-top: 30px;
}
</style>