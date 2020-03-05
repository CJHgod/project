var Cookie = {
    setCookie(key, value, time, address = "/") {
        if (time) {
            let date = new Date();
            date.setDate(date.getDate() + time);
            document.cookie = key + "=" + value + ";expires=" + date + ";path" + address;

        } else {
            document.cookie = key + "=" + value;
        }
    },

    getCookie(key) {
        let arr = document.cookie.split("; ");
        for (var i = 0; i < arr.length; i++) {
            var array = arr[i].split("=");
            if (array[0] == key) {
                return array[1];

            }
        }
    },
    removeCookie(key) {
        this.setCookie(key, "", -1);
    },
    clearAllCookie() {
        let arr = document.cookie.split("; ");
        let array = [];
        arr.forEach((item) => {
            var arrs = item.split("=");
            array.push(arrs[0]);
        })
        array.forEach((items) => {
            this.removeCookie(items, "", -1);
        });
    }

}
