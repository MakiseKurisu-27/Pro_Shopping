window.addEventListener('load', function() {
    // 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 1. 鼠标经过 focus 就显示出 隐藏的左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            // 手动调用点击事件
            arrow_r.click();
        }, 2000);
    });

    // 获取元素
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length); 【测试】
    // 2. 动态生成小圆圈  有几张图片, 就生成几个小圆圈
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个小li
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来做
        li.setAttribute('data-index', i);
        // 把小li 插入到ol 里面
        ol.appendChild(li);
        // 3. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            // 干掉所有人 把所有的li 清除 current 类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下当前点击的小li 设置 current 类名
            this.className = 'current';
            // 4. 点击小圆圈, 移动图片  当然移动的是 ul
            // ul 的移动距离 小圆圈的索引号 * 图片的宽度 【注: 负值】
            // 当我们点击了某个小li 就拿到当前小li 的索引号
            var index = this.getAttribute('data-index');
            // 当我们点击某个小li 就要将这个li 的索引号给 num【解决图片问题】
            num = index;
            // 当我们点了某个小li 也要将这个li 的索引号给 circle【解决小圆圈问题】
            circle = index;
            // var focusWidth = focus.offsetWidth; // 改为全局变量移到前面
            // console.log(index * focusWidth);
            // console.log(index);
            animate(ul, -index * focusWidth);
        });
    }
    // 把ol 里面的第一个小li 设置类名为 current
    ol.children[0].className = 'current';

    // 6. 克隆第一张图片(li) 放到ul 最后面【写在js 而不写在 html里】
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    
    // 5. 点击右侧按钮, 图片滚动一张
    var num = 0;
    var circle = 0;
    // flag 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;  // 关闭节流阀
            // 如果走到了最后复制的一张图片, 此时 我们的ul 要快速复原 left 改为 0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true;  // 打开节流阀
            });
            // 7. 点击右侧按钮, 小圆圈跟随一起变化  可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle == 4 说明走到最后克隆的这张图片了 我们就复原
            // if (circle == ol.children.length) {
            //     circle = 0;
            // }
            circle = circle == ol.children.length ? 0 : circle;
            // 调用函数
            circleChange();
            }
    });

    // 8. 左侧按钮做法
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = flase;
            // 如果此时是第一张点击左侧按钮, 则快速跳转到最后的克隆图片
            if (num == 0) {
                num = ul.children.length - 1; // 减去克隆图片的剩余图片数量
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // 点击左侧按钮, 小圆圈跟随一起变化 声明一个变量控制小圆圈的播放
            circle--;
            // 如果circle < 0 说明第一张图片, 则小圆圈要改为第4个小圆圈(3)
            // if (circle < 0) {
            //     circle = ol.children.length - 1; // 跳到最后一个小圆点的索引
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle; 
            // 调用函数
            circleChange();
        }
    });
    
    function circleChange() {
        // 先清除其余小圆圈的 current 类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈的 current 类名
        ol.children[circle].className = 'current';
    }

    // 9. 自动播放点击事件
    var timer = setInterval(function() {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);
});