(function (factory) {
    if (typeof define === "function" && define.amd) {
        //amd加载规范
        define(['jquery'], factory);
    } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
        //cmd加载规范
        module.exports = factory;
    } else {
        factory(jQuery);
    }
})(function ($) {
    $.fn.extend({
        wScrollUp //给jquery原型对象添加新方法；
    });
    function wScrollUp(option) {
        var liStep,
            liStepFar,
            time,
            pNew,
            pJson = {},
            p2Json = {},
            that = this,//赋值
            p = {
                direction: "marginTop" ,//默认参数
                stepTime:2000,//间隔时间
                scrollTime:1000//滚动时间
            };
        if (option) {
            $.extend(p, option); //默认参数和输入的参数，合并对象
        }
        pNew = p.direction;
        if (pNew == "marginTop") {
            liStep = parseInt($(that).css('height'));
        } else {
            liStep = parseInt($(that).css('width'));
            liStepFar = liStep * $(that).find("li").length;
            console.log($(that).children("#list"));
            $(that).children("ul").css({ width: liStepFar }).find("li").css({
                float: "left"
            });
        }
        pJson[pNew] = -liStep; //为了解决json对象键不能为变量的问题
        p2Json[pNew] = 0; //为了解决json对象键不能为变量的问题

        function loop() {
            time = setInterval(function () {
                console.log(pJson);
                $(that).children("ul").animate(pJson, p.scrollTime, function () {
                    $(that).find("li:last").after($(that).find("li:first"));
                    $(that).children("ul").css(p2Json);
                });
            }, p.stepTime);
        }
        loop();
        // console.log(this.toString() ==$(that).toString());
        $(that).on("touchstart", function () {
            clearInterval(time);
        });
        $(that).on("touchend", function () {
            console.log("time00");
            loop();
        });
    }
});