import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import UserInfo from '../views/SystemSetting/UserInfo/UserInfo'
import StockManage from '../views/StockManage/StockManage'
import DeviceData from '../views/DeviceData/DeviceData'
import SystemSetting from '../views/SystemSetting/SystemSetting'
import SystemBaseData from '../views/SystemSetting/SystemBaseData/SystemBaseData'
import Menu from '../views/SystemSetting/Menu/Menu'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import GZHRecord from '../views/SystemSetting/GZHRecord/GZHRecord'
import HDWY01_Result from '../views/DeviceData/HDWY01/HDWY01_Result'
import HDWY01_DAT from '../views/DeviceData/HDWY01/HDWY01_DAT'
import HDWY01_Operate_Main from '../views/DeviceData/HDWY01/HDWY01_Operate_Main'
import DeviceData_Default from '../views/DeviceData/DeviceData_Default'
import SystemSetting_Default from '../views/SystemSetting/SystemSetting_Default'
import StockManage_Default from '../views/StockManage/StockManage_Default'
import HDWY01_Operate from '../views/DeviceData/HDWY01/HDWY01_Operate'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/Login'
}, {
    name: "S",
    path: "/S",
    component: () => import("../views/Scan/Scan")
}, {
    name: "QCodeBindDevice",
    path: "/QCodeBindDevice",
    component: () => import("../views/Scan/QCodeBindDevice")
},
{
    path: "/AutoLogin",
    name: 'AutoLogin',
    component: () => import("../views/Scan/AutoLogin")
},
{
    path: "/Login",
    name: 'Login',
    component: Login
},
{
    path: "/Wap_PRINT1_Operate",
    name: 'Wap_PRINT1_Operate',
    component: () => import("../views/DeviceData/PRINT1/WapOperate")
},
{
    path: "/WapHome",
    name: 'WapHome',
    component: () => import("../views/WapHome"),
    children: [{
        name: "WapMyHome", path: "/WapMyHome", component: () => import("../views/WAP/WapMyHome")
    }, {
        name: "WapMy", path: "/WapMy", component: () => import("../views/WAP/WapMy")
    }]
},
{
    path: "/home",
    name: 'Home',
    component: Home,
    children: [{
        name: "StockManage",
        path: "/StockManage",
        component: StockManage,
        meta: ['仓库管理'],
        children: [{
            name: "StockManage_Default",
            path: "/StockManage/StockManage_Default",
            component: StockManage_Default,
            meta: ['仓库管理']
        }]

    }, {
        path: "/DeviceData",
        name: 'DeviceData',
        component: DeviceData,
        meta: ['设备数据'],
        children: [{
            name: "DeviceData_Default",
            path: "/DeviceData/DeviceData_Default",
            component: DeviceData_Default,
            meta: ['设备数据']
        }, {
            name: "HDWY01_Operate_Main",
            path: "/DeviceData/HDWY01_Operate_Main",
            component: HDWY01_Operate_Main,
            meta: ['设备数据', '恒电位恒电流', '恒电位恒电流操作'],
            children: [{
                name: "HDWY01_Operate",
                path: "/DeviceData/HDWY01_Operate_Main/HDWY01_Operate",
                component: HDWY01_Operate,
                meta: ['设备数据', '恒电位恒电流', '恒电位恒电流操作'],
            }]
        }, {
            name: "HDWY01_Result",
            path: "/DeviceData/HDWY01_Result",
            component: HDWY01_Result,
            meta: ['设备数据', '恒电位恒电流', '恒电位恒电流查询']
        }, {
            name: "HDWY01_DAT",
            path: "/DeviceData/HDWY01_DAT",
            component: HDWY01_DAT,
            meta: ['设备数据', '恒电位恒电流', '恒电位恒电流DAT']
        }]

    }, {
        path: "/SystemSetting",
        name: 'SystemSetting',
        component: SystemSetting,
        meta: ['系统设置'],
        children: [{
            name: "SystemSetting_Default",
            path: "/SystemSetting/SystemSetting_Default",
            component: SystemSetting_Default,
            meta: ['系统设置']
        }, {
            name: "UserInfo",
            path: "/SystemSetting/UserInfo",
            component: UserInfo,
            meta: ['系统设置', '用户管理']
        }, {
            name: "SystemBaseData",
            path: "/SystemSetting/SystemBaseData",
            component: SystemBaseData,
            meta: ['系统设置', '系统参数设置']
        }, {
            name: "GZHRecord",
            path: "/SystemSetting/GZHRecord",
            component: GZHRecord,
            meta: ['系统设置', '公众号日志']
        }, {
            name: "Menu",
            path: "/SystemSetting/Menu",
            component: Menu,
            meta: ['系统设置', '菜单管理']
        }, {
            name: "Group",
            path: "/SystemSetting/Group",
            component: () => import("../views/SystemSetting/Group/Group"),
            meta: ["系统设置", "组与用户"]
        }, {
            name: "OnLineDevice",
            path: "/SystemSetting/OnLineDevice",
            component: () => import("../views/SystemSetting/Device/OnLineDevice"),
            meta: ["系统设置", "在线设备"]
        }, {
            name: "WXCWSensor",
            path: "/SystemSetting/WXCWSensor",
            component: () => import("../views/SystemSetting/WXCWSensor/Index"),
            meta: ["系统设置", "无线测温仪传感器注册"]
        }, {
            name: "Product",
            path: "/SystemSetting/Product",
            component: () => import("../views/SystemSetting/Product/Index"),
            meta: ["系统设置", "产品管理"]
        }, {
            name: "Device",
            path: "/SystemSetting/Device",
            component: () => import("../views/SystemSetting/Device/Index"),
            meta: ["系统设置", "在线设备"]
        }]
    },]
}, { name: "WapHDWY01Operate", path: "/WapHDWY01Operate", component: () => import('../views/DeviceData/HDWY01/WapHDWY01Operate') }
    , { name: "WapRegisterDevice", path: "/WapRegisterDevice", component: () => import("../views/SystemSetting/Device/WapRegisterDevice") }
    , { name: "D", path: "/D", component: () => import("../views/DownLoad/DownLoad") }
    , { name: "WapWXCW01Operate", path: "/WapWXCW01Operate", component: () => import("../views/DeviceData/WXCW01/WapWXCW01Operate") }


]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach(function (to, from, next) {
    document.title = "SUMJ"
    NProgress.start();
    let path = to.path.toUpperCase()
    if (path === "/LOGIN" || path === "/AUTOLOGIN") { return next(); }
    else if (path === "/D") {
        next();
    }
    else if (path === "/S") {
        return next();
    }
    else if (!window.localStorage.getItem("token")) {
        NProgress.done();
        return next("/login");
    }
    next();
})

router.afterEach(() => {
    NProgress.done();
})

export default router