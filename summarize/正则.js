/*
  记住以下情况就行：
  
  var reg1 = /test/;
  var reg2 = new RegExp(reg1);
  reg1 === reg2; // false

  var reg1 = /test/;
  var reg2 = RegExp(reg1);
  reg1 === reg2; // true
*/