var init = {
    aLi: document.querySelectorAll('ul li'),
    iLen: this.aLi.length,
    iPage: 1,
    //用来控制getList的开关
    b: true
}

var portUrl = 'http://jomsou.gearhostpreview.com/get_pics.php';
//初始化数据
getList(portUrl);

function getList(url) {
    //用ajax从后端接口加载数据
    ajax('get', url, 'cpage' + iPage, function (data) {
        var data = JSON.parse(data);
        //数据加载完成
        if (!data.length) {
            return;
        }
        for (var i = 0; i < data.length; i++) {

            var _index = getShort();
            //创建元素
            var oDiv = document.createElement('div');
            var oImg = document.createElement('img');
            //利用数据，处理数据
            oImg.src = data[i].preview;
            //根据布局设置图片的宽度
            oImg.style.width = '225px';
            //为了使图片不失真、变形,根据比例设置高度
            oImg.style.height = data[i].height * (225 / data[i].width) + 'px';
            //添加元素
            oDiv.appendChild(oImg);
            var oP = document.createElement('p');
            oP.innerHTML = data[i].title;
            oDiv.appendChild(oP);
            //将整个oDiv加到HTML的最短li中
            aLi[_index].appendChild(oDiv);
        }

        b = true;
    })
}
window.onscroll = function () {
    var _index = getShort();
    var oLi = aLi[_index];
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (getTop(oLi) + oLi.offsetHeight < document.documentElement.clientHeight + scrollTop) {
        if (b) {
            b = false;
            iPage++;
            getList(portUrl);
        }
    }
}
//获取最短的一列
function getShort() {
    var index = 0;
    var ih = aLi[index].offsetHeight;
    for (var i = 1; i < iLen; i++) {
        if (aLi[i].offsetHeight < ih) {
            index = i;
            ih = aLi[i].offsetHeight;
        }
    }

    return index;
}
//获取最短列距顶部
function getTop(obj) {
    var iTop = 0;
    while (obj) {
        iTop += obj.offsetTop;
        obj = obj.offsetParent;
    }

    return iTop;
}