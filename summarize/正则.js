/*
  记住以下情况就行：

  var reg1 = /test/;
  var reg2 = new RegExp(reg1);
  reg1 === reg2; // false

  var reg1 = /test/;
  var reg2 = RegExp(reg1);
  reg1 === reg2; // true
*/

/*
待整理：
js语法是不支持字符串换行的，除非用反引号
正则匹配成功以后的字符就不会再匹配了
｜匹配是: 或者前面的全部或后面的全部，不想全部匹配就用括号
\b单词边界
量词表达式
反向引用第几个表达式的结果：(a)\1
非贪婪模式能匹配少就不匹配多
replace本身是不具备全局匹配的，只能用全局正则才可以
*/