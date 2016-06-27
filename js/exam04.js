/**
 * Created by jianyujing on 2016/6/23.
 */
$(document).ready(function(){
    getData();

});

function updateQuestion(curentNum1,xml1) {
        document.getElementById("n1").innerHTML = curentNum1;
        document.getElementById("testp").innerHTML = "";
        document.getElementById("sA").innerHTML = "";
        document.getElementById("sB").innerHTML = "";
        document.getElementById("sC").innerHTML = "";
        document.getElementById("sD").innerHTML = "";
        $(xml1).find('question:eq(' + (curentNum1 - 1)+ ')').each(function () {
            var question = $(this);
            // var title = field.attr("Name");//读取节点属性
            var title = question.find("title").text();//读取子节点的值
            var answerA = question.find("answerA").text();//读取子节点的值
            var answerB = question.find("answerB").text();//读取子节点的值
            var answerC = question.find("answerC").text();//读取子节点的值
            var answerD = question.find("answerD").text();//读取子节点的值
            $("#testp").append(title);
            $("#sA").append(answerA);
            $("#sB").append(answerB);
            $("#sC").append(answerC);
            $("#sD").append(answerD);
        });

}
function getData() {
    $.get("xml/exam01.xml",function(xml){
        var sum= $(xml).find("question").length;
        var result_xml= $(xml).find("right").text();
        var curentNum = 1;
        var result="";
        document.getElementById("n1").innerHTML=curentNum;
        document.getElementById("n3").innerHTML=sum;
        var btnNameArr=["#A","#B","#C","#D","#btn1"];
        for (var i=0;i<5;i++){
            $(btnNameArr[i]).hover(function(){
                var option=$(this).attr("id");
                $("#"+option).css("background","#83bd28")
                $("#"+option+" hr").animate({opacity:'hide'})
            },function(){
                var option=$(this).attr("id");
                $("#"+option).css("background","none");
                $("#"+option+" hr").animate({opacity:'show'})
            });

        }
        for (var i=0;i<4;i++){
            $(btnNameArr[i]).click(function() {
                var option=$(this).attr("id");
                if(curentNum<sum){
                    curentNum+=1;
                    result+=option;
                    updateQuestion(curentNum,xml);}
                else if(curentNum==sum){
                    result +=option;
                    curentNum += 1;
                    alert("您已经全部完成，请提交");
                }
                }
            );
        }
        $("#btn1").click(function(){
            if(result==result_xml) {
                document.getElementById("main").innerHTML="";
                $("#exam02 ").css("display","block")
            }
            else {
                alert("失误失误  再来一发");
                curentNum=1;
                result="";
                updateQuestion(curentNum,xml);
            }

        });

        $("#left").click(function(){
            if(curentNum==1){
                alert("已经是第一道题目");
            }
            else{
                curentNum-=1;
                updateQuestion(curentNum,xml);
            }
        });
        $("#right").click(function(){
            if(curentNum==sum){
                alert("已经是最后一道题目");
            }
            else{
                curentNum+=1;
                updateQuestion(curentNum,xml);
            }
        });




    });
}









