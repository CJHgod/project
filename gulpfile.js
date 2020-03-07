//导入gulp包
const gulp = require("gulp");


//压缩CSS
//先安装 模块   npm install gulp-minify-css --save-dev
//这里可以考虑 兼容性    npm install gulp-autoprefixer --save-dev
const mincss = require("gulp-minify-css");
const autocss = require("gulp-autoprefixer");
const cssHandler = () => {
    return gulp.src("./src/css/*.css")
        .pipe(autocss({
            // browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(mincss())
        .pipe(gulp.dest("dest/css"))
}



//压缩JS
//先安装 模块   npm install gulp-uglify --save-dev
//由于 uglify不支持ES6     所以还要安装 gulp-babel  @babel/core  @babel/preset-env
const minJs = require("gulp-uglify");
const babel = require("gulp-babel");
const jsHandler = () => {
    return gulp.src("./src/js/*.js")
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(minJs())
        .pipe(gulp.dest("dest/js"))
}



//转移  lib文件夹
const libMove = () => {
    return gulp.src("./src/lib/**").pipe(gulp.dest("dest/lib"))
}
//转移  json文件夹
const jsonMove = () => {
    return gulp.src("./src/json/**").pipe(gulp.dest("dest/json"))
}


//压缩html
//安装模块  npm install gulp-htmlmin --save-dev
const htmlmin = require("gulp-htmlmin");
const htmlHandler = () => {
    return gulp.src("./src/html/*.html")
        .pipe(htmlmin({
            removeAttributeQuotes: true,  //移出逗号
            removeComments: true,           //移除注释
            collapseBooleanAttributes: true, //简写boolean属性
            collapseWhitespace: true,    //删除全部空格
            minifyCSS: true,        //整合 html 文件的 style标签内的样式
            minifyJS: true             //整合 html文件里的 js 代码
        }))
        .pipe(gulp.dest("dest/html"))
}


//删除原打包文件，再重新打包
const del = require("del");
const delHandler = () => {
    return del(["./dest"])
}

//不压缩图片，单纯移动图片
// gulp.task("imgHandler1", () => {
//     console.log("1234")
// })
const imgHandler = () => {
    return gulp.src("./src/images/**").pipe(gulp.dest("dest/images"))
}

//开启一个服务器
//先安装 模块  npm install gulp-webserver --save-dev
const webserver = require("gulp-webserver");
const webserverHandler = () => {
    return gulp.src("./dest")
        .pipe(webserver({
            host: "127.0.0.1", // 域名, 这个域名可以自定义
            port: 7673, // 端口号, 0 ~ 65535, 尽量不适用 0 ~ 1023
            open: '/html/index.html', // 你默认打开的首页, 从 dist 下面的目录开始书写  (不用加作为服务器的文件夹了)
            livereload: true, // 自动刷新浏览器 - 热重启

            //配置代理服务器
            proxies: [
                {
                    source: '/register',
                    target: 'http://localhost/maho/register.php'
                },
                {
                    source: '/login',
                    target: 'http://localhost/maho/login.php'
                },
                {
                    //向购物车添加功能
                    source: '/addcart',
                    target: 'http://localhost/maho/addshopsTocart.php'
                },
                {
                    //查询购物车功能
                    source: '/selectcart',
                    target: 'http://localhost/maho/selectCart.php'
                },
                {
                    //修改购物车功能
                    source: '/delData',
                    target: 'http://localhost/maho/delData.php'
                },
                {
                    //更新购物车商品选中功能功能
                    source: '/updateActive',
                    target: 'http://localhost/maho/updateActive.php'
                },
                {
                    //更新购物车商品数量功能
                    source: '/updateShopNum',
                    target: 'http://localhost/maho/updateShopNum.php'
                },
            ]

        })) // 开启服务器
}

//自动监视文件变化
const watchHandler = () => {
    gulp.watch("./src/css/*.css", cssHandler)
    gulp.watch("./src/js/*.js", jsHandler)
    gulp.watch("./src/html/*.html", htmlHandler)
    gulp.watch("./src/lib/**", libMove)
    gulp.watch("./src/json/**", jsonMove)
    gulp.watch("./src/images/**", imgHandler)

}

//同时执行多方法    gulp-series 按顺序执行，上面完了才开始下面     gulp-parallel() 同时执行不分先后
module.exports.default = gulp.series(
    delHandler,  //先执行
    gulp.parallel(cssHandler, jsHandler, libMove, jsonMove, htmlHandler, imgHandler),
    webserverHandler,
    watchHandler,
)


// module.exports.del = delHandler;
// module.exports.css = cssHandler;
// module.exports.js = jsHandler;
// module.exports.html = htmlHandler;